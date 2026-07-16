import React from 'react';
import { X, Trash2, ShieldCheck, PhoneCall, ArrowRight, ClipboardList } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onUpdateRibbonText: (index: number, text: string) => void;
  onCheckout: () => void; // Trigger order checkout modal or direct WhatsApp order formulation
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateRibbonText,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalCartValue = cart.reduce((acc, item) => acc + item.finalPrice, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Black backdrop */}
      <div 
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col h-full shadow-2xl animate-slide-in-right">
          
          {/* Header */}
          <div className="px-5 py-5 bg-darkgreen text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ClipboardList className="text-primary" size={22} />
              <div>
                <h2 className="font-serif text-lg font-bold leading-none">Meu Carrinho</h2>
                <span className="text-[10px] text-gray-300 font-sans mt-1 block uppercase tracking-wider">
                  {cart.length === 0 ? 'Sem itens' : `${cart.length} item(ns) adicionado(s)`}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
                  🛒
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-700">Seu carrinho está vazio</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-xs">
                  Navegue pelo nosso catálogo e selecione uma de nossas belas coroas de flores para prestar a sua homenagem.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 py-2 px-6 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Ver Catálogo de Coroas
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 relative shadow-xs"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="absolute top-4 right-4 p-1.5 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full border border-gray-200/60 shadow-xs transition-colors"
                    title="Remover Item"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Product basic row */}
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200/80 flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 pr-6">
                      <span className="text-[9px] bg-primary/10 text-primary-dark font-bold uppercase tracking-wider px-1.5 py-0.5 rounded leading-none">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-gray-800 leading-tight mt-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] font-sans font-semibold text-gray-500 mt-0.5 block">
                        Tamanho: {item.selectedSize}
                      </span>
                    </div>
                  </div>

                  {/* Ribbon text inline edit */}
                  <div className="bg-white border border-gray-200/60 rounded-xl p-2.5">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">🎗️ Texto da Faixa de Homenagem:</span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Grátis</span>
                    </div>
                    <input
                      type="text"
                      value={item.ribbonText}
                      onChange={(e) => onUpdateRibbonText(index, e.target.value)}
                      placeholder="Ex: Saudades Eternas de seus Familiares"
                      className="w-full text-xs bg-transparent border-0 focus:outline-none focus:ring-0 p-0 text-gray-700 font-sans italic border-b border-dashed border-gray-200 pb-1"
                    />
                  </div>

                  {/* Price & Qty controllers */}
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-200/40">
                    {/* Qty */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Final Price */}
                    <span className="text-sm font-black text-gray-800 font-sans">
                      {formatPrice(item.finalPrice)}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
              
              {/* Delivery notice */}
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-3">
                <div className="text-lg mt-0.5">🚚</div>
                <div className="text-xs">
                  <span className="font-extrabold block">Frete Grátis & Entrega em 1h Ativos!</span>
                  Seu pedido será roteirizado na floricultura conveniada mais próxima do local do velório.
                </div>
              </div>

              {/* Price summarize */}
              <div className="flex flex-col gap-1.5 pb-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal das coroas</span>
                  <span>{formatPrice(totalCartValue)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Faixa de homenagem</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Grátis</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Taxa de entrega rápida</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Grátis</span>
                </div>
                <div className="h-[1px] bg-gray-200 my-1"></div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-extrabold text-gray-800">Total Geral:</span>
                  <span className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                    {formatPrice(totalCartValue)}
                  </span>
                </div>
              </div>

              {/* Checkout actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Comprar pelo WhatsApp
                  <ArrowRight size={14} />
                </button>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <a
                    href="tel:08000020001"
                    className="p-2.5 bg-white border-2 border-gray-200 hover:border-primary rounded-xl text-[10px] font-bold text-gray-700 hover:text-primary flex items-center justify-center gap-1 transition-all"
                  >
                    <PhoneCall size={12} />
                    0800 002 0001
                  </a>
                  <a
                    href="tel:30037271"
                    className="p-2.5 bg-white border-2 border-gray-200 hover:border-primary rounded-xl text-[10px] font-bold text-gray-700 hover:text-primary flex items-center justify-center gap-1 transition-all"
                  >
                    <PhoneCall size={12} />
                    3003-7271
                  </a>
                </div>
              </div>

              {/* Security seal */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-semibold pt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Floricultura Nobre: Atendimento 24h e NF-e para Empresas</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
