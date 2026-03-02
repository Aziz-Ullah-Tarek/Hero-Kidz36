"use client";

import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck, FaLock, FaArrowLeft } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/CommonUI';

const CartPage = () => {
    // Sample cart data (পরে Context API বা Redux দিয়ে manage করা যাবে)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Number and Counting Learning Board",
            bangla: "সংখ্যা ও গণনা শেখার শিক্ষামূলক বোর্ড",
            image: "https://i.ibb.co.com/p6Q0fchX/81a72-DDFc-KL-AC-SL1500.jpg",
            price: 1250,
            discount: 10,
            quantity: 1
        },
        {
            id: 2,
            title: "Animal and Nature Learning Flash Cards",
            bangla: "প্রাণী ও প্রকৃতি শেখার ফ্ল্যাশ কার্ড",
            image: "https://i.ibb.co.com/QFDWpCf4/s-l1600.webp",
            price: 950,
            discount: 15,
            quantity: 2
        }
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const getDiscountedPrice = (price, discount) => {
        return discount ? price - (price * discount / 100) : price;
    };

    const subtotal = cartItems.reduce((total, item) => {
        return total + (getDiscountedPrice(item.price, item.discount) * item.quantity);
    }, 0);

    const shippingCost = subtotal >= 2000 ? 0 : 60;
    const vat = Math.round(subtotal * 0.05); // 5% VAT
    const total = subtotal + shippingCost + vat;
    const totalSavings = cartItems.reduce((total, item) => {
        return total + ((item.price - getDiscountedPrice(item.price, item.discount)) * item.quantity);
    }, 0);

    return (
        <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li><Link href="/routes/products">পণ্য</Link></li>
                    <li className="font-semibold">শপিং কার্ট</li>
                </ul>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <FaShoppingBag className="text-primary" />
                    শপিং কার্ট
                </h1>
                <div className="badge badge-lg badge-primary">
                    {cartItems.length} টি পণ্য
                </div>
            </div>

            {cartItems.length === 0 ? (
                /* Empty Cart */
                <div className="text-center py-16">
                    <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
                        <FaShoppingBag className="text-6xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">
                        আপনার কার্ট খালি
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        কেনাকাটা শুরু করুন এবং আপনার পছন্দের পণ্য কার্টে যোগ করুন
                    </p>
                    <Link href="/routes/products">
                        <button className="btn btn-primary btn-lg gap-2">
                            <FaArrowLeft />
                            কেনাকাটা শুরু করুন
                        </button>
                    </Link>
                </div>
            ) : (
                /* Cart with Items */
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Savings Alert */}
                        {totalSavings > 0 && (
                            <div className="alert alert-success shadow-lg">
                                <div className="flex items-center gap-2">
                                    <MdLocalOffer className="text-2xl" />
                                    <div>
                                        <h3 className="font-bold">অভিনন্দন! আপনি সাশ্রয় করছেন</h3>
                                        <div className="text-sm">মোট ৳{Math.round(totalSavings)} টাকা ছাড় পাচ্ছেন</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Product Cards */}
                        {cartItems.map(item => {
                            const discountedPrice = getDiscountedPrice(item.price, item.discount);
                            return (
                                <div key={item.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200">
                                    <div className="card-body p-4 md:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {item.discount > 0 && (
                                                    <div className="absolute top-2 left-2 badge badge-error text-white text-xs">
                                                        -{item.discount}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <h3 className="font-bold text-lg line-clamp-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {item.bangla}
                                                    </p>
                                                </div>
                                                
                                                {/* Price */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-primary">
                                                        ৳{Math.round(discountedPrice)}
                                                    </span>
                                                    {item.discount > 0 && (
                                                        <span className="text-sm line-through text-gray-400">
                                                            ৳{item.price}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="join shadow-md">
                                                        <button 
                                                            className="btn join-item btn-sm"
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <button className="btn join-item btn-sm px-6">
                                                            {item.quantity}
                                                        </button>
                                                        <button 
                                                            className="btn join-item btn-sm"
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>

                                                    {/* Subtotal and Remove */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-500">সাবটোটাল</p>
                                                            <p className="text-lg font-bold text-primary">
                                                                ৳{Math.round(discountedPrice * item.quantity)}
                                                            </p>
                                                        </div>
                                                        <button 
                                                            className="btn btn-circle btn-sm btn-error btn-outline"
                                                            onClick={() => removeItem(item.id)}
                                                            title="মুছে ফেলুন"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Continue Shopping Button */}
                        <Link href="/routes/products">
                            <button className="btn btn-outline w-full gap-2">
                                <FaArrowLeft />
                                কেনাকাটা চালিয়ে যান
                            </button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card bg-linear-to-br from-pink-50 to-yellow-50 shadow-2xl sticky top-4 border-2 border-pink-200">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4 text-gray-800">
                                    অর্ডার সামারি
                                </h2>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>সাবটোটাল ({cartItems.length} টি পণ্য):</span>
                                        <span className="font-semibold">৳{Math.round(subtotal)}</span>
                                    </div>
                                    
                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-success">
                                            <span>মোট সাশ্রয়:</span>
                                            <span className="font-semibold">-৳{Math.round(totalSavings)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-700">
                                        <span>ভ্যাট (৫%):</span>
                                        <span className="font-semibold">৳{vat}</span>
                                    </div>
                                    
                                    <div className="flex justify-between text-gray-700">
                                        <span>ডেলিভারি চার্জ:</span>
                                        <span className="font-semibold">
                                            {shippingCost === 0 ? (
                                                <span className="text-success">ফ্রি</span>
                                            ) : (
                                                `৳${shippingCost}`
                                            )}
                                        </span>
                                    </div>
                                    
                                    <div className="divider my-2"></div>
                                    
                                    <div className="flex justify-between text-2xl font-bold">
                                        <span>সর্বমোট:</span>
                                        <span className="text-primary">৳{Math.round(total)}</span>
                                    </div>
                                </div>

                                <div className="card-actions mt-6 flex-col gap-3">
                                    <button className="btn btn-primary w-full btn-lg gap-2">
                                        <FaLock />
                                        চেকআউট করুন
                                    </button>
                                </div>

                                {/* Shipping Progress */}
                                {subtotal < 2000 && (
                                    <div className="alert alert-info mt-4">
                                        <div className="text-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaTruck />
                                                <p className="font-bold">ফ্রি ডেলিভারি!</p>
                                            </div>
                                            <p>আরও ৳{Math.round(2000 - subtotal)} টাকার পণ্য কিনলে ফ্রি ডেলিভারি পাবেন</p>
                                            <progress 
                                                className="progress progress-primary mt-2" 
                                                value={subtotal} 
                                                max="2000"
                                            ></progress>
                                        </div>
                                    </div>
                                )}

                                {subtotal >= 2000 && (
                                    <div className="alert alert-success mt-4">
                                        <div className="text-sm flex items-center gap-2">
                                            <FaTruck className="text-xl" />
                                            <div>
                                                <p className="font-bold">অভিনন্দন!</p>
                                                <p>আপনি ফ্রি ডেলিভারি পাচ্ছেন</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default CartPage;
