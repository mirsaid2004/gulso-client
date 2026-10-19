"use client";

import { useState } from "react";
import { CatalogFilters, CatalogFilterState, DEFAULT_FILTERS } from "./CatalogFilters";
import { CatalogGrid, CatalogResultCount } from "./CatalogGrid";
import { ProductsParams } from "@/features/products/api/get-products";

function toParams(f: CatalogFilterState): ProductsParams {
    return {
        ...(f.category && { category: f.category }),
        ...(f.minPrice && { minPrice: Number(f.minPrice) }),
        ...(f.maxPrice && { maxPrice: Number(f.maxPrice) }),
        ...(f.isNew && { isNew: true }),
        ...(f.isInStock && { isInStock: true }),
        ...(f.hasDiscount && { hasDiscount: true }),
        sortBy: f.sortBy,
        sortDir: f.sortDir,
    };
}

export function CatalogSection() {
    const [draft, setDraft] = useState<CatalogFilterState>(DEFAULT_FILTERS);
    const [applied, setApplied] = useState<ProductsParams>(toParams(DEFAULT_FILTERS));

    const handleApply = () => setApplied(toParams(draft));
    const handleReset = () => {
        setDraft(DEFAULT_FILTERS);
        setApplied(toParams(DEFAULT_FILTERS));
    };

    return (
        <>
            <CatalogResultCount params={applied} />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <CatalogFilters
                    value={draft}
                    onChange={setDraft}
                    onApply={handleApply}
                    onReset={handleReset}
                />
                <CatalogGrid params={applied} />
            </div>
        </>
    );
}
