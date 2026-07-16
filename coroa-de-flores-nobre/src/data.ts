import { Product, Testimonial, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  // --- TRADICIONAIS ---
  {
    id: 1,
    name: 'Coroa de Flores Tradicional A',
    category: 'Tradicionais',
    price: 360,
    rating: 4.86,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/01/a-3-440x440.jpg',
    flowers: 'Crisântemos Brancos, Gérberas Amarelas e Flores da Época de Campo',
    description: 'Nossa opção de entrada clássica e respeitosa. Uma composição harmoniosa de flores do campo e gérberas de excelente qualidade.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 2,
    name: 'Coroa de Flores Tradicional B',
    category: 'Tradicionais',
    price: 395,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/b-4-scaled-e1730477128297-440x440.jpg',
    flowers: 'Gérberas Coloridas Premium, Crisântemos e Folhagens Nobres',
    description: 'Uma coroa alegre e celebrativa da vida, composta por gérberas coloridas selecionadas e crisântemos brilhantes.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 3,
    name: 'Coroa de Flores Tradicional C',
    category: 'Tradicionais',
    price: 425,
    rating: 4.67,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/c-3-scaled-e1730477217332-440x440.jpg',
    flowers: 'Rosas Brancas, Crisântemos Brancos e Flores do Campo Monsenhor',
    description: 'Homenagem serena e elegante com predominância de rosas brancas e crisântemos, transmitindo paz e luz.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 4,
    name: 'Coroa de Flores Tradicional G',
    category: 'Tradicionais',
    price: 450,
    rating: 4.67,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/g-1-1-440x440.jpg',
    flowers: 'Gérberas Amarelas, Crisântemos e Flores Silvestres Amarelas',
    description: 'Arranjo com tons dourados e amarelos, simbolizando a luz eterna e as memórias radiantes compartilhadas.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 5,
    name: 'Coroa de Flores Tradicional F',
    category: 'Tradicionais',
    price: 525,
    rating: 4.5,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/f-3-440x440.jpg',
    flowers: 'Rosas Vermelhas, Gérberas Brancas e Crisântemos Brancos',
    description: 'Contraste imponente de rosas vermelhas sobre fundo branco. Transmite sentimentos profundos de amor e consideração.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 6,
    name: 'Coroa de Flores Tradicional E',
    category: 'Tradicionais',
    price: 570,
    rating: 4.67,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/e-3-440x440.jpg',
    flowers: 'Gérberas Vermelhas e Brancas, com Crisântemos Brancos Nobres',
    description: 'Arranjo vibrante e acolhedor, combinando a paixão das gérberas vermelhas com a pureza das flores brancas de campo.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },
  {
    id: 7,
    name: 'Coroa de Flores Tradicional D',
    category: 'Tradicionais',
    price: 435,
    rating: 4.33,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/d-com-outro-fundo-branco-3-scaled-e1730485569760-440x440.jpg',
    flowers: 'Copos de Leite (conforme época), Gérberas Brancas e Crisântemos do Campo',
    description: 'Uma coroa de pura paz e quietude. Tons brancos e folhagens nobres que dão um toque de grande sobriedade.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Indicada para jazigos e salas menores.' },
      { name: 'Médio (1,20m)', priceAdjustment: 80, description: 'Tamanho padrão com excelente preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 160, description: 'Imponente e com maior destaque de flores.' }
    ]
  },

  // --- OURO ---
  {
    id: 8,
    name: 'Coroa de Flores Ouro A',
    category: 'Ouro',
    price: 585,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/A-1-440x440.jpg',
    flowers: 'Gérberas Coloridas Premium, Rosas Amarelas de Luxo e Crisântemos',
    description: 'Design refinado da categoria Ouro. Uma belíssima seleção de gérberas de primeira linha e rosas douradas.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 9,
    name: 'Coroa de Flores Ouro F',
    category: 'Ouro',
    price: 565,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/03/f-1-1-440x440.jpg',
    flowers: 'Rosas Cor de Rosa Premium, Antúrios e Flores do Campo Delicadas',
    description: 'Homenagem de extrema delicadeza, marcada por tons pastéis, rosas cor-de-rosa de luxo e antúrios nobres.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 10,
    name: 'Coroa de Flores Ouro G',
    category: 'Ouro',
    price: 630,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/G-2-440x440.jpg',
    flowers: 'Rosas Vermelhas Nacionais, Gérberas Amarelas e Antúrios Brancos',
    description: 'Composição solar e enérgica, ideal para celebrar memórias fortes e o amor incondicional que permanece.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 11,
    name: 'Coroa de Flores Ouro D',
    category: 'Ouro',
    price: 590,
    rating: 4.67,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/D-com-outro-fundo-branco-2-440x440.jpg',
    flowers: 'Lírios Brancos, Rosas Brancas Premium e Gérberas Alvas',
    description: 'Arranjo elegante e majestoso com lírios perfumados e rosas brancas selecionadas. Transmite sinceras condolências.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 12,
    name: 'Coroa de Flores Ouro E',
    category: 'Ouro',
    price: 675,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/03/E-ouro-com-outro-fundo-branco-1-440x440.jpg',
    flowers: 'Rosas Importadas, Copos de Leite Nobres e Gérberas Vermelhas',
    description: 'Destaque absoluto e sofisticação. Flores de corte nobre com um acabamento verdejante e volumoso de alto padrão.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 13,
    name: 'Coroa de Flores Ouro C',
    category: 'Ouro',
    price: 545,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/C-1-1-440x440.jpg',
    flowers: 'Rosas Vermelhas Premium, Monsenhor Amarelo e Gérberas Brancas',
    description: 'Combinação clássica que une o amor das rosas vermelhas à paz das flores brancas, com toque dourado do monsenhor.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },
  {
    id: 14,
    name: 'Coroa de Flores Ouro B',
    category: 'Ouro',
    price: 520,
    rating: 4.5,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/b-2-440x440.jpg',
    flowers: 'Antúrios Coloridos, Gérberas Amarelas e Crisântemos Nobres',
    description: 'Uma coroa tradicionalmente nobre, com a presença marcante de antúrios e flores do campo selecionadas.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Excelente densidade floral básica.' },
      { name: 'Médio (1,20m)', priceAdjustment: 100, description: 'Arranjo encorpado com folhagens duplas.' },
      { name: 'Grande (1,50m)', priceAdjustment: 200, description: 'Homenagem digna de grande destaque no salão.' }
    ]
  },

  // --- PLATINA ---
  {
    id: 15,
    name: 'Coroa de Flores Platina A',
    category: 'Platina',
    price: 930,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/a-2-440x440.jpg',
    flowers: 'Lírios Brancos, Rosas Brancas Importadas, Orquídeas e Antúrios Premium',
    description: 'Sofisticação extrema. Uma obra-prima floral com lírios majestosos e orquídeas que transmitem máxima honra.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },
  {
    id: 16,
    name: 'Coroa de Flores Platina C',
    category: 'Platina',
    price: 1090,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/C-2-1-440x440.jpg',
    flowers: 'Orquídeas Phalaenopsis, Rosas Importadas Vermelhas e Antúrios Nobres',
    description: 'O mais requintado contraste do vermelho com orquídeas brancas. Ideal para prestar homenagens solenes e inesquecíveis.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },
  {
    id: 17,
    name: 'Coroa de Flores Platina F',
    category: 'Platina',
    price: 1060,
    rating: 4.8,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/F-2-440x440.jpg',
    flowers: 'Lírios Amarelos, Rosas Coloridas Luxo, Orquídeas e Gérberas',
    description: 'Arranjo majestoso e suntuoso, com cores quentes e flores nobres que ressaltam carinho, respeito e gratidão eterna.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },
  {
    id: 18,
    name: 'Coroa de Flores Platina D',
    category: 'Platina',
    price: 985,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/D-2-1-440x440.jpg',
    flowers: 'Rosas Brancas Importadas, Copos de Leite Luxo, Antúrios e Lírios Alvos',
    description: 'Simboliza a transição pacífica e a eternidade. Flores nobres em total harmonia alva com folhagens exóticas.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },
  {
    id: 19,
    name: 'Coroa de Flores Platina E',
    category: 'Platina',
    price: 855,
    rating: 4.9,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/03/E-2-440x440.jpg',
    flowers: 'Gérberas Vermelhas de Luxo, Rosas Importadas e Antúrios Vermelhos',
    description: 'Uma belíssima e apaixonante homenagem em tons de vermelho profundo, com folhagens nobres de eucalipto e palmeira.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },
  {
    id: 20,
    name: 'Coroa de Flores Platina B',
    category: 'Platina',
    price: 1020,
    rating: 4.7,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/B-3-440x440.jpg',
    flowers: 'Orquídeas, Lírios Brancos de Luxo, Rosas Cor de Rosa e Antúrios',
    description: 'A união das mais nobres espécies florais do mercado. Um tributo repleto de carinho, gratidão e muito respeito.',
    sizes: [
      { name: 'Pequeno (1,00m)', priceAdjustment: 0, description: 'Arranjo premium compacto de luxo.' },
      { name: 'Médio (1,20m)', priceAdjustment: 120, description: 'Padrão Platina de alta densidade e preenchimento.' },
      { name: 'Grande (1,50m)', priceAdjustment: 240, description: 'Presença avassaladora e as flores mais luxuosas do dia.' }
    ]
  },

  // --- DIAMANTE ---
  {
    id: 21,
    name: 'Coroa de Flores Diamante C',
    category: 'Diamante',
    price: 1305,
    rating: 4.9,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/C-2-440x440.jpg',
    flowers: 'Orquídeas Phalaenopsis Brancas, Rosas de Luxo e Antúrios Gigantes',
    description: 'O ápice da elegância fúnebre. Design monumental com orquídeas raras em cascata que demonstram supremo apreço.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },
  {
    id: 22,
    name: 'Coroa de Flores Diamante B',
    category: 'Diamante',
    price: 1105,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/b-1-1-440x440.jpg',
    flowers: 'Lírios Brancos, Orquídeas Phalaenopsis, Rosas Amarelas e Antúrios',
    description: 'Homenagem radiante e luxuosa. A riqueza dos tons amarelos de rosas premium combinada com a delicadeza de lírios brancos.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },
  {
    id: 23,
    name: 'Coroa de Flores Diamante A',
    category: 'Diamante',
    price: 970,
    rating: 4.8,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/A-440x440.jpg',
    flowers: 'Copos de Leite Extra, Orquídeas de Luxo e Rosas Brancas Importadas',
    description: 'Arranjo solene em formato de cascata diamantada. Expressa a mais pura paz e o eterno descanso da alma.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },
  {
    id: 24,
    name: 'Coroa de Flores Diamante F',
    category: 'Diamante',
    price: 3360,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/03/F-440x440.jpg',
    flowers: 'Orquídeas Nobres Raras, Rosas Importadas Selecionadas e Lírios de Luxo',
    description: 'Arranjo de presença monumental. O tributo máximo com as flores mais nobres e caras do mundo para homenagear grandes legados.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },
  {
    id: 25,
    name: 'Coroa de Flores Diamante D',
    category: 'Diamante',
    price: 1990,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/D-4-440x440.jpg',
    flowers: 'Orquídeas Phalaenopsis Coloridas, Rosas de Luxo, Antúrios e Lírios Premium',
    description: 'Uma explosão elegante de cores e texturas. O arranjo mais expressivo para celebrar de forma eterna a memória do falecido.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },
  {
    id: 26,
    name: 'Coroa de Flores Diamante E',
    category: 'Diamante',
    price: 2420,
    rating: 4.9,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/02/E-2-440x440.jpg',
    flowers: 'Orquídeas Raras de Luxo, Rosas Vermelhas Importadas e Antúrios Vermelhos Exóticos',
    description: 'Homenagem imponente em tons rubi e folhagens tropicais de alto luxo. Expressão de profunda paixão e reverência eterna.',
    sizes: [
      { name: 'Padrão Único (1,40m)', priceAdjustment: 0, description: 'Arranjo majestoso com estrutura de madeira reforçada.' }
    ]
  },

  // --- ESPECIAIS ---
  {
    id: 27,
    name: 'Arco de flores Premium Ouro',
    category: 'Especiais',
    price: 1025,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/ARCO-DE-PREMIUM-OURO-1-440x440.jpg',
    flowers: 'Arco Majestoso de Gérberas, Crisântemos e Rosas Ouro Premium',
    description: 'Arranjo em formato de arco triunfal. Representa a passagem respeitosa da vida e celebra a jornada eterna.',
    sizes: [
      { name: 'Tamanho Único', priceAdjustment: 0, description: 'Tamanho único imponente e muito volumoso.' }
    ]
  },
  {
    id: 28,
    name: 'Arco de flores Premium Platina',
    category: 'Especiais',
    price: 1440,
    rating: 4.8,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/ARCO-PREMIUM-PLATINA-2-440x440.jpg',
    flowers: 'Orquídeas Phalaenopsis, Lírios e Rosas Brancas Luxo em Arco',
    description: 'Tributo de luxo absoluto em formato arqueado. Combinado com folhagens nobres de asplênio e costela-de-adão.',
    sizes: [
      { name: 'Tamanho Único', priceAdjustment: 0, description: 'Tamanho único imponente e muito volumoso.' }
    ]
  },
  {
    id: 29,
    name: 'Coração de flores Premium Ouro',
    category: 'Especiais',
    price: 1090,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CORACAO-PREMIUM-OURO-3-440x440.jpg',
    flowers: 'Arranjo em formato de Coração de Rosas Vermelhas e Gérberas Premium',
    description: 'Simboliza o amor infinito que guardamos no coração. Feito em formato perfeito de coração para exprimir afeto sincero.',
    sizes: [
      { name: 'Tamanho Único', priceAdjustment: 0, description: 'Coração esculpido à mão em espuma fenólica.' }
    ]
  },
  {
    id: 30,
    name: 'Coração de Flores Premium Platina',
    category: 'Especiais',
    price: 1780,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CORACAO-PREMIUM-PLATINA-1-440x440.jpg',
    flowers: 'Orquídeas Nobres, Rosas Vermelhas de Luxo e Antúrios Vermelhos',
    description: 'A mais bela e luxuosa declaração de amor e respeito eterno. O coração platina une orquídeas puras com rosas vermelhas importadas.',
    sizes: [
      { name: 'Tamanho Único', priceAdjustment: 0, description: 'Coração esculpido à mão em espuma fenólica.' }
    ]
  },
  {
    id: 31,
    name: 'Conjunto de Coroa de Flores Tradicional',
    category: 'Especiais',
    price: 1665,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CONJUNTO-DE-FLORES-TRADICIONAL-1-440x440.jpg',
    flowers: 'Duas coroas de flores tradicionais coordenadas para uma presença marcante',
    description: 'Combinação de duas coroas de flores tradicionais nobres. Garante uma homenagem de grande imponência em ambas as laterais do altar.',
    sizes: [
      { name: 'Conjunto de 2 Coroas', priceAdjustment: 0, description: 'Par de coroas de flores coordenadas.' }
    ]
  },
  {
    id: 32,
    name: 'Conjunto de Coroa de Flores Ouro',
    category: 'Especiais',
    price: 2130,
    rating: 4.9,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CONJUNTO-DE-FLORES-OURO-1-440x440.jpg',
    flowers: 'Duas coroas da categoria Ouro coordenadas em tons elegantes de respeito',
    description: 'Conjunto majestoso de duas coroas da categoria Ouro. Ideal para grandes cerimônias, empresas ou homenagens familiares coletivas.',
    sizes: [
      { name: 'Conjunto de 2 Coroas', priceAdjustment: 0, description: 'Par de coroas de flores coordenadas.' }
    ]
  },
  {
    id: 33,
    name: 'Conjunto de Coroa de Flores Platina',
    category: 'Especiais',
    price: 2875,
    rating: 4.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CONJUNTO-DE-FLORES-PLATINA-440x440.jpg',
    flowers: 'Duas coroas Platina luxuosas combinando Lírios e Rosas Nobres',
    description: 'Homenagem de gala. Duas coroas Platina perfeitamente sintonizadas para prestar a homenagem corporativa ou familiar definitiva.',
    sizes: [
      { name: 'Conjunto de 2 Coroas', priceAdjustment: 0, description: 'Par de coroas de flores coordenadas.' }
    ]
  },
  {
    id: 34,
    name: 'Conjunto de Coroa de Flores Diamante',
    category: 'Especiais',
    price: 3795,
    rating: 5.0,
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2020/09/CONJUNTO-DE-FLORES-DIAMANTE-1-440x440.jpg',
    flowers: 'Duas coroas de flores Diamante coordenadas com orquídeas nobres',
    description: 'O mais alto padrão de homenagem do mercado brasileiro. Duas coroas diamantadas com arranjos volumosos de orquídeas nobres.',
    sizes: [
      { name: 'Conjunto de 2 Coroas', priceAdjustment: 0, description: 'Par de coroas de flores coordenadas.' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Renata Araújo',
    location: 'Jundiaí - SP',
    text: 'Sou de Jundiaí, e perdi um parente em Osasco, fui super bem atendida e com rapidez. Recomendo a Floricultura Coroas, gratidão aos atendentes extremamente atenciosos.',
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2023/08/Coroa-flores-24h.png'
  },
  {
    id: 2,
    name: 'Dra. Roseli de Almeida',
    location: 'São Paulo - SP',
    text: 'Devido à urgência, foram excepcionais no cuidado, atendimento e entrega. O pessoal da Floricultura Coroas foi tão cuidadoso que nos enviaram fotos e vídeo da coroa, pois não estivemos no enterro. Muito grata em nome do IMREA HCFM USP pela atenção a nossa equipe.',
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2023/08/Cliente-floricultura-24-horas-coroas.png'
  },
  {
    id: 3,
    name: 'Robson Porto',
    location: 'Belo Horizonte - MG',
    text: 'Gostei muito da experiência com a Floricultura Coroas; Atendimento rápido e impecável. Fui atendido de madrugada, agradeço muito pela atenção. Eu recomendo.',
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2023/08/Cliente-coroa-flores.png'
  },
  {
    id: 4,
    name: 'Ana Paula Bottarini',
    location: 'Caxias do Sul - RS',
    text: 'Serviço excelente, desde o atendimento até a entrega das coroas de flores no velório. Foram muito sensíveis, principalmente neste momento tão doloroso. Parabéns para a equipe toda!',
    image: 'https://coroadefloresnobre.com.br/wp-content/uploads/2023/08/Cliente-coroa-de-flores-rj.png'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'Como posso realizar um pedido de coroa de flores?',
    answer: 'Você pode comprar uma coroa de flores nobre pela Floricultura Coroas através do WhatsApp, telefone ou diretamente em nosso site. Para agilizar o pedido, basta ter em mãos: nome do falecido(a), horário e local do velório e a frase de homenagem para a faixa. O pagamento é facilitado via Pix, boleto ou cartão de crédito.'
  },
  {
    id: 2,
    question: 'Quais flores serão utilizadas na montagem?',
    answer: 'Nossos arranjos são feitos exclusivamente com flores frescas e selecionadas por nossos floristas na data de entrega. A escolha exata das flores pode variar ligeiramente de acordo com a estação do ano, mas sempre respeitamos rigorosamente o padrão de cores e o luxo associado à categoria escolhida (Tradicional, Ouro, Platina, Diamante).'
  },
  {
    id: 3,
    question: 'O frete é grátis para todo o Brasil? Qual o prazo?',
    answer: 'Sim, oferecemos FRETE GRÁTIS para qualquer cemitério, crematório, igreja ou salão de velório do Brasil. O nosso prazo médio de entrega é de até 1 hora após a aprovação do pedido, graças à nossa rede capilar de floriculturas parceiras locais de altíssima qualidade.'
  },
  {
    id: 4,
    question: 'A faixa de homenagem personalizada está inclusa?',
    answer: 'Sim! Em todos os nossos modelos, a faixa de homenagem personalizada é 100% gratuita. Você pode escrever a frase que desejar para prestar o último adeus com honra e carinho. Também oferecemos um gerador automático de frases caso precise de ajuda na escolha das palavras.'
  },
  {
    id: 5,
    question: 'Vocês realizam faturamento para empresas (NF-e)?',
    answer: 'Sim, realizamos faturamento com Nota Fiscal Eletrônica (NF-e) para empresas. O boleto bancário faturado pode ser emitido para 15 ou 30 dias de acordo com as necessidades do setor financeiro de sua corporação. Entre em contato pelo WhatsApp ou telefone para faturamento direto.'
  },
  {
    id: 6,
    question: 'O atendimento funciona em fins de semana e madrugadas?',
    answer: 'Sim! Nosso suporte e produção funcionam 24 horas por dia, 7 dias por semana, incluindo feriados nacionais. Estamos prontos para atender a qualquer momento de urgência com máxima dedicação e respeito.'
  }
];
