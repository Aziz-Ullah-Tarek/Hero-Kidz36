"use client";

import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Login:', { email: formData.email, password: formData.password });
            alert('লগইন সফল হয়েছে!');
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert('পাসওয়ার্ড মিলছে না!');
                return;
            }
            console.log('Register:', formData);
            alert('রেজিস্ট্রেশন সফল হয়েছে!');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
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
                            <button type="submit" className="btn btn-primary w-full btn-lg">
                                {isLogin ? 'লগইন করুন' : 'রেজিস্টার করুন'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider">অথবা</div>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <button className="btn btn-outline w-full gap-2">
                                <FaGoogle className="text-red-500" />
                                Google দিয়ে {isLogin ? 'লগইন' : 'সাইন আপ'}
                            </button>
                            <button className="btn btn-outline w-full gap-2">
                                <FaFacebook className="text-blue-600" />
                                Facebook দিয়ে {isLogin ? 'লগইন' : 'সাইন আপ'}
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
