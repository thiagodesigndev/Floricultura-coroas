import React, { useState, useEffect } from 'react';
import { X, Heart, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Product, CartItem } from '../types';

interface CustomizeModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const PRESET_PHRASES = [
  { text: 'Nossos sinceros sentimentos e condolências.', category: 'Geral' },
  { text: 'Saudades eternas de seus familiares e amigos.', category: 'Família' },
  { text: 'Com carinho e pesar de toda a diretoria e colaboradores.', category: 'Empresa' },
  { text: 'Homenagem sincera dos amigos e colegas.', category: 'Amigos' },
  { text: 'Descanse em paz sob a luz divina eterna.', category: 'Religioso' },
  { text: 'Sua lembrança continuará brilhando em nossos corações.', category: 'Sentimento' },
  { text: 'Com todo amor e respeito de seus filhos e netos.', category: 'Família' },
  { text: 'Homenagem especial da Família Silva.', category: 'Família' }
];

export default function CustomizeModal({ product, onClose, onAddToCart }: CustomizeModalProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [ribbonText, setRibbonText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Set default size (e.g. Medium if index 1 exists)
  useEffect(() => {
    if (!product) return;
    if (product.sizes.length > 1) {
      // If there are multiple sizes, default to the second size (Medium, which is standard)
      setSelectedSizeIndex(1);
    } else {
      setSelectedSizeIndex(0);
    }
    setRibbonText('');
    setQuantity(1);
    setAddedMessage(false);
  }, [product]);

  if (!product) return null;

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const unitPrice = product.price + selectedSize.priceAdjustment;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      selectedSize: selectedSize.name,
      ribbonText: ribbonText.trim() || 'Homenagem Sincera',
      finalPrice: totalPrice
    });

    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] animate-scale-up">
        
        {/* Left Side: Product Image & Quick Info */}
        <div className="w-full md:w-2/5 bg-gray-50 border-r border-gray-100 p-6 flex flex-col justify-between items-center relative flex-shrink-0">
          <button 
            onClick={onClose} 
            className="md:hidden absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-700 shadow-md transition-all"
          >
            <X size={18} />
          </button>
          
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-48 h-48 md:w-56 md:h-56 relative rounded-2xl overflow-hidden border border-gray-100 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center mt-4">
              <span className="text-[10px] bg-primary/10 text-primary-dark font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-primary/10">
                {product.category}
              </span>
              <h2 className="font-serif text-xl font-bold text-[#3D3D3D] mt-2 tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-sans">
                {product.flowers}
              </p>
            </div>
          </div>

          {/* Secure purchase indicator */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-400 mt-4 border-t border-gray-200/60 pt-3 w-full justify-center">
            <span className="text-emerald-500">🔒</span> Compra 100% Segura • Entrega 1h Ativa
          </div>
        </div>

        {/* Right Side: Configuration Form */}
        <div className="w-full md:w-3/5 p-6 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-full">
          
          {/* Header (Desktop) */}
          <div className="hidden md:flex justify-between items-start border-b border-gray-100 pb-3 mb-4">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Customização do Pedido</span>
              <h3 className="font-serif text-lg font-bold text-[#3D3D3D]">Escolha os detalhes da Coroa</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* 1. Size Selector (only if sizes are more than 1) */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Tamanho da Coroa de Flores:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.sizes.map((sz, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  const priceLabel = sz.priceAdjustment > 0 ? `+ R$ ${sz.priceAdjustment},00` : 'Preço Base';
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-800 leading-none">{sz.name.split(' ')[0]}</span>
                          {isSelected && <Check size={12} className="text-primary" />}
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-1 leading-tight line-clamp-1">{sz.name.split(' ')[1] || sz.description}</span>
                      </div>
                      <span className={`text-xs font-extrabold mt-2 block ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                        {priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Ribbon Text input */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <label htmlFor="ribbon-text-input" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Faixa de Homenagem (Grátis):
                </label>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">🎗️ Inclusa sem custo</span>
              </div>
              <input
                id="ribbon-text-input"
                type="text"
                placeholder="Ex: Nossos sinceros sentimentos de pesar. Família Silva"
                value={ribbonText}
                onChange={(e) => setRibbonText(e.target.value)}
                maxLength={90}
                className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-xs"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                Máximo 90 caracteres. Será impresso exatamente como escrito. ({ribbonText.length}/90)
              </span>

              {/* Preset suggestions */}
              <div className="mt-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5">Clique para preencher uma frase sugerida:</span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-gray-50 rounded-lg border border-gray-100">
                  {PRESET_PHRASES.map((phrase, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setRibbonText(phrase.text)}
                      className="text-[9px] bg-white hover:bg-primary hover:text-white border border-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
                      title={phrase.category}
                    >
                      {phrase.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Quantity Selector */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-3 mt-1">
              <div>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Quantidade:</span>
                <span className="text-[10px] text-gray-400">Atende ao mesmo local de velório</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-extrabold text-sm"
                >
                  -
                </button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-extrabold text-sm"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Footer Subtotal & Action */}
          <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Subtotal Estimado</span>
              <span className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedMessage}
              className={`flex-1 py-3 px-6 rounded-full font-montserrat text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                addedMessage
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg'
              }`}
            >
              {addedMessage ? (
                <>
                  <Check size={16} /> Adicionado!
                </>
              ) : (
                <>
                  Confirmar e Adicionar
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
