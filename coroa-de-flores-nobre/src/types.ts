export interface Product {
  id: number;
  name: string;
  category: 'Tradicionais' | 'Ouro' | 'Platina' | 'Diamante' | 'Especiais';
  price: number;
  rating: number;
  image: string;
  description: string;
  flowers: string;
  sizes: {
    name: string;
    priceAdjustment: number;
    description: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  ribbonText: string;
  finalPrice: number;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  image: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
