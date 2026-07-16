import React from 'react';
import { Phone, Clock, Mail, ShieldAlert, BadgeCheck, FileCheck, CheckCircle } from 'lucide-react';

interface FooterProps {
  onCategorySelect: (catId: string) => void;
  onOpenGenerator: () => void;
}

export default function Footer({ onCategorySelect, onOpenGenerator }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, catId: string) => {
    e.preventDefault();
    onCategorySelect(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="w-full bg-darkgreen text-white font-sans mt-16 border-t-4 border-primary">
      
      {/* 1. KEY VALUE VALUE-PROPOSITION GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-white/10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
            🚚
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Frete Grátis Nacional</h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Entrega rápida gratuita para todos os cemitérios e crematórios do Brasil em até 1 hora.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
            🎗️
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Faixa de Homenagem Grátis</h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Adicione e personalize mensagens de carinho na faixa inclusa em todas as coroas sem custo adicional.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
            🏢
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Faturamento PJ com NF-e</h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Opção de faturamento corporativo para 15 ou 30 dias com envio eletrônico direto de notas fiscais.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
            📞
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Atendimento 24 Horas</h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Equipe dedicada 24h por dia, todos os dias do ano, para dar suporte e encaminhar suas homenagens.
            </p>
          </div>
        </div>
      </div>

      {/* 2. COMPREHENSIVE LINKS & DIRECTORY */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand presentation */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.imgur.com/whB5s7I.png" 
              alt="Floricultura Coroas" 
              className="h-10 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Somos especializados em coroas de flores para velório, proporcionando um serviço rápido, sério e de alta sensibilidade para confortar corações e homenagear com máxima dignidade.
          </p>
          <div className="flex flex-col gap-2 mt-2 text-xs text-gray-300">
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              Funcionamento: 24h / 7 dias por semana
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              contato@floriculturacoroas.com.br
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-primary-light">Categorias de Coroas</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-gray-300">
            <li>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Tradicionais')} className="hover:text-primary transition-colors">
                Coroas Tradicionais
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Ouro')} className="hover:text-primary transition-colors">
                Coroas de Categoria Ouro
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Platina')} className="hover:text-primary transition-colors">
                Coroas de Categoria Platina
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Diamante')} className="hover:text-primary transition-colors">
                Coroas de Categoria Diamante
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Especiais')} className="hover:text-primary transition-colors">
                Coroas Especiais & Arcos / Corações
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-primary-light">Links Úteis</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-gray-300">
            <li>
              <button onClick={onOpenGenerator} className="hover:text-primary transition-colors text-left">
                Gerador de Nota de Falecimento
              </button>
            </li>
            <li>
              <a href="#perguntas-frequentes" className="hover:text-primary transition-colors">
                Frases de Homenagem Sugeridas
              </a>
            </li>
            <li>
              <a href="#perguntas-frequentes" className="hover:text-primary transition-colors">
                Perguntas Frequentes (FAQ)
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-primary transition-colors">
                Sobre Nossa Floricultura
              </a>
            </li>
            <li>
              <a href="#depoimentos" className="hover:text-primary transition-colors">
                Depoimentos e Avaliações
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Contacts & Office Address */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-primary-light">Canais Oficiais</h4>
          <div className="flex flex-col gap-3">
            
            {/* Direct Line */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <Phone size={16} className="text-primary-light" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold leading-none">Ligação Gratuita</span>
                <a href="tel:08000000000" className="text-sm font-extrabold text-white block mt-0.5 hover:text-primary transition-colors">
                  0800 000 0000
                </a>
              </div>
            </div>

            {/* Direct Line Capitais */}
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <Phone size={16} className="text-primary-light" />
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold leading-none">Capitais & Regiões</span>
                <a href="tel:30030000" className="text-sm font-extrabold text-white block mt-0.5 hover:text-primary transition-colors">
                  3003-0000
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 3. PARTNERS & BADGES GRID */}
      <div className="bg-black/20 py-8 border-t border-white/5 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-300">
            <span>PIX (Confirmação na Hora)</span>
            <span>•</span>
            <span>Boleto Bancário Faturado PJ</span>
            <span>•</span>
            <span>Cartão Visa, Mastercard, Elo, Amex, Hipercard</span>
          </div>
          
          {/* Security icons */}
          <div className="flex items-center gap-4 text-emerald-500 font-bold text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
              🔒 SSL Protegido
            </span>
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
              ✓ CNPJ Auditado
            </span>
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
              🛡️ Google Trust
            </span>
          </div>
        </div>
      </div>

      {/* 4. BASE REGULATORY COPYRIGHT FOOTER */}
      <div className="bg-black/30 py-6 text-center text-xs text-gray-400 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 leading-relaxed flex flex-col gap-2">
          <span>
            © {currentYear} Floricultura Coroas. Todos os direitos reservados.
          </span>
          <span className="text-[10px] text-gray-500">
            Razão Social: Floricultura Coroas LTDA • CNPJ: 00.000.000/0001-00 • Avenida das Flores, 123 - Centro, São Paulo - SP, CEP 01001-000.
          </span>
          <span className="text-[9px] text-gray-600 block mt-1">
            As imagens e composições florais representam fielmente os arranjos entregues, podendo haver leves variações naturais de botões florais dependendo da sazonalidade local.
          </span>
        </div>
      </div>

    </footer>
  );
}
