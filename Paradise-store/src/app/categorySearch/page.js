"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCategory from "@/component/ProductCategory";

// Wrap the component with Suspense
const CategorySearchContent = () => {
  const searchParams = useSearchParams();
  const cat = searchParams.get("category");
  const sub = searchParams.get("subcategory");

  return <ProductCategory cat={cat} sub={sub} />;
};

const CategorySearch = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategorySearchContent />
    </Suspense>
  );
};

export default CategorySearch;
