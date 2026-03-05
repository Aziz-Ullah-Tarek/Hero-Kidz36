import React from 'react';
import { dbconnect, collections } from '@/lib/dbconnect';
import ProductCard from '@/components/cards/ProductCard';
import { ErrorAlert, EmptyState, Badge, Container } from '@/components/ui/CommonUI';

export const metadata = {
    title: "সকল খেলনা পণ্য - শিশুদের জন্য শিক্ষামূলক খেলনা",
    description: "হিরো কিডস-এর বিশাল কালেকশন থেকে শিশুদের জন্য শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট এবং আরও অনেক কিছু কিনুন। সাশ্রয়ী মূল্যে সেরা মানের পণ্য।",
    keywords: ["খেলনা", "শিশু খেলনা", "শিক্ষামূলক খেলনা", "বেবি প্রোডাক্ট", "টয় শপ বাংলাদেশ", "অনলাইন খেলনা"],
    openGraph: {
        title: "সকল খেলনা পণ্য - হিরো কিডস",
        description: "বাংলাদেশের সবচেয়ে বড় খেলনা কালেকশন। শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট এবং আরও অনেক কিছু।",
        type: "website",
        url: "https://herokidz36.vercel.app/routes/products",
        images: [
            {
                url: "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png",
                width: 1200,
                height: 630,
                alt: "হিরো কিডস খেলনা কালেকশন",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "সকল খেলনা পণ্য - হিরো কিডস",
        description: "বাংলাদেশের সবচেয়ে বড় খেলনা কালেকশন দেখুন।",
        images: ["https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png"],
    },
    alternates: {
        canonical: "https://herokidz36.vercel.app/routes/products",
    }
};

const ProductsPage = async () => {
    // Fetch products from MongoDB
    let products = [];
    let error = null;
    
    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        products = await productsCollection.find({}).toArray();
        // Convert MongoDB ObjectId to string for serialization
        products = products.map(product => ({
            ...product,
            _id: product._id.toString()
        }));
    } catch (err) {
        console.error("Error fetching products:", err);
        error = err.message;
    }

    return (
        <Container>
            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 space-y-3 animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center bangla-heading">
                    সকল খেলনা পণ্য
                </h1>
                <p className="text-gray-600 text-center max-w-2xl bangla-text">
                    আমাদের বিশাল কালেকশন থেকে আপনার পছন্দের খেলনা খুঁজে নিন
                </p>
                <div className="w-32 h-1.5 bg-linear-to-r from-pink-500 to-yellow-500 rounded-full"></div>
            </div>

            {/* Error State */}
            {error && (
                <ErrorAlert 
                    title="ডাটা লোড করতে সমস্যা হয়েছে"
                    message={error}
                />
            )}

            {/* Products Count */}
            {!error && products?.length > 0 && (
                <div className="text-center mb-6">
                    <Badge variant="primary" size="lg">
                        <span className="bangla-font">মোট {products.length} টি পণ্য পাওয়া গেছে</span>
                    </Badge>
                </div>
            )}

            {/* Products Grid */}
            {!error && products?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-slideInUp">
                    {products.map((product, index) => (
                        <ProductCard 
                            key={product._id || index} 
                            product={product} 
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!error && products?.length === 0 && (
                <EmptyState 
                    icon="🧸"
                    title="কোনো পণ্য পাওয়া যায়নি"
                    description="দয়া করে পরে আবার চেষ্টা করুন"
                />
            )}
        </Container>
    );
};

export default ProductsPage;