
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  name: string;
  department: string;
  section: string;
  orderHistory: OrderRecord[];
}

export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
}

export type Category = 
  | 'All' | 'Anime' | 'Naruto' | 'Dragon Ball Z' | 'One Piece' 
  | 'Attack on Titan' | 'Death Note' | 'Demon Slayer' | 'My Hero Academia' 
  | 'Jujutsu Kaisen' | 'Bleach' | 'Tokyo Revengers' | 'Blue Lock' | 'Solo leveling'
  | 'One Punch Man' | 'Wind Breaker' | 'Sports' | 'Actors' | 'Love' 
  | 'Marvel' | 'DC' | 'Hollywood' | 'Tamil Movies' | 'Cartoon' 
  | 'K-Pop' | 'K-Drama' | 'Singers' | 'Heroines';
