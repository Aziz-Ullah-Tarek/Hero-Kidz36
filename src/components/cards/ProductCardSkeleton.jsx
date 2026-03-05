import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md border border-gray-200 rounded-xl animate-pulse">
      {/* Image Skeleton */}
      <figure className="relative overflow-hidden rounded-t-xl bg-gray-200 h-64 w-full">
        <div className="w-full h-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </figure>

      {/* Card Body Skeleton */}
      <div className="card-body p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        {/* Bangla text Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-7 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Buttons Skeleton */}
        <div className="card-actions mt-3 gap-2 flex">
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
          <div className="h-10 bg-gray-200 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
}

// Component to render multiple skeletons
export function ProductCardSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
