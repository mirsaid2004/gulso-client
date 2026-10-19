import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import {
  ApiResponse,
  ProductResponse,
  ProductDetailedResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ProductCategory,
  ProductStatus,
} from "@/types";
import { db } from "../db";

const SUPPORTED_LANGS = ["en", "az", "ru"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

function resolveLang(header: string | null): Lang {
  const primary = (header ?? "en").split(",")[0].trim().split("-")[0];
  return (SUPPORTED_LANGS as readonly string[]).includes(primary)
    ? (primary as Lang)
    : "en";
}

function flattenProduct(
  p: any,
  lang: Lang,
  company: { id: number; name: string }
): ProductResponse {
  return {
    id: p.id,
    name: p.name[lang] ?? p.name.en,
    price: p.price,
    discount: p.discount,
    rating: p.rating,
    reviewCount: p.reviewCount,
    imageUrl: p.imageUrl,
    stockQuantity: p.stockQuantity,
    company,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
  };
}

export const productHandlers = [
  // GET /api/v1/products
  http.get(`${baseUrl}/products`, ({ request }) => {
    const lang = resolveLang(request.headers.get("Accept-Language"));
    const q = new URL(request.url).searchParams;

    const search     = q.get("search")?.toLowerCase();
    const category   = q.get("category");
    const minPrice   = q.get("minPrice") ? Number(q.get("minPrice")) : undefined;
    const maxPrice   = q.get("maxPrice") ? Number(q.get("maxPrice")) : undefined;
    const status     = q.get("status");
    const companyId  = q.get("companyId") ? Number(q.get("companyId")) : undefined;
    const isNew      = q.get("isNew");
    const isInStock  = q.get("isInStock");
    const hasDiscount = q.get("hasDiscount");
    const sortBy     = q.get("sortBy") ?? "id";
    const sortDir    = q.get("sortDir") ?? "desc";
    const page       = Number(q.get("page") ?? 0);
    const size       = Number(q.get("size") ?? 20);

    let products = [...db.products];
    const companyMap = Object.fromEntries(db.companies.map((c) => [c.id, c]));

    // --- filter ---
    if (search)
      products = products.filter((p) =>
        (p.name.en + p.name.az + p.name.ru).toLowerCase().includes(search)
      );
    if (category)
      products = products.filter((p) => p.category === category);
    if (minPrice !== undefined)
      products = products.filter((p) => p.price >= minPrice);
    if (maxPrice !== undefined)
      products = products.filter((p) => p.price <= maxPrice);
    if (status)
      products = products.filter((p) => p.detail?.status === status);
    if (companyId !== undefined)
      products = products.filter((p) => p.companyId === companyId);
    if (isNew === "true")
      products = products.filter((p) => p.isNew);
    if (isInStock === "true")
      products = products.filter((p) => p.stockQuantity > 0);
    if (hasDiscount === "true")
      products = products.filter((p) => p.discount > 0);

    // --- sort ---
    products.sort((a, b) => {
      let av = a[sortBy] ?? 0;
      let bv = b[sortBy] ?? 0;
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    // --- paginate ---
    const total     = products.length;
    const lastPage  = Math.max(1, Math.ceil(total / size));
    const paginated = products.slice(page * size, page * size + size);

    const data: ProductResponse[] = paginated.map((p) =>
      flattenProduct(p, lang, {
        id: p.companyId,
        name: companyMap[p.companyId]?.name ?? "",
      })
    );

    return HttpResponse.json<ApiResponse<ProductResponse[]>>({
      success: true,
      data,
      meta: { currentPage: page, lastPage, perPage: size, total },
    });
  }),

  // GET /api/v1/products/:id
  http.get(`${baseUrl}/products/:id`, ({ params, request }) => {
    const lang = resolveLang(request.headers.get("Accept-Language"));

    const p = db.products.find((product) => product.id === Number(params.id));
    if (!p)
      return HttpResponse.json({ success: false, message: "Not found" }, { status: 404 });

    const company = db.companies.find((c) => c.id === p.companyId) ?? { id: p.companyId, name: "" };

    const data: ProductDetailedResponse = {
      id: p.id,
      name: p.name[lang] ?? p.name.en,
      description: p.detail.description[lang] ?? p.detail.description.en,
      specifications: p.detail.specifications[lang] ?? p.detail.specifications.en,
      status: p.detail.status as ProductStatus,
      available: p.detail.available,
      media: p.detail.media,
      category: p.category as ProductCategory,
      isNew: p.isNew,
      isBestSeller: p.isBestSeller,
      price: p.price,
      discount: p.discount,
      stockQuantity: p.stockQuantity,
      rating: p.rating,
      reviewCount: p.reviewCount,
      company: { id: company.id, name: company.name },
    };

    return HttpResponse.json<ApiResponse<ProductDetailedResponse>>({ success: true, data });
  }),

  // GET /api/v1/company/:companyId/products
  http.get(`${baseUrl}/company/:companyId/products`, ({ params, request }) => {
    const lang = resolveLang(request.headers.get("Accept-Language"));

    const companyId = Number(params.companyId);
    const products = db.products.filter((p) => p.companyId === companyId);
    const company = db.companies.find((c) => c.id === companyId) ?? { id: companyId, name: "" };

    const data: ProductResponse[] = products.map((p) =>
      flattenProduct(p, lang, { id: company.id, name: company.name })
    );

    return HttpResponse.json<ApiResponse<ProductResponse[]>>({
      success: true,
      data,
      meta: { currentPage: 0, lastPage: 1, perPage: data.length, total: data.length },
    });
  }),

  // POST /api/v1/seller/products
  http.post<any, CreateProductRequest, ApiResponse<ProductDetailedResponse>>(
    `${baseUrl}/seller/products`,
    async ({ request }) => {
      const body = await request.json();
      return HttpResponse.json({
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000),
          name: body.name,
          description: body.description ?? "",
          specifications: body.specifications ?? [],
          price: body.price,
          discount: body.discount ?? 0,
          status: ProductStatus.ACTIVE,
          available: true,
          stockQuantity: body.stockQuantity,
          rating: 0,
          reviewCount: 0,
          category: body.category,
          isNew: true,
          isBestSeller: false,
          company: { id: 1, name: "Gullar do'koni" },
          media: body.imageIds.map((id: number) => ({
            id,
            url: `https://via.placeholder.com/600?text=Image+${id}`,
            primary: false,
          })),
        },
      });
    }
  ),

  // PUT /api/v1/seller/products/:productId
  http.put<any, UpdateProductRequest, ApiResponse<ProductDetailedResponse>>(
    `${baseUrl}/seller/products/:productId`,
    async ({ params, request }) => {
      const body = await request.json();
      return HttpResponse.json({
        success: true,
        data: {
          id: Number(params.productId),
          name: body.name ?? "Updated Product",
          description: body.description ?? "",
          specifications: body.specifications ?? [],
          price: body.price ?? 100,
          discount: body.discount ?? 0,
          status: ProductStatus.ACTIVE,
          available: true,
          stockQuantity: body.stockQuantity ?? 10,
          rating: 4.0,
          reviewCount: 5,
          category: body.category ?? ProductCategory.FLOWERS,
          isNew: false,
          isBestSeller: false,
          company: { id: 1, name: "Gullar do'koni" },
          media: [],
        },
      });
    }
  ),

  // DELETE /api/v1/seller/products/:id
  http.delete(`${baseUrl}/seller/products/:id`, () =>
    HttpResponse.json({ success: true, data: null })
  ),
];
