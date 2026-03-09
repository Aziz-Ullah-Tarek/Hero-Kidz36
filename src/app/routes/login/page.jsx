"use client";

import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

const LoginPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.push(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: 'পাসওয়ার্ড মিলছে না!',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        if (formData.password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'সফল!',
                    text: data.message,
                    confirmButtonText: 'লগইন করুন',
                    confirmButtonColor: '#10b981'
                }).then(() => {
                    setIsLogin(true);
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ত্রুটি!',
                    text: data.error || 'রেজিস্ট্রেশন করতে সমস্যা হয়েছে',
                    confirmButtonText: 'ঠিক আছে',
                    confirmButtonColor: '#3b82f6'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: 'রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#3b82f6'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'লগইন ব্যর্থ!',
                    text: result.error,
                    confirmButtonText: 'ঠিক আছে',
                    confirmButtonColor: '#3b82f6'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'স্বাগতম!',
                    text: 'লগইন সফল হয়েছে',
                    timer: 1500,
                    showConfirmButton: false
                });
                router.push(callbackUrl);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#3b82f6'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ত্রুটি!',
                text: 'Google লগইন করতে সমস্যা হয়েছে',
                confirmButtonText: 'ঠিক আছে',
                confirmButtonColor: '#3b82f6'
            });
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin(e);
        } else {
            handleRegister(e);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        হিরো কিডজ
                    </h1>
                    <p className="text-gray-600">
                        {isLogin ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
                    </p>
                </div>

                {/* Login/Register Card */}
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body">
                        {/* Tabs */}
                        <div className="tabs tabs-boxed mb-6">
                            <a 
                                className={`tab tab-lg flex-1 ${isLogin ? 'tab-active' : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                লগইন
                            </a>
                            <a 
                                className={`tab tab-lg flex-1 ${!isLogin ? 'tab-active' : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                রেজিস্টার
                            </a>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field (Only for Register) */}
                            {!isLogin && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">নাম *</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="আপনার নাম"
                                            className="input input-bordered w-full pl-10"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">ইমেইল *</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="input input-bordered w-full pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">পাসওয়ার্ড *</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="input input-bordered w-full pl-10"
                                        required
                                    />
                                </div>
                                {isLogin && (
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover text-primary">
                                            পাসওয়ার্ড ভুলে গেছেন?
                                        </a>
                                    </label>
                                )}
                            </div>

                            {/* Confirm Password (Only for Register) */}
                            {!isLogin && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">পাসওয়ার্ড নিশ্চিত করুন *</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="input input-bordered w-full pl-10"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Remember Me (Only for Login) */}
                            {isLogin && (
                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-2">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text">আমাকে মনে রাখুন</span>
                                    </label>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full btn-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    isLogin ? 'লগইন করুন' : 'রেজিস্টার করুন'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider">অথবা</div>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <button 
                                onClick={handleGoogleSignIn}
                                className="btn btn-outline w-full gap-2"
                                disabled={isLoading}
                                type="button"
                            >
                                <FaGoogle className="text-red-500" />
                                Google দিয়ে {isLogin ? 'লগইন' : 'সাইন আপ'}
                            </button>
                        </div>

                        {/* Toggle Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                {isLogin ? 'নতুন ইউজার?' : 'অলরেডি অ্যাকাউন্ট আছে?'}{' '}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="link link-primary font-bold"
                                >
                                    {isLogin ? 'রেজিস্টার করুন' : 'লগইন করুন'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="link link-hover text-gray-600">
                        ← হোমপেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
