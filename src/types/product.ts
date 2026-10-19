import { ProductCategory, ProductStatus } from "./enums";

export interface ProductTranslationDTO {
  name: string;
  description: string;
  specifications: string[];
}

export interface CreateProductRequest {
  translations?: Record<string, ProductTranslationDTO>;
  name: string;
  description?: string;
  specifications?: string[];
  price: number;
  discount?: number;
  stockQuantity: number;
  category: ProductCategory;
  imageIds: number[];
  deliveryAvailable?: boolean;
  pickupAvailable?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  translations?: Record<string, ProductTranslationDTO>;
  specifications?: string[];
  stockQuantity?: number;
  category?: ProductCategory;
  imageIds?: number[];
  deliveryAvailable?: boolean;
  pickupAvailable?: boolean;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  stockQuantity: number;
  company: {
    id: number;
    name: string;
  };
  isNew: boolean;
  isBestSeller: boolean;
}

export interface MediaResponse {
  id: number;
  url: string;
  primary: boolean;
}

export interface ProductDetailedResponse {
  id: number;
  name: string;
  description: string;
  specifications: string[];
  status: ProductStatus;
  available: boolean;
  media: MediaResponse[];
  category: ProductCategory;
  isNew: boolean;
  isBestSeller: boolean;
  price: number;
  discount: number;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  company: {
    id: number;
    name: string;
  };
}

export interface ProductFilter {
  search?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  companyId?: number;
  isActive?: boolean;
  isNew?: boolean;
  isInStock?: boolean;
  hasDiscount?: boolean;
}
