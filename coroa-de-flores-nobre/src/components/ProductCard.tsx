import React from 'react';
import { Star, Truck, Award } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Get color for category badges
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Tradicionais':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Ouro':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Platina':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Diamante':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Especiais':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
      id={`product-card-${product.id}`}
    >
      {/* Product Image & Badge */}
      <div className="relative pt-[100%] overflow-hidden bg-gray-50 border-b border-gray-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // fallback in case of loading error
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400';
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border shadow-sm ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
        </div>

        {/* Rapid tags */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5">
          <span className="flex items-center gap-1 bg-darkgreen/90 text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2 rounded backdrop-blur-xs">
            <Truck size={10} className="text-primary" />
            Frete Grátis
          </span>
          <span className="flex items-center gap-1 bg-white/90 text-gray-800 text-[9px] font-bold uppercase tracking-wider py-1 px-2 rounded shadow-xs backdrop-blur-xs">
            🎗️ Faixa Inclusa
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'}
                className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'}
              />
            ))}
          </div>
          {product.rating > 0 && (
            <span className="text-xs font-bold text-gray-500 font-sans ml-1">
              {product.rating.toFixed(2)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-[#3D3D3D] tracking-tight leading-snug group-hover:text-primary transition-colors min-h-[44px]">
          {product.name}
        </h3>

        {/* Composition/Flowers description */}
        <p className="text-sm text-gray-500 font-sans font-normal mt-1 mb-4 flex-1 line-clamp-2">
          {product.flowers}
        </p>

        {/* Price & Action */}
        <div className="border-t border-gray-100 pt-3.5 flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">A partir de</span>
            <span className="text-xl font-black text-gray-900 font-sans tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => onSelect(product)}
            className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
          >
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
