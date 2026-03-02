import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
       <div>
        <footer className="footer footer-center md:footer-horizontal bg-neutral text-neutral-content p-10">
            <aside>
                <Logo />
                <p className="mt-4 max-w-xs">
                    শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য। 
                    আপনার সন্তানের বিকাশের সঙ্গী।
                </p>
                <div className="flex gap-3 mt-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                       className="btn btn-circle btn-sm btn-ghost hover:bg-blue-600">
                        <FaFacebook className="text-xl" />
                    </a>
                    <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer"
                       className="btn btn-circle btn-sm btn-ghost hover:bg-green-600">
                        <FaWhatsapp className="text-xl" />
                    </a>
                </div>
            </aside>
            <nav>
                <h6 className="footer-title">দ্রুত লিংক</h6>
                <Link href="/" className="link link-hover">হোম</Link>
                <Link href="/routes/products" className="link link-hover">পণ্য তালিকা</Link>
                <Link href="/routes/about" className="link link-hover">আমাদের সম্পর্কে</Link>
                <Link href="/routes/blog" className="link link-hover">ব্লগ</Link>
            </nav>
            <nav>
                <h6 className="footer-title">গ্রাহক সেবা</h6>
                <Link href="/routes/contact" className="link link-hover">যোগাযোগ</Link>
                <Link href="/routes/cart" className="link link-hover">শপিং কার্ট</Link>
                <a className="link link-hover">ডেলিভারি তথ্য</a>
                <a className="link link-hover">রিটার্ন পলিসি</a>
            </nav>
            <nav>
                <h6 className="footer-title">যোগাযোগ করুন</h6>
                <a className="link link-hover flex items-center gap-2">
                    <FaPhone className="text-sm" />
                    +880 1234-567890
                </a>
                <a className="link link-hover flex items-center gap-2">
                    <FaEnvelope className="text-sm" />
                    info@herokidz.com
                </a>
                <a className="link link-hover flex items-center gap-2">
                    <FaMapMarkerAlt className="text-sm" />
                    ঢাকা, বাংলাদেশ
                </a>
            </nav>
        </footer>
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p>কপিরাইট © {new Date().getFullYear()} - হিরো কিডস। সর্বস্বত্ব সংরক্ষিত।</p>
            </aside>
        </footer>
       </div>
    );
};

export default Footer;