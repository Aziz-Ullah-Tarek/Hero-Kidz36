"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { calculateDiscountedPrice, isOnSale, getDiscountBadgeText } from "@/lib/utils";

export default function ProductCard({ product }) {
  const {
    title,
    bangla,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
  } = product;

  const discountedPrice = calculateDiscountedPrice(price, discount);
  const onSale = isOnSale(discount);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-xl">
      
      {/* Image Section */}
      <figure className="relative overflow-hidden rounded-t-xl">
        <Image
          src={image}
          alt={title}
          width={200}
          height={180}
          className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {onSale && (
          <div className="absolute top-3 left-3 badge badge-error text-white gap-1 px-3 py-3">
            <MdLocalOffer />
            {getDiscountBadgeText(discount)}
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body p-4 space-y-2">

        {/* Title */}
        <h2 className="font-semibold text-lg line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-1">
          {bangla}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 font-medium">{ratings}</span>
          </div>
          <span className="text-gray-400">({reviews} reviews)</span>
          <span className="text-gray-400">• {sold} sold</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-primary">
            ৳{Math.round(discountedPrice)}
          </span>

          {onSale && (
            <span className="text-sm line-through text-gray-400">
              ৳{price}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="card-actions mt-3 gap-2">
          <Link href={`/routes/products/${product._id}`} className="flex-1">
            <button className="btn btn-outline btn-primary btn-sm w-full gap-2">
              <FaEye />
              বিস্তারিত
            </button>
          </Link>
          <button className="btn btn-primary btn-sm flex-1 gap-2">
            <FaShoppingCart />
            কার্ট
          </button>
        </div>
      </div>
    </div>
  );
}
