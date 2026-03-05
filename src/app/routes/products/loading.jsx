import React from 'react';
import { ProductCardSkeletonGrid } from '@/components/cards/ProductCardSkeleton';
import { Container } from '@/components/ui/CommonUI';

export default function ProductsLoading() {
    return (
        <Container>
            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 space-y-3">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center bangla-heading">
                    সকল খেলনা পণ্য
                </h1>
                <p className="text-gray-600 text-center max-w-2xl bangla-text">
                    পণ্য লোড হচ্ছে...
                </p>
                <div className="w-32 h-1.5 bg-linear-to-r from-pink-500 to-yellow-500 rounded-full"></div>
            </div>

            {/* Loading Skeleton Grid */}
            <ProductCardSkeletonGrid count={9} />
        </Container>
    );
}
