"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import inventory from "./inventory.json";

function Product({ product }: { product: Product }) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      key={product.id}
      className="flex flex-col rounded-lg h-80 bg-surface-container-lowest overflow-hidden shadow-md"
    >
      <div className="relative flex-1 ">
        <Image
          className="object-cover"
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
           25vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFgwJ/l0p3WAAAAABJRU5ErkJggg=="
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="flex flex-col flex-1 px-4 gap-2 border-l-2 border-primary-4 py-2">
        <div className="flex flex-row text-sm">
          <span className="text-on-surface-container font-semibold">
            {product.id}
          </span>
          <span className="flex-1"></span>
          <span className="text-primary-3 font-semibold">${product.price}</span>
        </div>
        <span className="font-headline font-bold text-md">{product.name}</span>
      </div>
    </div>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
  suministro?: number;
  category: string;
  imageUrl: string;
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  function fetchProducts() {
    return inventory;
  }

  useEffect(() => {
    setProducts(fetchProducts());
  }, []);
  return (
    <section className="bg-background min-h-screen p-8 justify-start items-start flex flex-col gap-4">
      <div className="flex flex-row w-full">
        <div className="flex flex-col flex-1 gap-4">
          <h2 className={`font-headline font-bold text-3xl `}>Inventory</h2>
          <p className="text-md text-gray-500 font-semibold">
            Manage your products and supplies
          </p>
        </div>
        <div className="flex flex-row gap-4 text-on-secondary-container font-semibold text-sm my-auto">
          <label
            className="select-none flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container  rounded-md "
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            <span className="select-none material-symbols-outlined">list</span>
            Toggle View
          </label>
          <label className="select-none flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container  rounded-md ">
            <span className="select-none material-symbols-outlined">
              filter_list
            </span>
            Filter
          </label>
          <label className="select-none flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container rounded-md ">
            <span className="select-none material-symbols-outlined">
              ios_share
            </span>
            Export
          </label>
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-8">
        {products &&
          products.map((current) => {
            return <Product key={current.id} product={current} />;
          })}
      </ul>
    </section>
  );
}
