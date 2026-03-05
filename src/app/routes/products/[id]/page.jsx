import React from 'react';
import { dbconnect, collections, ObjectId } from '@/lib/dbconnect';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaShoppingCart, FaArrowLeft, FaBox, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { calculateDiscountedPrice, isOnSale, getDiscountBadgeText } from '@/lib/utils';
import { Container } from '@/components/ui/CommonUI';

// Generate metadata for dynamic product pages
export async function generateMetadata({ params }) {
    const { id } = await params;
    
    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        
        if (!product) {
            return {
                title: "পণ্য খুঁজে পাওয়া যায়নি",
                description: "এই পণ্যটি আর উপলব্ধ নেই।"
            };
        }

        const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
        const productUrl = `https://herokidz36.vercel.app/routes/products/${id}`;
        
        return {
            title: `${product.title} - হিরো কিডস`,
            description: product.description || `${product.title} - ${product.category} - হিরো কিডস থেকে সাশ্রয়ী মূল্যে কিনুন। মূল্য: ৳${discountedPrice}`,
            keywords: [product.title, product.category, "খেলনা", "শিশু খেলনা", "হিরো কিডস", product.brand || ""].filter(Boolean),
            openGraph: {
                title: product.title,
                description: product.description || `${product.title} - ${product.category}`,
                type: "product",
                url: productUrl,
                images: [
                    {
                        url: product.image || "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png",
                        width: 800,
                        height: 800,
                        alt: product.title,
                    }
                ],
                siteName: "হিরো কিডস - Hero Kidz",
            },
            twitter: {
                card: "summary_large_image",
                title: product.title,
                description: product.description || `${product.title} - ${product.category}`,
                images: [product.image || "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png"],
            },
            alternates: {
                canonical: productUrl,
            },
            other: {
                'product:price:amount': discountedPrice,
                'product:price:currency': 'BDT',
                'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
                'product:category': product.category,
                'product:brand': product.brand || 'Hero Kidz',
            }
        };
    } catch (error) {
        console.error('Error generating product metadata:', error);
        return {
            title: "পণ্য - হিরো কিডস",
            description: "শিশুদের জন্য শিক্ষামূলক খেলনা এবং পণ্য"
        };
    }
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        const products = await productsCollection.find({}).limit(20).toArray();
        
        return products.map((product) => ({
            id: product._id.toString(),
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    let product = null;
    let error = null;

    try {
        const productsCollection = await dbconnect(collections.PRODUCTS);
        const productData = await productsCollection.findOne({ _id: new ObjectId(id) });
        
        if (productData) {
            product = {
                ...productData,
                _id: productData._id.toString()
            };
        }
    } catch (err) {
        console.error("Error fetching product:", err);
        error = err.message;
    }

    if (error || !product) {
        return (
            <Container>
                <div className="text-center py-20">
                    <div className="mb-4">
                        <span className="text-6xl">😞</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        পণ্য খুঁজে পাওয়া যায়নি
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {error || 'এই পণ্যটি আর উপলব্ধ নেই'}
                    </p>
                    <Link href="/routes/products">
                        <button className="btn btn-primary gap-2">
                            <FaArrowLeft />
                            পণ্য তালিকায় ফিরে যান
                        </button>
                    </Link>
                </div>
            </Container>
        );
    }

    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
    const savings = product.price - discountedPrice;
    const onSale = isOnSale(product.discount);

    // Product JSON-LD Structured Data
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "image": product.image || "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png",
        "description": product.description || product.title,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Hero Kidz"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://herokidz36.vercel.app/routes/products/${id}`,
            "priceCurrency": "BDT",
            "price": discountedPrice,
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "হিরো কিডস - Hero Kidz",
                "url": "https://herokidz36.vercel.app"
            }
        },
        "category": product.category,
        "sku": product._id,
        "aggregateRating": product.rating ? {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": product.reviewCount || 1
        } : undefined
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li><Link href="/routes/products">পণ্য</Link></li>
                    <li className="font-semibold">{product.title}</li>
                </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <div className="relative">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        
                        {/* Discount Badge */}
                        {onSale && (
                            <div className="absolute top-4 left-4 badge badge-error text-white gap-1 px-4 py-4 text-lg">
                                <MdLocalOffer />
                                {getDiscountBadgeText(product.discount)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            {product.title}
                        </h1>
                        <p className="text-xl text-gray-600">
                            {product.bangla}
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-yellow-500 text-lg">
                            <FaStar className="mr-1" />
                            <span className="font-bold mr-1">{product.ratings}</span>
                            <span className="text-gray-400">({product.reviews} রিভিউ)</span>
                        </div>
                        <div className="badge badge-success gap-2">
                            {product.sold} বিক্রি হয়েছে
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-linear-to-r from-pink-50 to-yellow-50 p-6 rounded-xl border-2 border-pink-200">
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-extrabold text-primary">
                                ৳{Math.round(discountedPrice)}
                            </span>
                            {onSale && (
                                <>
                                    <span className="text-2xl line-through text-gray-400">
                                        ৳{product.price}
                                    </span>
                                    <span className="badge badge-error text-white text-sm">
                                        ৳{Math.round(savings)} সাশ্রয়
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div>
                            <h3 className="text-xl font-bold mb-2">বিবরণ</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Size & Color Options */}
                    <div className="space-y-4">
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">সাইজ</h3>
                                <div className="flex gap-2">
                                    {product.sizes.map((size, index) => (
                                        <button key={index} className="btn btn-outline btn-sm">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.color && product.color.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">রং</h3>
                                <div className="flex gap-2">
                                    {product.color.map((color, index) => (
                                        <button key={index} className="btn btn-outline btn-sm">
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button className="btn btn-primary btn-lg w-full gap-2 text-lg">
                            <FaShoppingCart />
                            কার্টে যোগ করুন
                        </button>
                        <button className="btn btn-accent btn-lg w-full gap-2 text-lg">
                            এখনই কিনুন
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                        <div className="flex items-center gap-3">
                            <FaTruck className="text-2xl text-primary" />
                            <div>
                                <p className="font-semibold text-sm">ফ্রি ডেলিভারি</p>
                                <p className="text-xs text-gray-500">৫০০+ অর্ডারে</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaShieldAlt className="text-2xl text-success" />
                            <div>
                                <p className="font-semibold text-sm">নিরাপদ পণ্য</p>
                                <p className="text-xs text-gray-500">১০০% অথেনটিক</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaBox className="text-2xl text-warning" />
                            <div>
                                <p className="font-semibold text-sm">রিটার্ন সুবিধা</p>
                                <p className="text-xs text-gray-500">৭ দিনের মধ্যে</p>
                            </div>
                        </div>
                    </div>

                    {/* Q&A Section */}
                    {product.qna && product.qna.length > 0 && (
                        <div className="pt-6 border-t">
                            <h3 className="text-xl font-bold mb-4">প্রশ্ন ও উত্তর</h3>
                            <div className="space-y-3">
                                {product.qna.map((item, index) => (
                                    <div key={index} className="collapse collapse-arrow bg-base-200">
                                        <input type="radio" name="qna-accordion" />
                                        <div className="collapse-title font-medium">
                                            {item.question || item.q}
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-gray-600">
                                                {item.answer || item.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Info Section */}
                    {product.info && product.info.length > 0 && (
                        <div className="pt-6 border-t">
                            <h3 className="text-xl font-bold mb-4">পণ্যের তথ্য</h3>
                            <ul className="space-y-2">
                                {product.info.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Container>
        </>
    );
};

export default ProductDetailsPage;
