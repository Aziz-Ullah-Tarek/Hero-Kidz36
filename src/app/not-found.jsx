 'use client';

import Link from 'next/link';
import Logo from '@/components/layouts/Logo';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-primary/10 via-base-100 to-accent/10 flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fadeIn">
                
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-6 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <Logo />
                    </div>
                </div>

                {/* 404 Number with Design */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-black text-gray-200 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🧸</div>
                    </div>
                </div>

                {/* Bangla Heading with Beautiful Font */}
                <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium" style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                        দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি
                    </p>
                </div>

                {/* Decorative Line */}
                <div className="flex justify-center">
                    <div className="w-32 h-1.5 bg-linear-to-r from-primary via-accent to-secondary rounded-full"></div>
                </div>

                {/* Description */}
                <p className="text-gray-500 max-w-md mx-auto" style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                    এই পৃষ্ঠাটি সরিয়ে ফেলা, নাম পরিবর্তন করা বা অস্তিত্বহীন হতে পারে। 
                    অনুগ্রহ করে নিচের বাটনগুলো ব্যবহার করে সঠিক পৃষ্ঠায় যান।
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Link href="/">
                        <button className="btn btn-primary btn-lg gap-3 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                            <FaHome className="text-xl" />
                            <span style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                                হোম পেজে যান
                            </span>
                        </button>
                    </Link>
                    
                    <Link href="/routes/products">
                        <button className="btn btn-outline btn-primary btn-lg gap-3 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
                            <FaSearch className="text-xl" />
                            <span style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                                পণ্য খুঁজুন
                            </span>
                        </button>
                    </Link>

                    <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-ghost btn-lg gap-3 w-full sm:w-auto"
                    >
                        <FaArrowLeft className="text-xl" />
                        <span style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                            পেছনে যান
                        </span>
                    </button>
                </div>

                {/* Popular Links */}
                <div className="pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: "'Kalpurush', 'Noto Sans Bengali', 'SolaimanLipi', sans-serif" }}>
                        জনপ্রিয় পেজ
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/routes/about" className="link link-hover text-primary">
                            আমাদের সম্পর্কে
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/routes/blog" className="link link-hover text-primary">
                            ব্লগ
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/routes/contact" className="link link-hover text-primary">
                            যোগাযোগ
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/routes/cart" className="link link-hover text-primary">
                            কার্ট
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
