"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductsModal from "./ProductsModal";
import Image from "next/image";

export default function ProductsGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const preview = products.slice(0, 1);
  const large = preview[0];

  return (
    <section id="products" className="section-pad bg-offwhite">
      <div className="container-xl">
        <div className="mb-12 text-center">
          <span className="eyebrow">Our Products</span>
          <h2 className="mt-2 font-heading text-h3 md:text-h2 text-[#404C3E]">
            A Glimpse of Our Range
          </h2>
          <div className="mx-auto flex w-full max-w-[280px]  items-center gap-3">
            <span className="block h-px w-full bg-primary-green" />
            <Image
              src="/Images/lineLeaf.png"
              alt="leaf"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {large && (
            <div className="group overflow-hidden rounded-img">
              <img
                src='/Images/productSection.png'
                alt={large.name}
                className="h-full max-h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="text-left">
            <div className="space-y-4 text-[16px] leading-relaxed text-text-gray">
              <p className="text-justify">
                We are sourcing the best of seeds, spices, nuts, oils, pulses, naturally derived food additives, plant-based protein powders, plant extracts, freeze dried fruits and vegetables, and pairing that with a decade of experience in the packaging industry to provide our clients with the product they want, the way they want it, including white-labelling solutions.
              </p>
              <p className="text-justify">
                As a business, we constantly strive to not only keep up with the latest developments in health and food industries, but also work with our partners to develop products that can create better end-products and make a meaningful impact.
              </p>
              <p className="text-justify">
                We do not just chase transactions; we build supply chains. We actively seek long-term, contractual partnerships with global food processors to ensure a consistent, predictable, and price-stable supply of raw materials, mitigating the risks of global market volatility.
              </p>
            </div>

            <div className="mt-8 flex justify-start">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-btn bg-primary-green px-7 py-3.5 text-[16px] font-medium text-white shadow-btn transition-colors hover:bg-hover-green"
              >
                View all Products <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductsModal open={modalOpen} onClose={() => setModalOpen(false)} products={products} />
    </section>
  );
}
