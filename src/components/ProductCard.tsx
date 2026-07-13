import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useApp();
  
  const hasDiscount = product.discount > 0;
  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      id={`product-card-${product.id}`}
      className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Badges & Favorite overlay */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="px-2.5 py-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-black rounded-lg tracking-wider uppercase">
            -{product.discount}% OFF
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-black rounded-lg tracking-wider uppercase">
            Low Stock ({product.stock})
          </span>
        )}
        {product.stock === 0 && (
          <span className="px-2.5 py-1 bg-zinc-400 text-white text-[10px] font-black rounded-lg tracking-wider uppercase">
            Sold Out
          </span>
        )}
      </div>

      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/20 shadow-md hover:scale-110 text-zinc-500 hover:text-rose-500 transition-all cursor-pointer"
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 transition-all ${isFavorited ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
      </button>

      {/* Product Image Stage */}
      <div 
        onClick={() => navigateTo('product-details', product.id)}
        className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-950 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Action Layer on Hover */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-details', product.id);
            }}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {product.stock > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info Body */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Brand & Stars */}
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold text-zinc-700 dark:text-zinc-300">{product.rating}</span>
              <span className="text-zinc-400 text-[10px]">({product.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('product-details', product.id)}
            className="text-sm font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2 cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Footer Call */}
        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs line-through text-zinc-400">${product.oldPrice}</span>
            )}
            <span className="text-lg font-black text-zinc-950 dark:text-white">
              ${product.price}
            </span>
          </div>

          {product.stock > 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 dark:hover:text-white text-xs font-bold border border-blue-200/50 dark:border-blue-900/30 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider py-1.5">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
