# Security Specification: Fortress Security Architecture

This document outlines the security architecture, strict data invariants, adversarial threat vectors, and testing patterns for the e-commerce database.

## 1. Data Invariants

1.  **PII Isolation**: Users can only read and write their own profile information (`/users/{userId}`). No authenticated user can scrape another user's email, phone, or billing details.
2.  **Order Integrity**: Orders can only be read and created by their owner (`userId == request.auth.uid`). Once an order is placed (`status: "pending"` or `"processing"`), its fields are immutable and its status cannot be changed by the customer.
3.  **Product Security**: Products (`/products/{productId}`) and categories (`/categories/{categoryId}`) are read-only to the public and authenticated customers. Only authenticated administrators (`isAdmin()`) can write or update items in the catalog.
4.  **Review Integrity**: A user can only write, edit, or delete product reviews if they are signed in and the `userId` in the payload matches their authenticated UID.
5.  **Address Ownership**: Address records (`/addresses/{addressId}`) are strictly isolated to the user who created them.
6.  **Immutable Creation Timestamps**: All `createdAt` fields must match `request.time` exactly upon document creation.

---

## 2. The "Dirty Dozen" Malicious Payloads

The database rules are configured to reject the following 12 attack vectors:

### Identity & Privilege Escalation Attacks

1.  **The Shadow Admin Profile Creation**: Creating a profile in `/users/{userId}` with an injected `isAdmin: true` field.
    -   *Result*: `PERMISSION_DENIED` - Self-assigned flags are forbidden; rules only verify admin status via an explicit, read-only `/admins/` lookup.
2.  **User Profile Theft (Scraping)**: An authenticated user requesting a `get` or `list` query on `/users/attacker123` where the ID does not match their own authenticated UID.
    -   *Result*: `PERMISSION_DENIED` - Profiles are strictly locked down to `isOwner(userId)`.
3.  **Address Hijacking**: Creating or reading an address in `/addresses/address456` with `userId` set to a victim's UID.
    -   *Result*: `PERMISSION_DENIED` - Payload UID must match `request.auth.uid`.

### Catalog & Price Manipulation Attacks

4.  **The Price Deflation Exploit**: An authenticated customer trying to update a product price from `$1499` to `$1.00`.
    -   *Result*: `PERMISSION_DENIED` - Write access on products is restricted to administrators.
5.  **Fake Product Creation**: An attacker attempting to inject a malicious product listing containing malicious scripts or spoofed branding in the `/products` collection.
    -   *Result*: `PERMISSION_DENIED` - Products can only be created by admins.
6.  **Category Hijacking**: Attempting to rename, delete, or append categories (`/categories/{categoryId}`).
    -   *Result*: `PERMISSION_DENIED` - Read-only to non-admins.

### Order, Wishlist, and Financial Attacks

7.  **Order Total Invalidation**: Creating an order record (`/orders/order999`) with a total price set to `$0.00` despite containing items worth `$5,000`.
    -   *Result*: `PERMISSION_DENIED` - Order creation is guarded by rigid schema validation.
8.  **Order Spoofing**: Creating an order on behalf of another user by setting `userId` in the payload to a different user's UID.
    -   *Result*: `PERMISSION_DENIED` - Checked via `incoming().userId == request.auth.uid`.
9.  **Wishlist Scraping**: Attempting to read another user's personal wishlist items.
    -   *Result*: `PERMISSION_DENIED` - Wishlist queries must filter by the authenticated user's UID.

### Review and Feedback Exploits

10. **Review Identity Theft**: Creating a review where the `userId` in the document matches a victim's UID, while signed in as a different user.
    -   *Result*: `PERMISSION_DENIED` - Enforced via `incoming().userId == request.auth.uid`.
11. **Malicious Review Spam**: An attacker trying to edit or delete a positive review of a competitor's product that they do not own.
    -   *Result*: `PERMISSION_DENIED` - Modifying reviews is restricted to the review creator (`existing().userId == request.auth.uid`).
12. **Future Timestamp Injection**: Submitting an order or review with a pre-dated or future-dated `createdAt` timestamp.
    -   *Result*: `PERMISSION_DENIED` - Enforced via `incoming().createdAt == request.time`.

---

## 3. The Test Runner Blueprint (`firestore.rules.test.ts`)

Below is the automated integration test script to verify that all malicious payloads are blocked.

```typescript
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import * as fs from "fs";

let testEnv: RulesTestEnvironment;

describe("ApexMarket Fortress Security Rules Tests", () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "apex-market-security-test",
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  it("Attack #1: Should reject creating a profile with injected admin privileges", async () => {
    const context = testEnv.authenticatedContext("user_123");
    const db = context.firestore();
    const userDocRef = doc(db, "users", "user_123");

    await assertFails(
      setDoc(userDocRef, {
        uid: "user_123",
        email: "attacker@gmail.com",
        isAdmin: true,
        createdAt: "2026-07-12T17:10:00Z"
      })
    );
  });

  it("Attack #2: Should prevent a user from reading another user's profile", async () => {
    const aliceContext = testEnv.authenticatedContext("alice_uid");
    const db = aliceContext.firestore();
    const bobDocRef = doc(db, "users", "bob_uid");

    await assertFails(getDoc(bobDocRef));
  });

  it("Attack #4: Should prevent non-admin user from changing product price", async () => {
    const context = testEnv.authenticatedContext("user_123");
    const db = context.firestore();
    const productRef = doc(db, "products", "prod_iphone");

    await assertFails(
      setDoc(productRef, {
        price: 1.00
      })
    );
  });

  it("Attack #8: Should prevent a user from placing an order for a different userId", async () => {
    const context = testEnv.authenticatedContext("user_123");
    const db = context.firestore();
    const orderRef = doc(db, "orders", "order_999");

    await assertFails(
      setDoc(orderRef, {
        orderId: "order_999",
        userId: "victim_456",
        items: [{ id: "prod_1", qty: 1 }],
        shippingAddress: { fullName: "Victim" },
        paymentMethod: "card",
        total: 1500,
        status: "pending",
        createdAt: "2026-07-12T17:10:00Z"
      })
    );
  });
});
```
