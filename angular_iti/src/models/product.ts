export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
  category: string;
  brand: string;
  rating: number;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    description: 'The iPhone 15 Pro features a strong and light aerospace-grade titanium design. It also has a powerful camera system and the advanced A17 Pro chip.',
    price: 999,
    stock: 5,
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60',
    category: 'smartphones',
    brand: 'Apple',
    rating: 4.8
  },
  {
    id: 2,
    title: 'MacBook Pro M3',
    description: 'The MacBook Pro M3 is supercharged for intensive tasks, featuring a gorgeous Liquid Retina XDR display and exceptional battery life.',
    price: 1999,
    stock: 3,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    category: 'laptops',
    brand: 'Apple',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5',
    description: 'Industry-leading noise-canceling headphones with premium sound quality, clear calls, and comfortable design for all-day listening.',
    price: 349,
    stock: 10,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    category: 'headphones',
    brand: 'Sony',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch. Designed for outdoor adventures and supercharged workouts with a bright Always-On display.',
    price: 799,
    stock: 0, // Out of stock to test the requirements
    thumbnail: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&auto=format&fit=crop&q=60',
    category: 'smartwatches',
    brand: 'Apple',
    rating: 4.6
  },
  {
    id: 5,
    title: 'iPad Pro M4',
    description: 'The thin iPad Pro with an advanced Tandem OLED display. Powered by the breakthrough M4 chip for mind-blowing performance.',
    price: 999,
    stock: 7,
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60',
    category: 'tablets',
    brand: 'Apple',
    rating: 4.9
  },
  {
    id: 6,
    title: 'AirPods Pro 2',
    description: 'Magical wireless earbuds with advanced Active Noise Cancellation, Adaptive Audio, and touch control volume adjustments.',
    price: 249,
    stock: 12,
    thumbnail: 'https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=500&auto=format&fit=crop&q=60',
    category: 'headphones',
    brand: 'Apple',
    rating: 4.8
  }
];
