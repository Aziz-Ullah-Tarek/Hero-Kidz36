"use client";

import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck, FaLock, FaArrowLeft } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/CommonUI';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication
    useEffect(() => {
        if (status === 'unauthenticated') {
            Swal.fire({
                icon: 'warning',
                title: 'লগইন প্রয়োজন',
                text: 'কার্ট দেখতে প্রথমে লগইন করুন',
                confirmButtonText: 'লগইন করুন',
                confirmButtonColor: '#3b82f6'
            }).then(() => {
                router.push(`/routes/login?callbackUrl=${encodeURIComponent('/routes/cart')}`);
            });
        }
    }, [status, router]);

    // Load cart from localStorage
    useEffect(() => {
        if (status === 'authenticated') {
            const loadCart = () => {
                try {
                    const savedCart = localStorage.getItem('cart');
                    if (savedCart) {
                        const parsedCart = JSON.parse(savedCart);
                        setCartItems(parsedCart);
                    }
                } catch (error) {
                    console.error('Error loading cart:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'ত্রুটি',
                        text: 'কার্ট লোড করতে সমস্যা হয়েছে',
                        toast: true,
                        position: 'top-end',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
                setIsLoading(false);
            };

            loadCart();

            // Listen for cart updates
            const handleCartUpdate = () => loadCart();
            window.addEventListener('cartUpdated', handleCartUpdate);

            return () => {
                window.removeEventListener('cartUpdated', handleCartUpdate);
            };
        }
    }, [status]);

    const updateCart = (newCartItems) => {
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const updateQuantity = (id, change) => {
        const updatedItems = cartItems.map(item =>
            item._id === id
                ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
                : item
        );
        updateCart(updatedItems);

        Swal.fire({
            icon: 'success',
            text: change > 0 ? 'পরিমাণ বাড়ানো হয়েছে' : 'পরিমাণ কমানো হয়েছে',
            toast: true,
            position: 'top-end',
            timer: 1000,
            showConfirmButton: false
        });
    };

    const removeItem = async (id) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'নিশ্চিত করুন',
            text: 'এই পণ্যটি কার্ট থেকে সরাতে চান?',
            showCancelButton: true,
            confirmButtonText: 'হ্যাঁ, সরান',
            cancelButtonText: 'না',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            const updatedItems = cartItems.filter(item => item._id !== id);
            updateCart(updatedItems);
            
            Swal.fire({
                icon: 'success',
                title: 'সরানো হয়েছে',
                text: 'পণ্যটি কার্ট থেকে সরানো হয়েছে',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    const getDiscountedPrice = (price, discount) => {
        return discount ? price - (price * discount / 100) : price;
    };

    const subtotal = cartItems.reduce((total, item) => {
        return total + (getDiscountedPrice(item.price, item.discount) * (item.quantity || 1));
    }, 0);

    const shippingCost = subtotal >= 2000 ? 0 : 60;
    const vat = Math.round(subtotal * 0.05); // 5% VAT
    const total = subtotal + shippingCost + vat;
    const totalSavings = cartItems.reduce((total, item) => {
        return total + ((item.price - getDiscountedPrice(item.price, item.discount)) * (item.quantity || 1));
    }, 0);

    // Show loading state
    if (status === 'loading' || isLoading) {
        return (
            <Container className="py-8">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </Container>
        );
    }

    // Don't render if not authenticated
    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6 bangla-font">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li><Link href="/routes/products">পণ্য</Link></li>
                    <li className="font-semibold">শপিং কার্ট</li>
                </ul>
            </div>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8 animate-slideInUp">
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 bangla-heading">
                    <FaShoppingBag className="text-primary animate-pulse-subtle" />
                    <span className="gradient-text">শপিং কার্ট</span>
                </h1>
                <div className="badge badge-lg badge-primary bangla-font shadow-lg">
                    {cartItems.length} টি পণ্য
                </div>
            </div>

            {cartItems.length === 0 ? (
                /* Empty Cart */
                <div className="text-center py-16 animate-fadeIn">
                    <div className="inline-block p-8 bg-linear-to-br from-primary/10 to-accent/10 rounded-full mb-6 animate-pulse-subtle">
                        <FaShoppingBag className="text-6xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3 bangla-heading">
                        আপনার কার্ট খালি
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto bangla-text">
                        কেনাকাটা শুরু করুন এবং আপনার পছন্দের পণ্য কার্টে যোগ করুন
                    </p>
                    <Link href="/routes/products">
                        <button className="btn btn-primary btn-lg gap-2 bangla-font shadow-xl hover:shadow-2xl transition-all">
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
                            <div className="alert alert-success shadow-xl animate-slideInUp bangla-font border-2 border-success/30">
                                <div className="flex items-center gap-2">
                                    <MdLocalOffer className="text-3xl" />
                                    <div>
                                        <h3 className="font-bold text-lg bangla-heading">অভিনন্দন! আপনি সাশ্রয় করছেন</h3>
                                        <div className="text-sm bangla-text">মোট ৳{Math.round(totalSavings)} টাকা ছাড় পাচ্ছেন</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Product Cards */}
                        {cartItems.map(item => {
                            const discountedPrice = getDiscountedPrice(item.price, item.discount);
                            const itemQuantity = item.quantity || 1;
                            return (
                                <div key={item._id} className="card bg-base-100 shadow-xl cart-card-hover border-2 border-gray-100 animate-slideInUp">
                                    <div className="card-body p-4 md:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-linear-to-br from-primary/10 to-accent/10 shadow-md">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                                {item.discount > 0 && (
                                                    <div className="absolute top-2 left-2 badge badge-error text-white text-xs font-bold shadow-lg animate-pulse-subtle">
                                                        -{item.discount}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <h3 className="font-bold text-lg line-clamp-1 text-gray-800">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-1 bangla-text">
                                                        {item.bangla}
                                                    </p>
                                                </div>
                                                
                                                {/* Price */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-primary bangla-font">
                                                        ৳{Math.round(discountedPrice)}
                                                    </span>
                                                    {item.discount > 0 && (
                                                        <span className="text-sm line-through text-gray-400 bangla-font">
                                                            ৳{item.price}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="join shadow-lg border-2 border-primary/20">
                                                        <button 
                                                            className="btn join-item btn-sm hover:bg-primary hover:text-white transition-all"
                                                            onClick={() => updateQuantity(item._id, -1)}
                                                            disabled={itemQuantity <= 1}
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <button className="btn join-item btn-sm px-6 bangla-font font-bold">
                                                            {itemQuantity}
                                                        </button>
                                                        <button 
                                                            className="btn join-item btn-sm hover:bg-primary hover:text-white transition-all"
                                                            onClick={() => updateQuantity(item._id, 1)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>

                                                    {/* Subtotal and Remove */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-500 bangla-text">সাবটোটাল</p>
                                                            <p className="text-lg font-bold text-primary bangla-font">
                                                                ৳{Math.round(discountedPrice * itemQuantity)}
                                                            </p>
                                                        </div>
                                                        <button 
                                                            className="btn btn-circle btn-sm btn-error btn-outline hover:scale-110 transition-transform shadow-md"
                                                            onClick={() => removeItem(item._id)}
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
                            <button className="btn btn-outline btn-lg w-full gap-2 bangla-font shadow-md hover:shadow-xl transition-all hover:scale-105">
                                <FaArrowLeft />
                                কেনাকাটা চালিয়ে যান
                            </button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card bg-linear-to-br from-pink-50 to-yellow-50 shadow-2xl sticky top-4 border-2 border-pink-200 animate-slideInUp">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4 text-gray-800 bangla-heading flex items-center gap-2">
                                    <span className="gradient-text">অর্ডার সামারি</span>
                                </h2>
                                
                                <div className="space-y-3 bangla-font">
                                    <div className="flex justify-between text-gray-700 text-base">
                                        <span>সাবটোটাল ({cartItems.length} টি পণ্য):</span>
                                        <span className="font-semibold">৳{Math.round(subtotal)}</span>
                                    </div>
                                    
                                    {totalSavings > 0 && (
                                        <div className="flex justify-between text-success text-base animate-pulse-subtle">
                                            <span className="font-medium">মোট সাশ্রয়:</span>
                                            <span className="font-bold">-৳{Math.round(totalSavings)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-700 text-base">
                                        <span>ভ্যাট (৫%):</span>
                                        <span className="font-semibold">৳{vat}</span>
                                    </div>
                                    
                                    <div className="flex justify-between text-gray-700 text-base">
                                        <span>ডেলিভারি চার্জ:</span>
                                        <span className="font-semibold">
                                            {shippingCost === 0 ? (
                                                <span className="text-success font-bold">ফ্রি</span>
                                            ) : (
                                                `৳${shippingCost}`
                                            )}
                                        </span>
                                    </div>
                                    
                                    <div className="divider my-2"></div>
                                    
                                    <div className="flex justify-between text-2xl font-bold bangla-heading">
                                        <span>সর্বমোট:</span>
                                        <span className="text-primary">৳{Math.round(total)}</span>
                                    </div>
                                </div>

                                <div className="card-actions mt-6 flex-col gap-3">
                                    <button className="btn btn-primary w-full btn-lg gap-2 bangla-font shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
                                        <FaLock />
                                        চেকআউট করুন
                                    </button>
                                </div>

                                {/* Shipping Progress */}
                                {subtotal < 2000 && (
                                    <div className="alert alert-info mt-4 shadow-lg border-2 border-info/30">
                                        <div className="text-sm bangla-font">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FaTruck className="text-xl" />
                                                <p className="font-bold text-base">ফ্রি ডেলিভারি!</p>
                                            </div>
                                            <p className="text-sm">আরও ৳{Math.round(2000 - subtotal)} টাকার পণ্য কিনলে ফ্রি ডেলিভারি পাবেন</p>
                                            <progress 
                                                className="progress progress-primary mt-2 h-3" 
                                                value={subtotal} 
                                                max="2000"
                                            ></progress>
                                        </div>
                                    </div>
                                )}

                                {subtotal >= 2000 && (
                                    <div className="alert alert-success mt-4 shadow-lg animate-pulse-subtle border-2 border-success/30">
                                        <div className="text-sm flex items-center gap-2 bangla-font">
                                            <FaTruck className="text-2xl" />
                                            <div>
                                                <p className="font-bold text-base">অভিনন্দন!</p>
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
