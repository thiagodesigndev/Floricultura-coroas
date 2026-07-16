import React, { useState } from 'react';
import { Phone, Search, ShoppingCart, MessageSquare, Menu, X, Landmark, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onOpenGenerator: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onOpenGenerator
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { id: 'all', label: 'Todos os Modelos' },
    { id: 'Tradicionais', label: 'Tradicionais' },
    { id: 'Ouro', label: 'Categoria Ouro' },
    { id: 'Platina', label: 'Categoria Platina' },
    { id: 'Diamante', label: 'Categoria Diamante' },
    { id: 'Especiais', label: 'Especiais / Conjuntos' }
  ];

  return (
    <header className="w-full relative z-40 bg-white shadow-sm">
      {/* 3. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <img 
            src="https://i.imgur.com/whB5s7I.png" 
            alt="Floricultura Coroas" 
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* SEARCH BAR (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Buscar modelo ou tipo de flor (ex: Rosas, Lírios)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary focus:bg-white bg-gray-50 text-sm transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 text-xs font-semibold"
            >
              Limpar
            </button>
          )}
        </div>

        {/* CALL TO ACTION BUTTONS & CART */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Vendas 24h (Grátis)</span>
            <a href="tel:08000000000" className="font-sans font-extrabold text-gray-800 hover:text-primary text-sm md:text-base leading-tight">
              0800 000 0000
            </a>
          </div>

          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Capitais & Regiões</span>
            <a href="tel:30030000" className="font-sans font-extrabold text-gray-800 hover:text-primary text-sm md:text-base leading-tight">
              3003-0000
            </a>
          </div>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-primary/10 text-primary-dark hover:bg-primary hover:text-white rounded-full transition-all duration-300 flex items-center justify-center"
            title="Ver Carrinho"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SEARCH BAR (Mobile layout) */}
      <div className="px-4 pb-3 block md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar coroa de flores..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-primary bg-gray-50 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 4. NAVIGATION BAR WITH FILTER TABS */}
      <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-center">
          <nav className="flex items-center gap-8 py-1">
            {/* 1. Coroa de flores dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors cursor-pointer">
                Coroa de Flores
                <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
              </button>
              
              <div className="absolute left-0 top-full pt-1.5 w-60 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onCategoryChange(cat.id);
                        const element = document.getElementById('catalogo-main');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 block ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white font-extrabold'
                          : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Frases Homenagem */}
            <button
              onClick={onOpenGenerator}
              className="py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Frases Homenagem
            </button>

            {/* 3. Sobre Nós */}
            <a
              href="#sobre"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors"
            >
              Sobre Nós
            </a>

            {/* 4. Nota de Falecimento */}
            <button
              onClick={onOpenGenerator}
              className="py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors cursor-pointer"
            >
              Nota de Falecimento
            </button>

            {/* 5. Cidades */}
            <a
              href="#cidades"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cidades')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors"
            >
              Cidades
            </a>

            {/* 6. Contato */}
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>

      {/* 5. MOBILE DRAWER NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50">
          <div className="p-4 flex flex-col gap-3">
            <nav className="flex flex-col gap-1">
              
              {/* 1. Coroa de Flores Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="flex items-center justify-between w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg text-left"
                >
                  <span>Coroa de Flores</span>
                  {mobileCategoriesOpen ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                {mobileCategoriesOpen && (
                  <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1 bg-gray-50/50 rounded-lg mt-1 border border-gray-100">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onCategoryChange(cat.id);
                          setMobileMenuOpen(false);
                          setTimeout(() => {
                            const element = document.getElementById('catalogo-main');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className={`w-full text-left py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Frases Homenagem */}
              <button
                onClick={() => {
                  onOpenGenerator();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Frases Homenagem
              </button>

              {/* 3. Sobre Nós */}
              <a
                href="#sobre"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg block"
              >
                Sobre Nós
              </a>

              {/* 4. Nota de Falecimento */}
              <button
                onClick={() => {
                  onOpenGenerator();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Nota de Falecimento
              </button>

              {/* 5. Cidades */}
              <a
                href="#cidades"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('cidades')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg block"
              >
                Cidades
              </a>

              {/* 6. Contato */}
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 rounded-lg block"
              >
                Contato
              </a>

            </nav>

            <div className="h-[1px] bg-gray-100 my-1"></div>

            {/* Phone numbers inside menu drawer */}
            <div className="flex flex-col gap-2 bg-primary/5 p-3.5 rounded-xl border border-primary/10">
              <span className="text-[10px] font-bold text-primary-dark uppercase tracking-wider leading-none">Central de Atendimento 24h</span>
              <div className="flex flex-col gap-1.5 mt-1">
                <a href="tel:08000000000" className="flex items-center gap-2 font-sans font-extrabold text-gray-800 hover:text-primary text-xs">
                  <Phone size={14} className="text-primary" />
                  0800 000 0000 <span className="text-[10px] font-normal text-gray-500">(Nacional)</span>
                </a>
                <a href="tel:30030000" className="flex items-center gap-2 font-sans font-extrabold text-gray-800 hover:text-primary text-xs">
                  <Phone size={14} className="text-primary" />
                  3003-0000 <span className="text-[10px] font-normal text-gray-500">(Capitais)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
