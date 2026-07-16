import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  Award, 
  ShieldCheck, 
  MessageSquare, 
  ArrowUp, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Truck, 
  Heart, 
  Layers, 
  BadgeHelp,
  Building,
  UserCheck
} from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetailPage from './components/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import PhraseGeneratorModal from './components/PhraseGeneratorModal';
import Footer from './components/Footer';
import { PRODUCTS, TESTIMONIALS, FAQS } from './data';
import { Product, CartItem } from './types';

// Banners list matching original assets
const HERO_BANNERS = [
  {
    image: 'https://i.imgur.com/bfM10w4.png',
    title: 'Homenagens Dignas com Coroas de Flores Nobres',
    subtitle: 'Entrega Grátis em até 1 Hora para todos os Cemitérios e Velórios do Brasil.',
    badge: 'Atendimento Especializado 24 Horas'
  },
  {
    image: 'https://i.imgur.com/GOaxQT8.png',
    title: 'Luxo e Respeito no Último Adeus',
    subtitle: 'Arranjos exclusivos das categorias Ouro, Platina e Diamante com flores frescas.',
    badge: 'Máximo Padrão de Qualidade'
  },
  {
    image: 'https://i.imgur.com/N7yeSVF.png',
    title: 'Faturamento sem Burocracia para Empresas',
    subtitle: 'Boletos para 15 ou 30 dias com envio imediato de Nota Fiscal Eletrônica (NF-e).',
    badge: 'Soluções Corporativas Premium'
  }
];

