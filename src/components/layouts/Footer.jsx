import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
       <div>
        {/* Main Footer - Flex on large screens, Column on mobile */}
        <footer className="bg-neutral text-neutral-content p-10">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
                    
                    {/* Company Info Section */}
                    <aside className="flex-1 max-w-md text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <Logo />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed bangla-text">
                            শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য। 
                            আপনার সন্তানের বিকাশের সঙ্গী।
                        </p>
                        <div className="flex gap-3 mt-4 justify-center lg:justify-start">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="btn btn-circle btn-sm btn-ghost hover:bg-blue-600 transition-all">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer"
                               className="btn btn-circle btn-sm btn-ghost hover:bg-green-600 transition-all">
                                <FaWhatsapp className="text-xl" />
                            </a>
                        </div>
                    </aside>

                    {/* Quick Links Section */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="footer-title text-lg mb-4 opacity-100 bangla-heading">দ্রুত লিংক</h6>
                        <Link href="/" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">হোম</Link>
                        <Link href="/routes/products" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">পণ্য তালিকা</Link>
                        <Link href="/routes/about" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">আমাদের সম্পর্কে</Link>
                        <Link href="/routes/blog" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">ব্লগ</Link>
                    </nav>

                    {/* Customer Service Section */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="footer-title text-lg mb-4 opacity-100 bangla-heading">গ্রাহক সেবা</h6>
                        <Link href="/routes/contact" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">যোগাযোগ</Link>
                        <Link href="/routes/cart" className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">শপিং কার্ট</Link>
                        <a className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">ডেলিভারি তথ্য</a>
                        <a className="link link-hover mb-2 hover:text-primary transition-colors bangla-font">রিটার্ন পলিসি</a>
                    </nav>

                    {/* Contact Section */}
                    <nav className="flex flex-col items-center lg:items-start">
                        <h6 className="footer-title text-lg mb-4 opacity-100 bangla-heading">যোগাযোগ করুন</h6>
                        <a className="link link-hover mb-2 flex items-center gap-2 hover:text-primary transition-colors bangla-font">
                            <FaPhone className="text-sm" />
                            +880 1234-567890
                        </a>
                        <a className="link link-hover mb-2 flex items-center gap-2 hover:text-primary transition-colors">
                            <FaEnvelope className="text-sm" />
                            info@herokidz.com
                        </a>
                        <a className="link link-hover mb-2 flex items-center gap-2 hover:text-primary transition-colors bangla-font">
                            <FaMapMarkerAlt className="text-sm" />
                            ঢাকা, বাংলাদেশ
                        </a>
                    </nav>
                </div>
            </div>
        </footer>

        {/* Copyright Footer */}
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p className="text-sm bangla-font">কপিরাইট © {new Date().getFullYear()} - হিরো কিডস। সর্বস্বত্ব সংরক্ষিত।</p>
            </aside>
        </footer>
       </div>
    );
};

export default Footer;