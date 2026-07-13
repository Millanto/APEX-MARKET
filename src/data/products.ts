import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'tech',
    name: 'Smartphones & Tech',
    slug: 'tech',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'audio',
    name: 'Audio & Wearables',
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'apparel',
    name: 'Luxury Apparel',
    slug: 'apparel',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'home',
    name: 'Smart Home & Living',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'fitness',
    name: 'Fitness & Performance',
    slug: 'fitness',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
  }
];

export const PRODUCTS: Product[] = [
  // TECH (1-10)
  {
    id: 'tech-01',
    name: 'AeroPhone 15 Pro Max Ultra',
    category: 'Smartphones & Tech',
    brand: 'Aero',
    price: 1199,
    discount: 10,
    oldPrice: 1332,
    rating: 4.9,
    reviews: 1420,
    stock: 25,
    description: 'The definitive titan of smartphones, featuring a polished aerospace-grade titanium frame, an advanced 3nm silicon processor, and an unmatched triple-lens telephoto camera array.',
    specifications: {
      'Processor': 'Aero A18 Bionic 3nm Chip',
      'Display': '6.7" Super OLED 120Hz LTPO',
      'Storage': '256GB / 512GB / 1TB High-Speed NVMe',
      'Camera': '108MP Main + 48MP Ultrawide + 48MP Periscope Zoom',
      'Battery Life': 'Up to 32 Hours Continuous Playback',
      'Water Resistance': 'IP68 Certified dust and water resistance'
    },
    features: [
      'ProMotion variable refresh rate technology',
      'Advanced Spatial Video capture for virtual reality headsets',
      'Satellite-enabled emergency communication system'
    ],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-02',
    name: 'Vortex Fold X4 Foldable Tablet',
    category: 'Smartphones & Tech',
    brand: 'Vortex',
    price: 1799,
    discount: 15,
    oldPrice: 2116,
    rating: 4.7,
    reviews: 420,
    stock: 12,
    description: 'Transform your productivity with a continuous dual-axis folding display, seamless app continuity, and a fully reinforced hinge mechanism designed to endure years of demanding multi-tasking.',
    specifications: {
      'Display': '7.9" Foldable Dynamic AMOLED + 6.2" Cover Display',
      'RAM': '16GB LPDDR5X',
      'Storage': '512GB UFS 4.0',
      'Processor': 'Snapdragon 8 Gen 4 Octa-Core',
      'Battery': '5000mAh Dual-Cell Fast Charge'
    },
    features: [
      'Multi-window taskbar layout',
      'Precision active stylus support',
      'Armor Aluminum structural frame'
    ],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-03',
    name: 'Chronos Pro Creator Laptop',
    category: 'Smartphones & Tech',
    brand: 'Chronos',
    price: 2499,
    discount: 5,
    oldPrice: 2630,
    rating: 4.8,
    reviews: 280,
    stock: 8,
    description: 'The ultimate professional mobile workspace, designed for filmmakers, developers, and designers. Equipped with dynamic liquid-metal cooling and a breathtaking color-accurate panel.',
    specifications: {
      'CPU': 'Intel Core i9 Ultra-Performance 16-Core',
      'GPU': 'RTX 4080 Mobile 16GB VRAM',
      'Memory': '64GB DDR5 Dual-Channel',
      'Display': '16.2" Mini-LED 3.2K 165Hz Delta E < 1',
      'SSD': '2TB PCIe Gen4 SSD'
    },
    features: [
      '100% DCI-P3 cinematic wide color gamut',
      'Dual-fan high-efficiency vapor chamber cooling',
      'Machined aluminum unibody design'
    ],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-04',
    name: 'Nebula Pro Vision VR Headset',
    category: 'Smartphones & Tech',
    brand: 'Nebula',
    price: 899,
    discount: 20,
    oldPrice: 1123,
    rating: 4.6,
    reviews: 195,
    stock: 15,
    description: 'Immerse yourself in virtual and augmented worlds with ultra-dense micro-OLED screens, 3D spatial audio tracking, and advanced hand and eye tracking controllers.',
    specifications: {
      'Resolution': '4K Per Eye Ultra-Dense Micro-OLED',
      'Refresh Rate': '120Hz Cinematic Mode',
      'Tracking': '6-DoF Hand, Eye, and Passthrough Spatial Cameras',
      'Weight': '420g Ultra-Lightweight carbon-fiber blend'
    },
    features: [
      'Stunning high-fidelity color passthrough',
      'Adjustable dynamic prescription lenses insert support',
      'Integrated spatial speaker straps'
    ],
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-05',
    name: 'Vanguard X Gaming Console',
    category: 'Smartphones & Tech',
    brand: 'Vanguard',
    price: 499,
    discount: 0,
    oldPrice: 499,
    rating: 4.9,
    reviews: 2110,
    stock: 45,
    description: 'Enter the next generation of visual rendering. Supports native 8K scaling, ray-tracing hardware, and custom Solid State Storage for instant loading times.',
    specifications: {
      'Storage': '1TB Ultra-Fast Custom SSD (6.5GB/s)',
      'Video Output': 'HDMI 2.1, 4K 120Hz / 8K HDR Support',
      'Controller': 'Haptic Dynamic Response Controller'
    },
    features: [
      'Advanced dual-actuator haptic feedback controllers',
      'Whisper-quiet liquid cooling setup',
      'Backwards compatibility library'
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-06',
    name: 'Horizon Pro Tab E11',
    category: 'Smartphones & Tech',
    brand: 'Horizon',
    price: 699,
    discount: 10,
    oldPrice: 776,
    rating: 4.5,
    reviews: 512,
    stock: 30,
    description: 'A versatile aluminum-enclosed workhorse designed for sketching, editing, and professional presentation on-the-go.',
    specifications: {
      'Screen': '11.5" IPS ProDisplay 2.5K',
      'OS': 'Android Professional Edition',
      'Storage': '256GB'
    },
    features: [
      'Quad-channel surround speakers',
      'Super-low-latency sketching stylus included'
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-07',
    name: 'Titan Pro 4K Desktop Studio',
    category: 'Smartphones & Tech',
    brand: 'Aero',
    price: 1899,
    discount: 8,
    oldPrice: 2064,
    rating: 4.8,
    reviews: 145,
    stock: 5,
    description: 'The masterclass of desktop computation, fusing a premium computing unit with a sleek mechanical stand.',
    specifications: {
      'Core Count': '24-Core Workstation CPU',
      'GPU': 'Radeon Pro 12GB',
      'Display': '28" 4.5K Retinal Canvas'
    },
    features: [
      'Rotatable zero-gravity stand hinges',
      'Professional array studio microphones'
    ],
    images: [
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-08',
    name: 'Apex Wi-Fi 7 Router System',
    category: 'Smartphones & Tech',
    brand: 'Apex',
    price: 299,
    discount: 15,
    oldPrice: 351,
    rating: 4.7,
    reviews: 322,
    stock: 50,
    description: 'Unleash multi-gigabit wireless networking across your workspace, utilizing tri-band mesh, 320MHz bandwidth channels, and advanced smart beamforming arrays.',
    specifications: {
      'Protocol': 'Wi-Fi 7 (802.11be) Dual-Radio Tri-Band',
      'Bandwidth': 'Up to 19 Gbps combined speeds',
      'Coverage': 'Up to 6000 sq ft (2-pack Node)'
    },
    features: [
      'Multi-link operation (MLO) tech',
      'Real-time automated channel hopping'
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-09',
    name: 'Quantum Portable SSD 4TB',
    category: 'Smartphones & Tech',
    brand: 'Apex',
    price: 349,
    discount: 12,
    oldPrice: 396,
    rating: 4.9,
    reviews: 890,
    stock: 80,
    description: 'Blazing-fast file migration wrapped in an rugged IP65 waterproof and dropproof armored rubberized case, perfect for digital nomads.',
    specifications: {
      'Read Speed': 'Up to 2000 MB/s',
      'Connection': 'USB-C Gen 3.2 x2',
      'Capacity': '4TB High-Grade TLC Flash'
    },
    features: [
      'Hardware-based 256-bit AES folder security encryption',
      'Reinforced external armor'
    ],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'tech-10',
    name: 'Aero Charger Dock Triple',
    category: 'Smartphones & Tech',
    brand: 'Aero',
    price: 129,
    discount: 10,
    oldPrice: 143,
    rating: 4.6,
    reviews: 1240,
    stock: 120,
    description: 'Sleek luxury leather bedside tray that wirelessly fast-charges your smartphone, wearables, and earphones simultaneously with optimal temperature control.',
    specifications: {
      'Output': '15W Phone + 5W Watch + 5W Earphones',
      'Material': 'Genuine Saffiano Leather + Matte Black Steel base'
    },
    features: [
      'Sleek horizontal magnetic alignment',
      'Active auto-sleep standby mode indicator'
    ],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // AUDIO & WEARABLES (11-20)
  {
    id: 'audio-01',
    name: 'AeroPods Max ANC Headphones',
    category: 'Audio & Wearables',
    brand: 'Aero',
    price: 549,
    discount: 15,
    oldPrice: 645,
    rating: 4.9,
    reviews: 3200,
    stock: 35,
    description: 'Uncompromising studio-quality sound. Custom dynamic drivers yield deep, warm acoustic performance coupled with top-tier active noise cancellation.',
    specifications: {
      'Acoustics': 'Custom 40mm aerospace composite dynamic drivers',
      'Battery': 'Up to 40 Hours with active ANC',
      'Connectivity': 'Bluetooth 5.4 LE Audio & aptX Adaptive'
    },
    features: [
      'Personalized ear-mapped spatial audio',
      'Adaptive transparency environment monitoring'
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-02',
    name: 'Vortex Pulse Audiophile IEMs',
    category: 'Audio & Wearables',
    brand: 'Vortex',
    price: 299,
    discount: 5,
    oldPrice: 314,
    rating: 4.8,
    reviews: 145,
    stock: 40,
    description: 'Professional in-ear monitors equipped with a quad balanced-armature hybrid architecture, encased in hand-polished resin shells.',
    specifications: {
      'Drivers': '4 Balanced Armature + 1 Dynamic Low-Freq Driver',
      'Cable': 'Silver-plated oxygen-free braided copper cable'
    },
    features: [
      'Ergonomic acoustic soundstage matching',
      'Custom liquid-resin hand-cast shell art'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-03',
    name: 'AeroWatch Ultra Elite Active',
    category: 'Audio & Wearables',
    brand: 'Aero',
    price: 799,
    discount: 10,
    oldPrice: 887,
    rating: 4.9,
    reviews: 950,
    stock: 18,
    description: 'Engineered for extreme environments, integrating a gorgeous sapphire-dome screen, dual-frequency multi-satellite GPS, and a robust structural design.',
    specifications: {
      'Chassis': '49mm Machined Structural Titanium Alloy',
      'Glass': 'Scratch-Proof Flat Sapphire Crystal',
      'Sensors': 'ECG, SpO2, Skin Temp, Depth Gauge, Altimeter'
    },
    features: [
      'Dual-frequency GPS coordinate mapping',
      'Up to 72 Hours battery standby on custom eco-mode'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-04',
    name: 'Harmonic Studio Monitor Pro',
    category: 'Audio & Wearables',
    brand: 'Vortex',
    price: 999,
    discount: 20,
    oldPrice: 1248,
    rating: 4.7,
    reviews: 88,
    stock: 10,
    description: 'High-end open-back dynamic planar magnetic headphones offering pristine clinical reproduction for mix engineers and critical audiophiles.',
    specifications: {
      'Driver Type': 'Planar Magnetic Nanometer diaphragm',
      'Impedance': '32 Ohms direct response'
    },
    features: [
      'Symmetric open-back aluminum ear-cups',
      'Premium lambskin memory-foam replaceable ear pads'
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-05',
    name: 'Sonic Wireless Audio Beam',
    category: 'Audio & Wearables',
    brand: 'Apex',
    price: 199,
    discount: 12,
    oldPrice: 226,
    rating: 4.5,
    reviews: 450,
    stock: 65,
    description: 'Rugged dustproof portable speaker system. Engineered with a titanium passive radiator array delivering 360-degree room-filling acoustic volume.',
    specifications: {
      'Waterproof': 'IP67 fully submergible',
      'Output': '40W Quad-Amplifier Stereo Array'
    },
    features: [
      'Multi-speaker chain pairing party link',
      'Dynamic multi-color soundwave pulse LED array'
    ],
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-06',
    name: 'Siren Pro Studio Desk Mic',
    category: 'Audio & Wearables',
    brand: 'Apex',
    price: 179,
    discount: 10,
    oldPrice: 198,
    rating: 4.8,
    reviews: 620,
    stock: 40,
    description: 'Broadcast-grade cardioid polar condenser microphone. Perfect for podcasting, studio recording, or live streams.',
    specifications: {
      'Capsule': 'Dual 25mm pure gold-sputtered condenser capsules',
      'Resolution': '96kHz / 24-Bit analog-to-digital high fidelity conversion'
    },
    features: [
      'Zero-latency monitoring output headphone port',
      'Integrated heavy-duty shockmount and steel mesh shield'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-07',
    name: 'Vortex Sport Earbuds Pro',
    category: 'Audio & Wearables',
    brand: 'Vortex',
    price: 149,
    discount: 15,
    oldPrice: 175,
    rating: 4.6,
    reviews: 1340,
    stock: 95,
    description: 'Ergonomic secure-fit workout sports earphones. Sweat-proof shell with immersive heavy-bass dynamic signature.',
    specifications: {
      'Resistance': 'IPX7 Sweat and Rain Armor',
      'Playback': 'Up to 9 Hours + 30 Hours Charging Case'
    },
    features: [
      'Adjustable dynamic flexible silicone over-ear stabilizers',
      'Instantly responsive physical button playback toggles'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-08',
    name: 'Chronos Smart Ring Series 5',
    category: 'Audio & Wearables',
    brand: 'Chronos',
    price: 299,
    discount: 5,
    oldPrice: 314,
    rating: 4.7,
    reviews: 580,
    stock: 35,
    description: 'The pinnacle of continuous, screen-free health metrics tracking. Encased in beautiful surgical titanium, measuring sleep quality, activity, and recovery metrics.',
    specifications: {
      'Material': 'Ultralight Medical Grade Titanium Alloy',
      'Battery': '7 Days of continuous tracking',
      'Thickness': '2.5mm'
    },
    features: [
      'Comprehensive sleep stages evaluation algorithms',
      'Daily physiological readiness scores output'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-09',
    name: 'Siren Home Theater Soundbar',
    category: 'Audio & Wearables',
    brand: 'Apex',
    price: 449,
    discount: 15,
    oldPrice: 528,
    rating: 4.8,
    reviews: 315,
    stock: 22,
    description: 'Elevate your television setup with fully integrated spatial surround simulation. Multi-directional transducers deliver cinematic audio fidelity.',
    specifications: {
      'Transducers': '9 discrete class-D active amplification transducers',
      'Input': 'HDMI eARC, Optical, AirPlay 2, Spotify Connect'
    },
    features: [
      'Immersive room acoustic custom calibration software',
      'Sleek wall-mountable mesh composite grille design'
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'audio-10',
    name: 'AeroPods Slim Pro TWS',
    category: 'Audio & Wearables',
    brand: 'Aero',
    price: 179,
    discount: 10,
    oldPrice: 198,
    rating: 4.7,
    reviews: 1840,
    stock: 140,
    description: 'Ultra-compact earbud charging capsule fitting comfortably in any pocket. High quality dynamic soundstage with quick multi-device syncing.',
    specifications: {
      'Codec': 'AAC / SBC / aptX',
      'Battery': '6 Hours continuous per single charge'
    },
    features: [
      'Ultra lightweight 4.2g anatomical bud shape',
      'Automatic ear-detection play/pause sensor'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // LUXURY APPAREL (21-30)
  {
    id: 'apparel-01',
    name: 'Monarch Cashmere Trench Coat',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 850,
    discount: 15,
    oldPrice: 1000,
    rating: 4.9,
    reviews: 185,
    stock: 10,
    description: 'Expertly tailored from hand-combed Mongolian virgin cashmere, providing double-faced protection, timeless classic detailing, and beautiful tortoiseshell closures.',
    specifications: {
      'Material': '100% Premium Mongolian Grade-A Cashmere',
      'Lining': 'Silky soft Viscose stretch jacquard weave'
    },
    features: [
      'Expertly double-stitched storm flap closures',
      'Elegant wide-belted tailored silhouette structure'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-02',
    name: 'Apex Premium Leather Biker Jacket',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 499,
    discount: 10,
    oldPrice: 554,
    rating: 4.8,
    reviews: 215,
    stock: 15,
    description: 'An iconic motorcycle jacket rendered in luxurious, ultra-supple full-grain calfskin leather, hand-finished with brushed gunmetal steel hardware.',
    specifications: {
      'Leather': '1.2mm Hand-Finished Top-Grain Naked Calfskin',
      'Hardware': 'YKK Excella heavy-duty steel zippers'
    },
    features: [
      'Ergonomically expandable shoulder gusset pleats',
      'Three asymmetrical zip pockets + internal security pouch'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-03',
    name: 'Monarch Tailored Wool Blazer',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 380,
    discount: 5,
    oldPrice: 400,
    rating: 4.7,
    reviews: 130,
    stock: 20,
    description: 'A sharp, modern structured blazer crafted from pure Italian merino wool, featuring soft shoulder pads and a versatile half-canvas drape construction.',
    specifications: {
      'Composition': '100% Italian Super 120s Worsted Wool',
      'Lapels': 'Sophisticated notch lapel with decorative boutonniere thread'
    },
    features: [
      'Fully functioning kissing surgical button sleeves',
      'Classic British double rear-vent design'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-04',
    name: 'Summit Waterproof shell Parka',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 320,
    discount: 12,
    oldPrice: 363,
    rating: 4.6,
    reviews: 98,
    stock: 25,
    description: 'Uncompromising weather defense. Crafted from a triple-layered windproof shell membrane, styled with minimalistic city utility aesthetic.',
    specifications: {
      'Membrane': '3-Layer eVent breathable waterproofing',
      'Rating': '20,000mm hydrostatic head sealing'
    },
    features: [
      'Fully heat-welded interior waterproof tape lines',
      'Multi-point perimeter magnetic hood pull adjustments'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-05',
    name: 'Aero Knit Runner Sneakers Pro',
    category: 'Luxury Apparel',
    brand: 'Aero',
    price: 199,
    discount: 15,
    oldPrice: 234,
    rating: 4.8,
    reviews: 670,
    stock: 50,
    description: 'High-performance lifestyle trainers. Breathable elastic knit mesh forms dynamically around your foot shape, mounted on a plush carbon-infused energy-return midsole.',
    specifications: {
      'Upper': 'Seamless AeroKnit engineered recycled yarn',
      'Cushioning': 'Supercritical gas-injected bouncy foam core'
    },
    features: [
      'Stabilizing rear TPU external counter cradles',
      'Multi-surface directional rubber traction lugs'
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-06',
    name: 'Monarch Silk Evening Dress',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 650,
    discount: 10,
    oldPrice: 722,
    rating: 4.9,
    reviews: 75,
    stock: 8,
    description: 'Radiate timeless allure in this fluid, floor-skimming premium silk evening gown. Styled with a striking cowl open back and exquisite hand-piped borders.',
    specifications: {
      'Composition': '100% Organic Mulberry Charmeuse Silk',
      'Drape': 'Bias-cut drape body mapping'
    },
    features: [
      'Sensual side leg slit with delicate silk loops',
      'Fully lined in airy premium silk habotai'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-07',
    name: 'Nomad Merino Wool Hoodie',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 149,
    discount: 5,
    oldPrice: 156,
    rating: 4.7,
    reviews: 340,
    stock: 60,
    description: 'The ultimate travel layer. Lightweight temperature-regulating merino wool hoodie that is highly odor-resistant and extremely soft against the skin.',
    specifications: {
      'Fabric': '100% Merino Wool, 200 gsm superfine fibers',
      'Fit': 'Athletic regular taper'
    },
    features: [
      'Invisible zippered side travel passport pocket',
      'Ergonomic flatlock anti-chafing seams design'
    ],
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-08',
    name: 'Titanium Polarized Navigator Sunglasses',
    category: 'Luxury Apparel',
    brand: 'Apex',
    price: 249,
    discount: 15,
    oldPrice: 292,
    rating: 4.8,
    reviews: 190,
    stock: 35,
    description: 'Sleek geometric double-bridge frames machined entirely from hyper-durable titanium. Outfitted with high-contrast polarized Japanese nylon lenses.',
    specifications: {
      'Frame': '100% Pure Japanese beta-titanium wires',
      'Coating': '9-Layer anti-reflective and water-repellent shield'
    },
    features: [
      'Self-adjusting soft hypoallergenic silicone nose pads',
      'Flexible, highly-adaptive custom tension temple hinge hinges'
    ],
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-09',
    name: 'Vortex Carbon fiber Automatic Watch',
    category: 'Luxury Apparel',
    brand: 'Vortex',
    price: 950,
    discount: 10,
    oldPrice: 1055,
    rating: 4.9,
    reviews: 55,
    stock: 6,
    description: 'High-octane horology. Powered by an exposed mechanical automatic caliber, housed in a lightweight forged carbon composite casing.',
    specifications: {
      'Movement': 'Miyota 24-Jewel Automatic skeletal movement',
      'Case': '43mm Forged Carbon Fiber + Titanium core',
      'Waterproof': '100m (10 ATM) certified screw-down crown'
    },
    features: [
      'Stunning dial skeleton showing interior mechanisms',
      'Ultra-breathable textured vulcanized FKM rubber band'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'apparel-10',
    name: 'Monarch Suede Chelsea Boots',
    category: 'Luxury Apparel',
    brand: 'Monarch',
    price: 280,
    discount: 20,
    oldPrice: 350,
    rating: 4.6,
    reviews: 210,
    stock: 30,
    description: 'Exquisitely crafted Italian chelsea ankle boots in buttery-soft calf suede. Treated with active hydro-shield repelling water spots and light dirt.',
    specifications: {
      'Suede': '100% Premium split calfskin suede from Tuscany',
      'Sole': 'Sturdy leather welt base + protective rubber grip insert'
    },
    features: [
      'Sturdy elasticated side paneling for simple slip-on entry',
      'Exquisite leather pull-tabs detailing'
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // SMART HOME & LIVING (31-40)
  {
    id: 'home-01',
    name: 'Nebula Smart Laser Projector 4K',
    category: 'Smart Home & Living',
    brand: 'Nebula',
    price: 1499,
    discount: 15,
    oldPrice: 1763,
    rating: 4.8,
    reviews: 195,
    stock: 12,
    description: 'Transform any blank wall into an premium IMAX cinema. Super-bright laser light source projecting native HDR10+ quality with stunning clarity.',
    specifications: {
      'Brightness': '2500 ANSI Lumens, ALPD Laser system',
      'Projection Size': '80" to 150" Ultra-Short Throw',
      'Sound': 'Dual 15W speakers by Siren Acoustics'
    },
    features: [
      'Dynamic automated focus and keystone correction alignment',
      'Fluid high-performance Android Smart TV interface'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-02',
    name: 'Horizon Air Purification System',
    category: 'Smart Home & Living',
    brand: 'Horizon',
    price: 349,
    discount: 10,
    oldPrice: 387,
    rating: 4.7,
    reviews: 412,
    stock: 25,
    description: 'Cleanse your air space silently. Triple filtration HEPA layers target 99.97% of active particulates, dust, and allergen sources.',
    specifications: {
      'Filter': 'True HEPA H13 + Activated Carbon + UV Sanitizer',
      'Coverage': 'Cleans up to 1500 sq ft per hour'
    },
    features: [
      'Real-time ambient light ring AQI air quality reading',
      'Whisper-quiet sleep setting registering only 21 decibels'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-03',
    name: 'Chronos Smart Sleep Optimizer',
    category: 'Smart Home & Living',
    brand: 'Chronos',
    price: 199,
    discount: 5,
    oldPrice: 209,
    rating: 4.5,
    reviews: 280,
    stock: 45,
    description: 'A bedside sleep enhancement unit. Emits personalized ambient light wavelengths and active white noise algorithms mapped to your circadian cycle.',
    specifications: {
      'Light': 'Full-Spectrum Custom Bio-Optic LED',
      'Audio': '12 custom engineered white-noise micro acoustic profiles'
    },
    features: [
      'Automated wake-up sun simulation lighting curves',
      'Built-in humidity, air quality, and room noise sensor metrics'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-04',
    name: 'Siren Dynamic Smart Bookshelf Speakers',
    category: 'Smart Home & Living',
    brand: 'Siren',
    price: 399,
    discount: 12,
    oldPrice: 453,
    rating: 4.8,
    reviews: 140,
    stock: 18,
    description: 'Audiophile active bookshelf speakers crafted in oiled walnut. Connects instantly to your home network for direct, lossless spatial audio streaming.',
    specifications: {
      'Cabinet': 'Hand-oiled American walnut wood veneer cabinets',
      'Amplification': 'Class-D Bi-Amplified 120W combined power output'
    },
    features: [
      'Integrated Spotify Connect, AirPlay 2, and Chromecast',
      'Exquisite removable physical magnetic knit grille mesh'
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-05',
    name: 'Horizon AeroBrew Smart Espresso Station',
    category: 'Smart Home & Living',
    brand: 'Horizon',
    price: 899,
    discount: 8,
    oldPrice: 977,
    rating: 4.9,
    reviews: 310,
    stock: 15,
    description: 'Barista-level performance at home. Control extraction pressure, boiler water temperature, and dynamic milk texturing directly from your device.',
    specifications: {
      'Pump': '15-Bar Italian high precision vibration pump',
      'Heating': 'Dual thermoblocks with PID micro-electronic thermal control'
    },
    features: [
      'Built-in burr grinder with 30 micro-step settings',
      'Full automatic micro-foam steam wand texturing'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-06',
    name: 'AeroVolt Smart Robot Vacuum S12',
    category: 'Smart Home & Living',
    brand: 'Aero',
    price: 649,
    discount: 20,
    oldPrice: 811,
    rating: 4.7,
    reviews: 530,
    stock: 22,
    description: 'Precision home cleaning. Utilizes advanced LiDAR guidance to map levels, vacuum carpets, and mop hard floors in a single efficient run.',
    specifications: {
      'Suction': '6000 Pa hyper-cyclonic suction power',
      'Docking': 'Automated self-emptying dust and clean wash tank base'
    },
    features: [
      'LiDAR 3D camera obstacle avoidance system',
      'Dynamic carpet sensor auto-lifting floor mop pads'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-07',
    name: 'Vanguard Smart Security Guard 3-Cam Kit',
    category: 'Smart Home & Living',
    brand: 'Vanguard',
    price: 299,
    discount: 10,
    oldPrice: 332,
    rating: 4.6,
    reviews: 840,
    stock: 40,
    description: 'Full-coverage exterior home security. Three weather-proof high definition cameras linking to a centralized storage base station.',
    specifications: {
      'Resolution': '2K HDR with Color Night Vision',
      'Battery': '180 Days of wireless usage per single full charge'
    },
    features: [
      'Integrated AI distinguishing people, pets, and package drop-offs',
      'Local encrypted hub storage holding up to 16GB footage'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-08',
    name: 'Horizon Ambient Smart Light Bar Duo',
    category: 'Smart Home & Living',
    brand: 'Horizon',
    price: 129,
    discount: 15,
    oldPrice: 151,
    rating: 4.8,
    reviews: 1420,
    stock: 90,
    description: 'Sync your screen entertainment with dynamic atmospheric backlighting. Dual LED towers cast vibrant color schemes synchronized to your computer or TV.',
    specifications: {
      'Bulb': 'Individually addressable RGBIC dynamic light emitters',
      'Control': 'Compatible with Amazon Alexa, Google Home, Siri'
    },
    features: [
      'Seamless real-time computer screen pixel color mirror syncing',
      'Over 40 responsive preset atmospheric theme layouts'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-09',
    name: 'AeroGrow Smart hydroponic Herbal garden',
    category: 'Smart Home & Living',
    brand: 'Aero',
    price: 189,
    discount: 5,
    oldPrice: 198,
    rating: 4.5,
    reviews: 380,
    stock: 50,
    description: 'Cultivate fresh culinary herbs and leafy greens year-round in your kitchen. Water-based nutrient system with automatic smart LED light schedules.',
    specifications: {
      'Pillars': '6-Pod growing capacity with dynamic deck space',
      'Light': 'Full-spectrum 30-Watt grow light array'
    },
    features: [
      'Digital touch display telling when to add nutrients/water',
      'Optimized automatic water recirculation pump cycles'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'home-10',
    name: 'Monarch French Linen Sheet Bedding Set',
    category: 'Smart Home & Living',
    brand: 'Monarch',
    price: 220,
    discount: 10,
    oldPrice: 244,
    rating: 4.9,
    reviews: 670,
    stock: 35,
    description: 'The ultimate sleep luxury. Spun from long-staple premium French flax linen, pre-washed with structural volcanic pumice for exceptional vintage softness.',
    specifications: {
      'Material': '100% French Flax, sustainably farmed',
      'Set': '1 Flat Sheet + 1 Fitted Sheet + 2 Standard Pillowcases'
    },
    features: [
      'Highly breathable fibers keeping cool in warm seasons',
      'Beautiful classic raw double-felled stitched borders'
    ],
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80'
    ]
  },

  // FITNESS & PERFORMANCE (41-50)
  {
    id: 'fit-01',
    name: 'Apex Pro Modular Dumbbell Set 80lb',
    category: 'Fitness & Performance',
    brand: 'Apex',
    price: 599,
    discount: 15,
    oldPrice: 704,
    rating: 4.9,
    reviews: 1120,
    stock: 15,
    description: 'Replace an entire commercial weight rack with a single pair of heavy dumbbells. Select weights effortlessly in 5lb increments with a modern dial interface.',
    specifications: {
      'Weights': '10 lbs to 80 lbs per individual handle',
      'Materials': 'Laser-cut powder-coated structural steel plates'
    },
    features: [
      'Intuitive chrome steel micro-dial adjusting selector',
      'Impact-resistant heavy rubberized safety cradles'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-02',
    name: 'Vortex Carbon smart Peloton Bike',
    category: 'Fitness & Performance',
    brand: 'Vortex',
    price: 1399,
    discount: 10,
    oldPrice: 1554,
    rating: 4.8,
    reviews: 640,
    stock: 10,
    description: 'Unleash professional cycle training in your home. Dynamic magnetic resistance pairs seamlessly with real-world simulated terrain climbs.',
    specifications: {
      'Frame': 'High-tensile structural steel + carbon composite accents',
      'Screen': '21.5" Full HD multi-touch rotating panel'
    },
    features: [
      'Whisper-quiet magnetic flywheel resistance system',
      'Real-time automated instructor target syncing resistance'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-03',
    name: 'Horizon Recovery Massage Gun Pro',
    category: 'Fitness & Performance',
    brand: 'Horizon',
    price: 199,
    discount: 15,
    oldPrice: 234,
    rating: 4.7,
    reviews: 1840,
    stock: 60,
    description: 'Accelerate post-workout recovery. High-torque brushless motors deliver deep percussion stroke treatment releasing deep muscle knots.',
    specifications: {
      'Engine': '60W Brushless quiet-glide motor',
      'Stroke': '16mm deep tissue percussive amplitude'
    },
    features: [
      'Stunning OLED active stroke force and speed screen indicator',
      '5 interchangeable custom massage nodes for anatomical target zones'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-04',
    name: 'Chronos Smart Bio-Harness Band',
    category: 'Fitness & Performance',
    brand: 'Chronos',
    price: 149,
    discount: 5,
    oldPrice: 156,
    rating: 4.6,
    reviews: 930,
    stock: 80,
    description: 'Advanced physiological tracking strap. Worn comfortably around your bicep, measuring active muscle fatigue and strain levels with laboratory precision.',
    specifications: {
      'Sensor': 'Multi-wavelength green and red optical biometric sensors',
      'Strap': 'Antibacterial sweat-wicking elastic weave'
    },
    features: [
      'Continuous metabolic heat output evaluations',
      'Seamless Bluetooth data stream exporting to fitness devices'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-05',
    name: 'Summit Adventure GPS Compass Watch',
    category: 'Fitness & Performance',
    brand: 'Monarch',
    price: 449,
    discount: 12,
    oldPrice: 510,
    rating: 4.8,
    reviews: 320,
    stock: 25,
    description: 'A bulletproof navigational computer on your wrist. Features full-color topographical maps, solar charging paneling, and advanced survival barometer.',
    specifications: {
      'Lens': 'Solar-charging Power Sapphire glass dome',
      'Waterproof': '100m deep water resistance rating'
    },
    features: [
      'Multi-band global satellite navigational routing',
      'Extreme storm hazard alert system and pressure drop alarms'
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-06',
    name: 'AeroStretch Premium Yoga Mat',
    category: 'Fitness & Performance',
    brand: 'Aero',
    price: 89,
    discount: 10,
    oldPrice: 98,
    rating: 4.9,
    reviews: 1430,
    stock: 120,
    description: 'Unmatched grip and cushioning. Non-slip polyurethane upper layered over supportive organic natural rubber cushion core.',
    specifications: {
      'Dimension': '71" Long x 26" Wide x 5mm Thick',
      'Materials': 'Biodegradable polyurethane top + organic tree rubber backing'
    },
    features: [
      'Moisture-absorbent cellular material structure keeping grip when sweating',
      'Beautiful laser-etched precision body alignment guidelines'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-07',
    name: 'Vanguard Hydro-Armor Gym Backpack',
    category: 'Fitness & Performance',
    brand: 'Vanguard',
    price: 119,
    discount: 15,
    oldPrice: 140,
    rating: 4.7,
    reviews: 580,
    stock: 75,
    description: 'The masterclass of gear organization. Waterproof ballistic nylon shell housing separated wet/dry clothes and dedicated vented athletic shoe compartment.',
    specifications: {
      'Capacity': '35 Liters expandable packing space',
      'Fabric': '1000D abrasion-proof Cordura nylon fiber'
    },
    features: [
      'Thick padded 16-inch protective laptop sleeve',
      'Dual reinforced magnetic leak-proof thermal shaker bottle sleeves'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-08',
    name: 'Apex Speed Jump Rope Steel',
    category: 'Fitness & Performance',
    brand: 'Apex',
    price: 39,
    discount: 10,
    oldPrice: 43,
    rating: 4.6,
    reviews: 1140,
    stock: 150,
    description: 'Perform effortless double-unders. Smooth dual ball-bearing custom aluminum handles mounted with ultra-fast coated steel cables.',
    specifications: {
      'Bearings': 'Premium 360-degree fluid rotation steel ball bearings',
      'Cable': '3m Fully-adjustable vinyl coated stainless steel wire'
    },
    features: [
      'Ergonomic diamond-knurled anti-slip aluminum handles grip',
      'Simple secure hex-key adjustable cable clamp mechanism'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-09',
    name: 'Summit High-Altitude Training Mask',
    category: 'Fitness & Performance',
    brand: 'Vanguard',
    price: 79,
    discount: 15,
    oldPrice: 92,
    rating: 4.4,
    reviews: 240,
    stock: 65,
    description: 'Enhance respiratory performance. Patented multi-level resistance air valving simulates various training altitudes to boost lung stamina.',
    specifications: {
      'System': '4-Level dial resistance airway selector (3k to 18k feet)',
      'Sleeve': 'Hypoallergenic soft medical grade liquid silicone face gasket'
    },
    features: [
      'Ultra breathable moisture-wicking secure neoprene straps',
      'Simple disassembly for effortless sanitizing wash cycles'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'fit-10',
    name: 'AeroCore Abs Roller Wheel Pro',
    category: 'Fitness & Performance',
    brand: 'Aero',
    price: 49,
    discount: 10,
    oldPrice: 54,
    rating: 4.8,
    reviews: 690,
    stock: 110,
    description: 'Target deep core elements safely. Extra-wide structural wheel with integrated mechanical carbon-steel coil spring assist for smooth rolls.',
    specifications: {
      'Core': 'Internal carbon steel coil kinetic engine assistance',
      'Tread': 'Spherical heavy rubberized high-traction outer tread'
    },
    features: [
      'Ergonomic angled rubber hand grips for optimal wrist alignment',
      'Includes high density comfortable EVA foam kneeling pad'
    ],
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ]
  }
];
