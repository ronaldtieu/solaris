// Product types
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  badge?: 'New' | 'Hot' | null;
}

// Cart types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Fighter types
export interface Fighter {
  name: string;
  nickname: string;
  discipline: string;
  bio: string;
  image: string;
  record: string;
  weight: string;
  badge?: string;
  social?: {
    instagram?: string;
    twitter?: string;
  };
}

// Instagram post types
export interface InstagramPost {
  image: string;
  likes: string;
  comments: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: string;
  instagram?: string;
  followers?: string;
  tiktok?: string;
  youtube?: string;
  location?: string;
  achievements?: string;
  message: string;
  submittedAt: string;
}
