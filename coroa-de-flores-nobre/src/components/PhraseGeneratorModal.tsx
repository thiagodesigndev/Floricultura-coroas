import React, { useState, useRef } from 'react';
import { X, Copy, Heart, Sparkles, Image, Check, FileText } from 'lucide-react';

interface PhraseGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MESSAGES_PRESETS = [
  'Com profundo pesar, comunicamos o falecimento de nosso querido ente. Sua lembrança, amor e ensinamentos viverão para sempre em nossos corações.',
  'Aqueles que amamos nunca morrem, apenas partem antes de nós. É com dor e imensa saudade que informamos o seu passamento para a pátria espiritual.',
  'Combati o bom combate, acabei a carreira, guardei a fé. Comunicamos com pesar o falecimento de nosso amado familiar. Agradecemos o carinho de todos.',
  'Agradecemos a Deus pelo privilégio de ter compartilhado a vida com alguém tão especial. Informamos com tristeza o seu sepultamento e convites de oração.',
  'Seu ciclo na Terra se encerra com a certeza de um dever cumprido com amor e integridade. Deixará saudades eternas em nossos corações.'
];

export default function PhraseGeneratorModal({ isOpen, onClose }: PhraseGeneratorModalProps) {
  const [name, setName] = useState('Maria de Lourdes da Silva');
  const [birthDate, setBirthDate] = useState('14/05/1948');
  const [deathDate, setDeathDate] = useState('14/07/2026');
  const [message, setMessage] = useState(MESSAGES_PRESETS[0]);
  const [venue, setVenue] = useState('Cemitério Parque da Colina - Sala 2');
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const textToCopy = `⭐ NOTA DE FALECIMENTO ⭐\n\n` +
      `Comunicamos com profundo pesar o falecimento de:\n` +
      `🕊️ *${name.toUpperCase()}*\n` +
      `★ ${birthDate}  |  † ${deathDate}\n\n` +
      `"${message}"\n\n` +
      `📍 *Cerimônia de Despedida:*\n` +
      `• Local: ${venue}\n\n` +
      `Agradecemos a todos pelas orações, mensagens de apoio e carinho neste momento difícil.\n` +
      `Homenagem carinhosa de toda a família.`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] animate-scale-up">
        
        {/* Left: Input Form */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col gap-4 border-r border-gray-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 text-primary-dark">
              <FileText size={18} />
              <h2 className="font-serif text-lg font-bold">Criar Nota de Falecimento</h2>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nome Completo do Ente Querido</label>
              <input
                type="text"
                placeholder="Ex: Maria de Lourdes da Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
              />
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Data de Nascimento</label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50 text-center"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Data do Falecimento</label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50 text-center"
                />
              </div>
            </div>

            {/* Venue */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Local do Velório / Cerimônia</label>
              <input
                type="text"
                placeholder="Ex: Cemitério Parque da Colina - Sala 2"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50"
              />
            </div>

            {/* Message with Presets */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Frase / Mensagem de Pesar</label>
              <textarea
                rows={3}
                placeholder="Mensagem em memória..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-3.5 py-2 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs bg-gray-50/50 resize-none font-sans"
              />
              
              <div className="mt-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Sugestões de Mensagens:</span>
                <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto">
                  {MESSAGES_PRESETS.map((pText, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setMessage(pText);
                        setActivePreset(pIdx);
                      }}
                      className={`text-left p-2 rounded-lg text-[10px] border transition-all ${
                        message === pText 
                          ? 'bg-primary/5 border-primary/40 text-primary-dark font-medium'
                          : 'bg-white hover:bg-gray-50 border-gray-100 text-gray-600'
                      }`}
                    >
                      {pText}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Visual Card Preview & Download controls */}
        <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col justify-between max-h-[42vh] md:max-h-full">
          <div className="hidden md:flex justify-between items-center border-b border-gray-200/60 pb-3 mb-4">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Visualização Digital da Nota</span>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Card Preview Frame */}
          <div className="flex-1 flex items-center justify-center p-2 mb-4">
            <div 
              ref={cardRef}
              className="w-full max-w-[340px] bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-lg border border-slate-800 relative overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
              }}
            >
              {/* Floral background decoration */}
              <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 text-white">
                  <path fill="currentColor" d="M50,15 C45,30 30,45 30,50 C30,65 45,80 50,85 C55,80 70,65 70,50 C70,45 55,30 50,15 Z" />
                </svg>
              </div>

              {/* Cross symbol */}
              <div className="text-primary-light text-2xl font-serif mb-3.5 z-10 flex items-center gap-2">
                <span>🕊️</span>
                <span className="font-normal font-serif">†</span>
                <span>🕊️</span>
              </div>

              <span className="text-[10px] text-primary-light font-bold uppercase tracking-widest font-sans z-10">
                Nota de Falecimento
              </span>

              <h4 className="font-serif text-lg md:text-xl font-bold mt-2 text-white leading-tight max-w-[240px] break-words uppercase tracking-tight z-10">
                {name || 'Nome Completo'}
              </h4>

              <div className="flex items-center gap-2.5 my-3 text-gray-400 font-sans text-[11px] font-bold z-10">
                <span>★ {birthDate || 'Nascimento'}</span>
                <span>•</span>
                <span className="text-primary-light">† {deathDate || 'Falecimento'}</span>
              </div>

              <div className="w-8 h-[1px] bg-slate-700 my-2 z-10"></div>

              <p className="font-sans text-[11px] text-gray-300 leading-relaxed italic z-10 px-2 line-clamp-4 min-h-[48px]">
                "{message || 'Mensagem memorial...'}"
              </p>

              <div className="w-full mt-4 pt-3.5 border-t border-slate-800 z-10">
                <span className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Cerimônia de Despedida</span>
                <span className="text-[11px] text-primary-light font-semibold font-sans block max-w-[260px] truncate">
                  {venue || 'Local da Cerimônia'}
                </span>
              </div>

              <div className="absolute bottom-2 text-[7px] text-slate-600 font-sans select-none pointer-events-none">
                Gerado por Floricultura Coroas
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 border-t border-gray-200/60 pt-4 bg-gray-50">
            <button
              onClick={handleCopyText}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-full font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-500" /> Copiado!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copiar Texto WhatsApp
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-full font-montserrat text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              Imprimir / Salvar PDF
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
