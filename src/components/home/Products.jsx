import React from 'react';
import { dbconnect, collections } from '@/lib/dbconnect';
import ProductCard from '@/components/cards/ProductCard';
import Link from 'next/link';
import { ErrorAlert, EmptyState, SectionHeader } from '@/components/ui/CommonUI';

const Products = async () => {
    // Fetch limited products for home page
    let products = [];
    let error = null;
    
    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        const allProducts = await productsCollection.find({}).limit(8).toArray();
        
        // Convert MongoDB ObjectId to string for serialization
        products = allProducts.map(product => ({
            ...product,
            _id: product._id.toString()
        }));
    } catch (err) {
        console.error("Error fetching products:", err);
        error = err.message;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Section Header */}
            <SectionHeader 
                title="জনপ্রিয় খেলনা"
                subtitle="আমাদের সবচেয়ে জনপ্রিয় ও বেস্ট সেলার খেলনার কালেকশন"
            />

            {/* Error State */}
            {error && (
                <ErrorAlert 
                    title="ডাটা লোড করতে সমস্যা হয়েছে"
                    message={error}
                />
            )}

            {/* Products Grid */}
            {!error && products?.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <ProductCard 
                                key={product._id || index} 
                                product={product} 
                            />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="flex justify-center mt-10">
                        <Link href="/routes/products">
                            <button className="btn btn-primary btn-lg gap-2">
                                সব পণ্য দেখুন
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </>
            )}

            {/* Empty State */}
            {!error && products?.length === 0 && (
                <EmptyState 
                    icon="🧸"
                    title="কোনো পণ্য পাওয়া যায়নি"
                    description="দয়া করে পরে আবার চেষ্টা করুন"
                />
            )}
        </div>
    );
};

export default Products;