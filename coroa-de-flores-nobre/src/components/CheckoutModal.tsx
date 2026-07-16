import React, { useState } from 'react';
import { X, Send, Award, PhoneCall, Building2, MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutModal({ isOpen, cart, onClose, onClearCart }: CheckoutModalProps) {
  // Contact Info
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  // Delivery logistics
  const [deceasedName, setDeceasedName] = useState('');
  const [funeralVenue, setDeceasedVenue] = useState('');
  const [funeralTime, setDeceasedTime] = useState('');

  // Payment choice
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartao' | 'Faturamento_PJ'>('Pix');

  if (!isOpen || cart.length === 0) return null;

  const totalValue = cart.reduce((acc, item) => acc + item.finalPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName || !buyerPhone || !deceasedName || !funeralVenue) {
      alert('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    // Build the beautiful text receipt to send directly to WhatsApp
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    let messageText = `*NOVO PEDIDO DE COROA DE FLORES - FLORICULTURA COROAS #${orderNumber}*\n`;
    messageText += `--------------------------------------------------\n\n`;
    
    messageText += `*👤 DADOS DO COMPRADOR:*\n`;
    messageText += `• Nome: ${buyerName}\n`;
    messageText += `• E-mail: ${buyerEmail || 'Não informado'}\n`;
    messageText += `• WhatsApp: ${buyerPhone}\n\n`;
 
    messageText += `*🎗️ DADOS DA ENTREGA (FUNERAL):*\n`;
    messageText += `• Falecido(a): ${deceasedName}\n`;
    messageText += `• Local do Velório: ${funeralVenue}\n`;
    messageText += `• Horário: ${funeralTime || 'Imediato / Próximas horas'}\n\n`;
 
    messageText += `*💐 ITENS SELECIONADOS:*\n`;
    cart.forEach((item, index) => {
      messageText += `${index + 1}x ${item.product.name} (${item.selectedSize})\n`;
      messageText += `   🎗️ Faixa: "${item.ribbonText}"\n`;
      messageText += `   Subtotal: ${item.finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n`;
    });
 
    messageText += `*💵 FORMA DE PAGAMENTO SELECIONADA:*\n`;
    if (paymentMethod === 'Pix') {
      messageText += `• PIX (Aprovação e Roteirização Imediata com Desconto)\n\n`;
    } else if (paymentMethod === 'Cartao') {
      messageText += `• Cartão de Crédito (Parcelado em até 12x)\n\n`;
    } else {
      messageText += `• Faturamento para Empresas (Boleto faturado com emissão de NF-e)\n\n`;
    }
 
    messageText += `*💰 TOTAL GERAL:* *${totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*\n\n`;
    messageText += `--------------------------------------------------\n`;
    messageText += `⚠️ *Por favor, verifiquem a disponibilidade de entrega rápida e me enviem a chave PIX ou link de pagamento.*`;
 
    // Encode text for WhatsApp API
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=558000000000&text=${encodedText}`;

    // Redirect
    window.open(whatsappUrl, '_blank');

    // Clean up
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8 animate-scale-up">
        
        {/* Header */}
        <div className="bg-darkgreen text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <Building2 className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold leading-none">Dados para Entrega Rápida</h2>
              <span className="text-[10px] text-gray-300 font-sans block mt-1 uppercase tracking-wider">
                Preencha os dados abaixo para finalizar no WhatsApp 24h
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

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[75vh]">
          
          {/* Section 1: Buyer Info */}
          <div>
            <h3 className="text-xs font-black text-primary-dark uppercase tracking-widest border-b border-gray-100 pb-1.5 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-primary rounded-xs"></span>
              1. Identificação do Comprador
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Seu Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome do solicitante ou responsável"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Seu WhatsApp de Contato *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="(00) 90000-0000"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase">E-mail para Recibo / Nota Fiscal</label>
                <input 
                  type="email" 
                  placeholder="exemplo@empresa.com.br"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Details */}
          <div>
            <h3 className="text-xs font-black text-primary-dark uppercase tracking-widest border-b border-gray-100 pb-1.5 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-primary rounded-xs"></span>
              2. Dados do Homenageado e Velório
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Nome Completo do Falecido(a) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nome escrito no quadro do velório"
                  value={deceasedName}
                  onChange={(e) => setDeceasedName(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Nome do Cemitério / Crematório *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Cemitério do Morumby, Capela Central, etc."
                  value={funeralVenue}
                  onChange={(e) => setDeceasedVenue(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Horário do Velório / Sepultamento</label>
                <input 
                  type="text" 
                  placeholder="Ex: Hoje às 15:00h"
                  value={funeralTime}
                  onChange={(e) => setDeceasedTime(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div>
            <h3 className="text-xs font-black text-primary-dark uppercase tracking-widest border-b border-gray-100 pb-1.5 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-primary rounded-xs"></span>
              3. Escolha a Forma de Pagamento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* PIX */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Pix')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                  paymentMethod === 'Pix'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-extrabold text-gray-800">📱 Chave PIX</span>
                  <span className="text-[9px] bg-emerald-500 text-white font-bold py-0.5 px-1.5 rounded uppercase">Rápido</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-snug">
                  Aprovação instantânea, ideal para entregas urgentes em até 1 hora.
                </p>
              </button>

              {/* Cartão de Crédito */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Cartao')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                  paymentMethod === 'Cartao'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-extrabold text-gray-800">💳 Cartão de Crédito</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-snug">
                  Parcelado em até 12x via link de pagamento seguro do Mercado Pago.
                </p>
              </button>

              {/* Faturamento PJ */}
              <button
                type="button"
                onClick={() => setPaymentMethod('Faturamento_PJ')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                  paymentMethod === 'Faturamento_PJ'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-extrabold text-gray-800">🏢 Faturado PJ</span>
                  <span className="text-[9px] bg-primary-dark text-white font-bold py-0.5 px-1.5 rounded uppercase">NF-e</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-snug">
                  Boleto faturado para 15 ou 30 dias exclusivo para Empresas.
                </p>
              </button>
            </div>
          </div>

          {/* Pricing summary before dispatch */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between mt-2">
            <div>
              <span className="text-xs font-bold text-gray-500 block leading-tight">Valor Total do Pedido:</span>
              <span className="text-xs text-gray-400">Entrega rápida com frete grátis inclusa</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Enviar Pedido & Abrir WhatsApp
            <ChevronRight size={14} />
          </button>

        </form>

      </div>
    </div>
  );
}
