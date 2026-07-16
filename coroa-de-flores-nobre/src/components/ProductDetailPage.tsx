import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Truck, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  ShoppingCart, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenCheckout: () => void;
}

const PRESET_PHRASES = [
  { text: 'Nossos sinceros sentimentos e condolências.', category: 'Geral' },
  { text: 'Saudades eternas de seus familiares e amigos.', category: 'Família' },
  { text: 'Com carinho e pesar de toda a diretoria e colaboradores.', category: 'Empresa' },
  { text: 'Homenagem sincera dos amigos e colegas.', category: 'Amigos' },
  { text: 'Descanse em paz sob a luz divina eterna.', category: 'Religioso' },
  { text: 'Sua lembrança continuará brilhando em nossos corações.', category: 'Sentimento' },
  { text: 'Com todo amor e respeito de seus filhos e netos.', category: 'Família' },
  { text: 'Homenagem especial de toda a nossa equipe.', category: 'Empresa' }
];

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onAddToCart,
  onOpenCheckout 
}: ProductDetailPageProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [ribbonText, setRibbonText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product.sizes.length > 1) {
      setSelectedSizeIndex(1); // Default to Medium (usually standard)
    } else {
      setSelectedSizeIndex(0);
    }
    setRibbonText('');
    setQuantity(1);
    setAddedMessage(false);
  }, [product]);

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
    }, 2000);
  };

  const handleDirectBuyWhatsApp = () => {
    const finalRibbon = ribbonText.trim() || 'Homenagem Sincera';
    const message = `Olá! Gostaria de comprar a ${product.name} no tamanho ${selectedSize.name}.\n\n` +
      `*Detalhes do Pedido:*\n` +
      `• Produto: ${product.name}\n` +
      `• Tamanho: ${selectedSize.name}\n` +
      `• Faixa de Homenagem: "${finalRibbon}"\n` +
      `• Quantidade: ${quantity}x\n` +
      `• Valor: ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n` +
      `Por favor, me confirme a disponibilidade para entrega de 1 hora.`;
    
    window.open(`https://api.whatsapp.com/send?phone=558000000000&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-gray-50/50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Breadcrumb & Navigation Back Action */}
        <div className="mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2.5 py-3 px-6 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-sm font-black uppercase tracking-wider text-gray-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao Catálogo
          </button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans font-semibold">
            <span className="hover:text-primary cursor-pointer transition-colors" onClick={onBack}>Início</span>
            <span>/</span>
            <span className="hover:text-primary cursor-pointer transition-colors" onClick={onBack}>Coroas de Flores</span>
            <span>/</span>
            <span className="hover:text-primary cursor-pointer transition-colors" onClick={onBack}>{product.category}</span>
            <span>/</span>
            <span className="text-gray-800 font-bold">{product.name}</span>
          </div>
        </div>

        {/* Core Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Product Media & Dynamic Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Main Product Frame */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center relative overflow-hidden group">
              {/* Premium quality floating ribbon */}
              <div className="absolute top-4 left-4 bg-primary text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-md z-10 flex items-center gap-1.5 animate-pulse">
                <Sparkles size={12} /> {product.category} Premium
              </div>
              
              <div className="w-full aspect-square max-w-[360px] md:max-w-[400px] relative rounded-2xl overflow-hidden border border-gray-50 bg-gray-50/50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Delivery Speed Highlight Card */}
              <div className="w-full mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wide leading-tight">Entrega Rápida e Garantida</h4>
                  <p className="text-xs md:text-sm text-emerald-850 mt-1.5 leading-relaxed font-sans font-medium">
                    Entrega grátis em até 1 hora com suporte de metal montado incluso para todos os cemitérios e velórios da região. Flores sempre novas e frescas, preservadas em água.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrangement Specs & Details */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-5">
              <h3 className="text-base md:text-lg font-black text-[#3D3D3D] uppercase tracking-wider border-b border-gray-100 pb-3">
                Especificações do Arranjo
              </h3>
              
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Flores Utilizadas</span>
                  <span className="font-sans font-extrabold text-gray-800 text-sm md:text-base mt-1 block leading-tight">{product.flowers}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Durabilidade</span>
                  <span className="font-sans font-extrabold text-gray-800 text-sm md:text-base mt-1 block leading-tight">Longa (Estrutura Úmida)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Disponibilidade</span>
                  <span className="font-sans font-extrabold text-emerald-700 text-sm md:text-base mt-1 block flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Pronta Entrega 24h
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Faixa de Homenagem</span>
                  <span className="font-sans font-extrabold text-primary-dark text-sm md:text-base mt-1 block">Inclusa Grátis</span>
                </div>
              </div>

              <div className="h-[1px] bg-gray-100 my-1"></div>

              <div>
                <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider mb-1.5">Descrição Detalhada</span>
                <p className="text-sm text-gray-700 leading-relaxed font-sans font-medium">
                  {product.description} Nossas coroas são preparadas de maneira individual por floristas experientes utilizando apenas flores nobres frescas, colhidas na data da montagem do arranjo para garantir o máximo respeito e beleza na homenagem.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Configuration and Core Buying Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              
              {/* Product Identity Header */}
              <div className="border-b border-gray-100 pb-5">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">
                  Coroas Categoria {product.category}
                </span>
                <h1 className="text-2xl md:text-3.5xl font-black text-[#3D3D3D] mt-2 tracking-tight">
                  {product.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3.5 mt-3">
                  {/* Stars review */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="text-sm font-black text-gray-600 ml-1">4.9</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500 font-sans font-bold">Mais de 120 homenagens entregues com sucesso</span>
                </div>
              </div>

              {/* Price Tag Box */}
              <div className="py-5 flex flex-wrap justify-between items-baseline gap-4 border-b border-gray-50">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Valor do Arranjo Customizado</span>
                  <div className="flex items-baseline gap-2.5 mt-1.5">
                    <span className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-sans">
                      {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="text-sm text-emerald-700 font-black bg-emerald-100 px-3 py-1 rounded uppercase tracking-wide">
                      Frete Grátis
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right font-sans text-sm font-medium">
                  <span className="text-gray-600 block">Até <strong className="text-gray-900 font-black">3x sem juros</strong> no cartão</span>
                  <span className="text-primary-dark font-bold block mt-1">Boleto e NF-e sem burocracia para Empresas</span>
                </div>
              </div>

              {/* Custom Configuration Form */}
              <div className="flex flex-col gap-6 mt-6">
                
                {/* 1. Size Selection Grid */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-black text-gray-800 uppercase tracking-wider">
                      Escolha o Tamanho da Coroa:
                    </label>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Comparações Reais
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.sizes.map((sz, idx) => {
                      const isSelected = selectedSizeIndex === idx;
                      const priceLabel = sz.priceAdjustment > 0 ? `+ R$ ${sz.priceAdjustment},00` : 'Preço Base';
                      
                      // Inject dimensions to help visual
                      let dim = "1,00m x 1,00m";
                      if (sz.name.toLowerCase().includes("médio") || sz.name.toLowerCase().includes("padrão")) {
                        dim = "1,20m x 1,20m";
                      } else if (sz.name.toLowerCase().includes("grande") || sz.name.toLowerCase().includes("luxo") || sz.name.toLowerCase().includes("platina") || sz.name.toLowerCase().includes("diamante")) {
                        dim = "1,50m x 1,50m";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 group cursor-pointer ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-3 ring-primary/10'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-black text-gray-800 uppercase leading-none">{sz.name}</span>
                              {isSelected && <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white"><Check size={12} /></span>}
                            </div>
                            <span className="text-xs font-bold text-gray-500 block mt-1.5 leading-tight font-sans">Dimensões: {dim}</span>
                            <span className="text-xs font-medium text-gray-600 block mt-1.5 leading-normal line-clamp-2 font-sans">{sz.description}</span>
                          </div>
                          
                          <div className="border-t border-gray-100/80 pt-2.5 mt-3.5 w-full flex justify-between items-center">
                            <span className="text-xs font-extrabold text-gray-400 uppercase">Ajuste</span>
                            <span className={`text-sm font-black ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                              {priceLabel}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Custom Tribute Ribbon Block */}
                <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="ribbon-text-input" className="text-sm font-black text-gray-800 uppercase tracking-wider">
                      Frase da Faixa de Homenagem:
                    </label>
                    <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                      🎗️ Incluso Sem Custo
                    </span>
                  </div>

                  <input
                    id="ribbon-text-input"
                    type="text"
                    placeholder="Ex: Sinceros sentimentos de toda a Família Silva"
                    value={ribbonText}
                    onChange={(e) => setRibbonText(e.target.value)}
                    maxLength={90}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary bg-white text-sm text-gray-900 font-sans font-semibold shadow-inner"
                  />
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium text-gray-500 font-sans">
                      Será impresso exatamente como escrito acima.
                    </span>
                    <span className="text-xs font-bold text-gray-600 font-mono">
                      {ribbonText.length}/90 caracteres
                    </span>
                  </div>

                  {/* Preset quick buttons suggestions */}
                  <div className="mt-4">
                    <span className="text-xs font-black text-gray-600 uppercase block mb-2">
                      Clique para preencher uma frase sugerida:
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-2.5 bg-white rounded-xl border border-gray-100">
                      {PRESET_PHRASES.map((phrase, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setRibbonText(phrase.text)}
                          className="text-xs text-left hover:bg-primary/5 hover:text-primary hover:border-primary border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg transition-colors cursor-pointer truncate font-sans font-semibold"
                          title={`${phrase.category}: ${phrase.text}`}
                        >
                          <span className="text-[10px] bg-gray-100 text-gray-500 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mr-1.5">{phrase.category}</span>
                          {phrase.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Quantity & Direct Checkout Panel */}
                <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-full border border-gray-100 flex-shrink-0 w-full sm:w-auto justify-between shadow-xs">
                    <div className="text-left leading-none">
                      <span className="text-xs text-gray-500 uppercase font-black block">Quantidade</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800 font-black text-base shadow-xs cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-black w-6 text-center font-mono">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800 font-black text-base shadow-xs cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Shopping Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full flex-1">
                    
                    <button
                      onClick={handleAdd}
                      disabled={addedMessage}
                      className={`flex-1 py-4 px-6 rounded-full font-sans text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        addedMessage
                          ? 'bg-green-500 text-white shadow-lg scale-98'
                          : 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      {addedMessage ? (
                        <>
                          <CheckCircle2 size={18} /> Adicionado com Sucesso!
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} /> Adicionar ao Carrinho
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDirectBuyWhatsApp}
                      className="py-4 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-sm font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare size={18} /> Compre pelo WhatsApp
                    </button>

                  </div>
                </div>

              </div>

              {/* Service Trust Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-6 mt-6 text-center text-xs font-bold text-gray-600">
                <div className="flex items-center justify-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Pagamento 100% Seguro</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Award size={16} className="text-primary" />
                  <span>Flores Frescas Nobres</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock size={16} className="text-primary-dark" />
                  <span>Plantão de Vendas 24h</span>
                </div>
              </div>

            </div>

            {/* Quick Delivery / Logistics FAQs specifically for single product view */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-3.5">
                Como funciona a nossa entrega expressa de coroas?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans font-medium">
                Após a confirmação do seu pedido, nosso setor operacional aciona imediatamente a equipe de floristas especializados mais próxima ao cemitério de destino. A coroa de flores é montada de forma imediata e transportada em veículos climatizados apropriados para garantir o frescor total. Você recebe a foto de confirmação e o comprovante de entrega diretamente em seu e-mail ou WhatsApp.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
