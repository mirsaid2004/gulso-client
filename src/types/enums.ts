export enum Role {
  USER = "USER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export enum CompanyStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

export enum PayoutStatus {
  PENDING = "PENDING",
  PAID = "PAID",
}

export enum ProductCategory {
  FLOWERS = "FLOWERS",
  GIFTS = "GIFTS",
  BAKERY = "BAKERY",
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export enum OrderStatus {
  ACCEPTED = "ACCEPTED",
  PREPARING = "PREPARING",
  COMPLETED = "COMPLETED",
  IN_DELIVERY = "IN_DELIVERY",
  CANCELLED = "CANCELLED",
}

export enum DeliveryType {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export enum PaymentType {
  ONLINE = "ONLINE",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  PAY_ON_PICKUP = "PAY_ON_PICKUP",
}

export enum ReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}
