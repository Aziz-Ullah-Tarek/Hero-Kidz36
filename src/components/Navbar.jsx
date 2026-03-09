"use client";

import React, { useState, useEffect } from 'react';
import Logo from './layouts/Logo';
import Link from 'next/link';
import NavLink from './buttons/NavLink';
import { GiShoppingCart } from "react-icons/gi";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSession, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { data: session, status } = useSession();
    const [cartCount, setCartCount] = useState(0);

    // Update cart count
    useEffect(() => {
        const updateCartCount = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                setCartCount(totalItems);
            } catch (error) {
                console.error('Error updating cart count:', error);
            }
        };

        updateCartCount();

        // Listen for cart updates
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    const handleLogout = async () => {
        const result = await Swal.fire({
            icon: 'question',
            title: 'লগআউট করবেন?',
            text: 'আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?',
            showCancelButton: true,
            confirmButtonText: 'হ্যাঁ, লগআউট',
            cancelButtonText: 'না',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            await signOut({ callbackUrl: '/' });
            Swal.fire({
                icon: 'success',
                title: 'লগআউট সফল',
                text: 'আপনি সফলভাবে লগআউট হয়েছেন',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    const nav = (
        <>
            <li>
                <NavLink href="/">হোম</NavLink>
            </li>
            <li>
                <NavLink href="/routes/products">পণ্য</NavLink>
            </li>
            <li>
                <NavLink href="/routes/blog">ব্লগ</NavLink>
            </li>
            <li>
                <NavLink href="/routes/about">সম্পর্কে</NavLink>
            </li>
            <li>
                <NavLink href="/routes/contact">যোগাযোগ</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 bangla-font">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-xl bangla-font">
                        {nav}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 bangla-font font-semibold">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                {/* Cart Button with Badge */}
                <Link href="/routes/cart" className="btn btn-primary shadow-md hover:shadow-lg transition-all indicator">
                    {cartCount > 0 && (
                        <span className="indicator-item badge badge-secondary badge-sm">
                            {cartCount}
                        </span>
                    )}
                    <GiShoppingCart className="text-2xl" />
                </Link>

                {/* User Menu */}
                {status === 'loading' ? (
                    <span className="loading loading-spinner loading-md text-primary"></span>
                ) : status === 'authenticated' && session?.user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {session.user.image ? (
                                    <img src={session.user.image} alt={session.user.name || 'User'} />
                                ) : (
                                    <div className="bg-primary text-white flex items-center justify-center w-full h-full">
                                        <FaUser />
                                    </div>
                                )}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-xl border border-gray-200">
                            <li className="menu-title bangla-font">
                                <span className="text-sm font-bold">{session.user.name || session.user.email}</span>
                            </li>
                            <li>
                                <Link href="/routes/cart" className="bangla-font">
                                    <GiShoppingCart /> আমার কার্ট
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="bangla-font text-error">
                                    <FaSignOutAlt /> লগআউট
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/routes/login">
                        <button className="btn btn-primary btn-outline bangla-font shadow-md hover:shadow-lg transition-all">
                            লগইন
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;