export default function App() {
  // Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<number | null>(null);

  // Banner slideshow index
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Back to top scroll state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Automatically rotate banners every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear active product if a category or search query is selected (returns user to catalog)
  useEffect(() => {
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') {
      setActiveProduct(null);
    }
  }, [selectedCategory, searchQuery]);

  // Back to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CART LOGIC
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Find if exact same product with same size AND ribbon text already exists
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize &&
          item.ribbonText === newItem.ribbonText
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        const exist = updated[existingIdx];
        const newQty = exist.quantity + newItem.quantity;
        updated[existingIdx] = {
          ...exist,
          quantity: newQty,
          finalPrice: (exist.product.price + exist.product.sizes.find(s => s.name === exist.selectedSize)!.priceAdjustment) * newQty
        };
        return updated;
      }

      return [...prevCart, newItem];
    });
    
    // Automatically trigger cart drawer view
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const item = updated[index];
      const sizeObj = item.product.sizes.find(s => s.name === item.selectedSize) || item.product.sizes[0];
      const singlePrice = item.product.price + sizeObj.priceAdjustment;
      
      updated[index] = {
        ...item,
        quantity: newQty,
        finalPrice: singlePrice * newQty
      };
      return updated;
    });
  };

  const handleUpdateRibbonText = (index: number, newText: string) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index] = {
        ...updated[index],
        ribbonText: newText
      };
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // FILTER LOGIC
  const getFilteredProducts = () => {
    let result = PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.flowers.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  };

  const filteredList = getFilteredProducts();

  // Helper to split filtered products into original categorized sections (used when viewing 'all' models)
  const getCategoryList = (cat: 'Tradicionais' | 'Ouro' | 'Platina' | 'Diamante' | 'Especiais') => {
    return filteredList.filter((p) => p.category === cat);
  };

  return (
    <div className="min-h-screen bg-lightbg flex flex-col font-sans antialiased text-gray-800">
      
      {/* 1. HEADER (Navigation, Cart access, Category Tabs, and Search queries) */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {activeProduct ? (
        <ProductDetailPage
          product={activeProduct}
          onBack={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      ) : (
        <>
          {/* 2. HERO SLIDESHOW BANNER (Rotating original promotional banners) */}
      <div className="relative w-full h-[260px] md:h-[380px] lg:h-[440px] bg-slate-900 overflow-hidden">
        {HERO_BANNERS.map((banner, index) => {
          const isActive = index === currentBannerIdx;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}

        {/* Carousel indicators */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentBannerIdx ? 'bg-primary w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. CORE SERVICE BENEFITS BANNER (Original horizontal indicators) */}
      <div className="bg-white border-b border-gray-100 py-6 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <Truck className="text-primary flex-shrink-0" size={28} />
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none">Frete Grátis</span>
              <span className="text-xs font-black text-gray-800 uppercase block mt-1">Para todo o Brasil</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="text-primary flex-shrink-0" size={28} />
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none">Faixa de Homenagem</span>
              <span className="text-xs font-black text-gray-800 uppercase block mt-1">Personalizada Grátis</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-primary flex-shrink-0" size={28} />
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none">Entrega Rápida</span>
              <span className="text-xs font-black text-gray-800 uppercase block mt-1">Até 1 hora no local</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="text-primary flex-shrink-0" size={28} />
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block leading-none">Faturamento PJ</span>
              <span className="text-xs font-black text-gray-800 uppercase block mt-1">Boleto e NF-e p/ Empresas</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN PRODUCT CATALOG AND CATEGORIZED VIEWS */}
      <main id="catalogo-main" className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        
        {/* If searching or filtering category, display as a custom grid list */}
        {selectedCategory !== 'all' || searchQuery ? (
          <div>
            <div className="border-b border-gray-200 pb-5 mb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
              <div>
                <span className="text-xs text-gray-400 font-extrabold uppercase tracking-wider block">Filtros Ativos</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">
                  {selectedCategory !== 'all' ? `Categoria: ${selectedCategory}` : 'Todos os Resultados'}
                  {searchQuery && ` para "${searchQuery}"`}
                </h2>
              </div>
              <span className="text-xs text-gray-500 font-semibold font-sans uppercase bg-gray-100 py-1.5 px-3 rounded-md">
                {filteredList.length} coroa(s) encontrada(s)
              </span>
            </div>

            {filteredList.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm my-12">
                <span className="text-4xl">🔍</span>
                <h3 className="font-serif text-lg font-bold text-gray-700 mt-4">Nenhuma coroa encontrada</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Não encontramos coroas de flores correspondentes a "{searchQuery}". Tente buscar por flores como "Rosas", "Lírios", "Gérberas" ou limpe os filtros para ver o catálogo completo.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-6 py-2 px-6 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Limpar Busca e Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredList.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT SINGLE-PAGE HIGH FIDELITY LAYOUT: Display each category section separately with its official original texts */
          <div className="flex flex-col gap-16">
            
            {/* --- SECTION 1: TRADICIONAIS --- */}
            <div>
              <div className="max-w-3xl mb-8 mx-auto text-center">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">Categoria Tradicional</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">Coroa de Flores Tradicionais</h2>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mt-3">
                  Se você está procurando coroas de flores para velório a pronta entrega e com ótimo custo-benefício, a nossa categoria de coroas tradicionais é a escolha ideal para você. Escolher uma coroa de flores tradicional é uma forma simples e elegante de prestar homenagem a quem se foi, sem comprometer a qualidade ou o orçamento.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategoryList('Tradicionais').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            </div>

            {/* DIVIDER BRUSH IMAGE */}
            <div className="flex justify-center select-none py-4 opacity-30">
              <span className="text-xl text-gray-300">════════ • ════════</span>
            </div>

            {/* --- SECTION 2: OURO --- */}
            <div>
              <div className="max-w-3xl mb-8 mx-auto text-center">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">Categoria Ouro</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">Coroa de Flores Ouro</h2>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mt-3">
                  Nossas coroas de flores da categoria ouro são mais do que um gesto de despedida; são uma expressão de respeito e admiração durante um velório. Com uma variedade de cores e flores cuidadosamente selecionadas, oferecemos opções que refletem a importância e o valor daqueles que partiram. Aprecie o brilho reluzente dessas coroas, transmitindo toda a reverência que o momento exige.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategoryList('Ouro').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            </div>

            {/* DIVIDER BRUSH IMAGE */}
            <div className="flex justify-center select-none py-4 opacity-30">
              <span className="text-xl text-gray-300">════════ • ════════</span>
            </div>

            {/* --- SECTION 3: PLATINA --- */}
            <div>
              <div className="max-w-3xl mb-8 mx-auto text-center">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">Categoria Platina</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">Coroa de Flores Platina</h2>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mt-3">
                  Com um acabamento brilhante e deslumbrante, essas coroas de flores são verdadeiramente únicas e incomparáveis em sua beleza. Cada coroa de flores para funeral é cuidadosamente projetada por nossa equipe de floristas experientes, usando as flores mais frescas e de alta qualidade disponíveis. A nossa floricultura oferece uma variedade de designs e tamanhos, à altura daqueles a quem você está homenageando.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategoryList('Platina').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            </div>

            {/* DIVIDER BRUSH IMAGE */}
            <div className="flex justify-center select-none py-4 opacity-30">
              <span className="text-xl text-gray-300">════════ • ════════</span>
            </div>

            {/* --- SECTION 4: DIAMANTE --- */}
            <div>
              <div className="max-w-3xl mb-8 mx-auto text-center">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">Categoria Diamante</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">Coroa de Flores Diamante</h2>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mt-3">
                  Se você está procurando uma maneira única e memorável de homenagear aqueles que partiram, nossa categoria flores para velório em uma coroa em formato de diamante é a escolha perfeita. Com um design elegante e sofisticado, cada peça é cuidadosamente feita à mão por nossa equipe de floristas experientes, usando apenas as flores mais frescas e de alta qualidade.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategoryList('Diamante').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            </div>

            {/* DIVIDER BRUSH IMAGE */}
            <div className="flex justify-center select-none py-4 opacity-30">
              <span className="text-xl text-gray-300">════════ • ════════</span>
            </div>

            {/* --- SECTION 5: ESPECIAIS --- */}
            <div>
              <div className="max-w-3xl mb-8 mx-auto text-center">
                <span className="text-xs text-primary font-black uppercase tracking-widest block">Modelos Exclusivos</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3D3D3D] mt-1">Coroa de Flores Especial</h2>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mt-3">
                  Nós atuamos com opções de flores especiais, cuidadosamente projetadas para refletir os interesses ou paixões daqueles que partiram. Seja uma coroa em forma de arco ou um coração comovente, cada arranjo é uma expressão sincera de amor e memória. Honre o legado da pessoa amada de maneira única e significativa, demonstrando todo o carinho em seu último adeus.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {getCategoryList('Especiais').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setActiveProduct}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 5. INTERACTIVE SECTION: ABOUT & LOGISTICS */}
      <section id="sobre" className="w-full bg-white border-t border-b border-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left content text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <span className="text-xs text-primary font-black uppercase tracking-widest leading-none">Conheça Nossa Floricultura</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3D3D3D] mt-1">
              Sobre a Floricultura Coroas
            </h2>
            <div className="h-[2px] w-12 bg-primary"></div>
            
            <p className="text-base text-gray-600 leading-relaxed font-sans">
              A <strong>Floricultura Coroas</strong> é uma empresa especializada em entregar coroas de flores para velórios em todo o Brasil. Oferecemos uma ampla seleção de opções de coroas, incluindo flores frescas de produtor e folhagens nobres, para atender com total respeito e discrição às necessidades e preferências de nossos clientes.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-sans">
              Nos orgulhamos de oferecer um serviço de altíssima qualidade, rápido e confiável, permitindo que familiares, amigos e corporações prestem suas sinceras condolências e homenageiem seus entes queridos falecidos com um belíssimo e significativo tributo em qualquer capela fúnebre do país.
            </p>

            {/* Certifications row */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-2">
              <div className="flex flex-col">
                <Award className="text-primary" size={20} />
                <span className="text-xs font-black text-gray-800 block mt-1">Faixa Inclusa</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Frase grátis em todos os modelos</span>
              </div>
              <div className="flex flex-col">
                <Clock className="text-primary" size={20} />
                <span className="text-xs font-black text-gray-800 block mt-1">Rápido e Seguro</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Entrega expressa média de 1h</span>
              </div>
              <div className="flex flex-col">
                <ShieldCheck className="text-primary" size={20} />
                <span className="text-xs font-black text-gray-800 block mt-1">Boleto PJ</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Boletos e NF-e para Empresas</span>
              </div>
            </div>
          </div>

          {/* Right graphic presentation banner */}
          <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 pt-[56.25%] lg:pt-[40%] bg-gray-50">
            <img
              src="https://coroadefloresnobre.com.br/wp-content/uploads/al_opt_content/IMAGE/coroadefloresnobre.com.br/wp-content/uploads/2025/08/BANNER-2-comunicacao.webp"
              alt="Atendimento 24 Horas"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkgreen/90 via-darkgreen/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
              <span className="text-[9px] bg-primary text-white font-bold uppercase tracking-widest px-2.5 py-0.5 rounded self-start mb-2">Suporte Humanizado</span>
              <h4 className="font-serif text-lg md:text-xl font-bold">Plantão e Logística Ativa 24h</h4>
              <p className="text-[11px] text-gray-200 mt-1 font-sans">Sua homenagem entregue no momento exato com absoluto cuidado e respeito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CIDADES ATENDIDAS */}
      <section id="cidades" className="w-full py-12 bg-gray-50 border-b border-gray-100 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs text-primary font-black uppercase tracking-widest block">Logística Integrada</span>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#3D3D3D] tracking-tight mt-1">
              Principais cidades com entrega de coroas de flores em até 1h
            </h3>
            <p className="text-sm text-gray-600 font-sans mt-2">
              Atendimento ágil com produção local e entrega expressa gratuita nas seguintes regiões
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'São Paulo', initials: 'SP' },
              { name: 'Rio de Janeiro', initials: 'RJ' },
              { name: 'Curitiba', initials: 'PR' },
              { name: 'Londrina', initials: 'PR' },
              { name: 'Belo Horizonte', initials: 'MG' },
              { name: 'Poços de Caldas', initials: 'MG' },
            ].map((city, idx) => (
              <div 
                key={idx}
                className="aspect-square w-full rounded-2xl bg-gradient-to-br from-darkgreen via-primary-dark to-darkgreen/90 p-4 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm border border-white/5 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Subtle light effect/overlay */}
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                
                {/* Background design accents */}
                <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-colors" />
                
                <span className="font-sans text-xs md:text-sm font-bold text-white text-center z-10 leading-snug drop-shadow-sm group-hover:text-primary-light transition-colors">
                  {city.name}
                </span>
                
                <span className="text-[9px] font-mono tracking-widest text-primary-light/80 mt-1 uppercase z-10">
                  {city.initials}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS (Reviews with rating) */}
      <section id="depoimentos" className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-xs text-primary font-black uppercase tracking-widest leading-none">Opinião de Quem Compra</span>
          <h2 className="font-serif text-3xl font-bold text-[#3D3D3D] mt-1.5 text-center">
            Depoimentos de Clientes da Floricultura Coroas
          </h2>
          <div className="h-[2px] w-12 bg-primary mt-4 mb-10"></div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-5 md:p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
              >
                <div>
                  {/* Testimonial rating header */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 border-t border-gray-200/50 pt-4 mt-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200/80 bg-white">
                    <img 
                      src={test.image} 
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-gray-800 block leading-tight">{test.name}</span>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5 block">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Click to Call CTA banner below feedback */}
          <div className="mt-12 w-full max-w-2xl bg-darkgreen text-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-white/5 relative overflow-hidden">
            {/* Background glowing circle */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            <div>
              <span className="text-xs text-primary-light font-black uppercase tracking-wider block">Suporte Humanizado</span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-white mt-1 leading-tight">Precisa de auxílio imediato por telefone?</h3>
              <p className="text-xs text-gray-300 mt-1 font-sans">Fale direto com nossa mesa de vendas sem fila de espera.</p>
            </div>
            
            <a 
              href="tel:08000000000"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all flex-shrink-0"
            >
              <Phone size={14} />
              Clique e Ligue - 24 Horas
            </a>
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION (Interactive dropdowns) */}
      <section id="perguntas-frequentes" className="w-full py-16 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs text-primary font-black uppercase tracking-widest leading-none block">Dúvidas Frequentes</span>
            <h2 className="font-serif text-3xl font-bold text-[#3D3D3D] mt-2">
              Perguntas Frequentes sobre a compra de Coroa de Flores para Velório
            </h2>
            <div className="h-[2px] w-12 bg-primary mt-4 mx-auto"></div>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    className="w-full py-4.5 px-6 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-gray-800 font-sans">
                      {faq.question}
                    </span>
                    <span className="text-primary flex-shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-72 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="p-6 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans bg-gray-50/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
        </>
      )}

      {/* 9. FOOTER (Site Map, Policies, Corporate details) */}
      <Footer
        onCategorySelect={setSelectedCategory}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
      />

      {/* --- MODAL POPUPS --- */}

      {/* B. Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onUpdateRibbonText={handleUpdateRibbonText}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* C. Checkout logistics form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        cart={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={handleClearCart}
      />

      {/* D. Mourning Memorial notice Generator Modal */}
      <PhraseGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
      />

      {/* E. FLOATING CORNER CONTACT & CONVERSATION DISPATCHER (Floating WhatsApp Checkout Operator Widget) */}
      <div className="fixed bottom-6 right-6 z-35 flex flex-col gap-2.5 items-end">
        
        {/* Call support notice bubble */}
        <div className="hidden sm:flex bg-white text-gray-800 shadow-lg border border-gray-100 rounded-full py-2 px-4.5 items-center gap-2 animate-bounce hover:scale-102 transition-transform select-none">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-600 font-sans">
            Plantão 24h Ativo • Compre no WhatsApp
          </span>
        </div>

        {/* Floating Green WhatsApp Button */}
        <button
          onClick={() => {
            if (cart.length > 0) {
              setIsCheckoutOpen(true);
            } else {
              // Open default contact directly if cart is empty
              window.open('https://api.whatsapp.com/send?phone=558000000000&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20as%20coroas%20de%20flores!', '_blank');
            }
          }}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          title="Falar no WhatsApp"
        >
          {/* Pulsing visual waves */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-60 pointer-events-none"></div>
          
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Back to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-30 p-2.5 bg-white border border-gray-100 text-gray-600 hover:text-primary rounded-full shadow-lg transition-all hover:scale-105"
          aria-label="Voltar ao Topo"
        >
          <ArrowUp size={18} />
        </button>
      )}

    </div>
  );
}
