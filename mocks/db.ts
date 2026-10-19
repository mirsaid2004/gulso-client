import seed from "./data/db.json";

// In-memory copy of the static seed. Mutations live until the page reloads
// (browser worker and Node server each keep their own copy).
export const db: {
  users: any[];
  companies: any[];
  products: any[];
  orders: any[];
  notifications: any[];
  comments: any[];
} = structuredClone(seed);

export function nextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}
