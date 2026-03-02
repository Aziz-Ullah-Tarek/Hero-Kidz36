"use client";

import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp, FaClock, FaPaperPlane } from 'react-icons/fa';
import { Container } from '@/components/ui/CommonUI';
import Link from 'next/link';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            alert('আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li className="font-semibold">যোগাযোগ</li>
                </ul>
            </div>

            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 space-y-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
                    আমাদের সাথে যোগাযোগ করুন
                </h1>
                <p className="text-gray-600 text-center max-w-2xl">
                    আপনার যেকোনো প্রশ্ন, পরামর্শ বা সাহায্যের জন্য আমরা সর্বদা প্রস্তুত
                </p>
                <div className="w-24 h-1 bg-linear-to-r from-pink-500 to-yellow-500 rounded-full"></div>
            </div>

            {/* Contact Cards - Top Section */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Phone Card */}
                <div className="card bg-linear-to-br from-pink-50 to-pink-100 shadow-lg hover:shadow-xl transition-shadow border border-pink-200">
                    <div className="card-body items-center text-center">
                        <div className="bg-primary text-white p-4 rounded-full mb-3">
                            <FaPhone className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">ফোন করুন</h3>
                        <div className="space-y-1 text-gray-700">
                            <p className="font-medium">+880 1234-567890</p>
                            <p className="font-medium">+880 1987-654321</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">সকাল ১০টা - রাত ৮টা</p>
                    </div>
                </div>

                {/* Email Card */}
                <div className="card bg-linear-to-br from-yellow-50 to-yellow-100 shadow-lg hover:shadow-xl transition-shadow border border-yellow-200">
                    <div className="card-body items-center text-center">
                        <div className="bg-accent text-white p-4 rounded-full mb-3">
                            <FaEnvelope className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">ইমেইল পাঠান</h3>
                        <div className="space-y-1 text-gray-700">
                            <p className="font-medium">support@herokidz.com</p>
                            <p className="font-medium">info@herokidz.com</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">২৪ ঘণ্টার মধ্যে উত্তর</p>
                    </div>
                </div>

                {/* Location Card */}
                <div className="card bg-linear-to-br from-purple-50 to-purple-100 shadow-lg hover:shadow-xl transition-shadow border border-purple-200 sm:col-span-2 lg:col-span-1">
                    <div className="card-body items-center text-center">
                        <div className="bg-secondary text-white p-4 rounded-full mb-3">
                            <FaMapMarkerAlt className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">আমাদের ঠিকানা</h3>
                        <p className="text-gray-700 font-medium">১২৩/৪, নিউ মার্কেট</p>
                        <p className="text-gray-700 font-medium">ঢাকা - ১২০৫, বাংলাদেশ</p>
                        <p className="text-sm text-gray-600 mt-2">শনি - বৃহস্পতি</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-2xl border-2 border-pink-100">
                        <div className="card-body p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                    <FaPaperPlane className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">বার্তা পাঠান</h2>
                                    <p className="text-gray-600 text-sm">আমরা আপনার কাছ থেকে শুনতে ভালোবাসি</p>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">নাম *</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="আপনার নাম লিখুন" 
                                            className="input input-bordered w-full focus:input-primary" 
                                            required 
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">ফোন নম্বর *</span>
                                        </label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="০১xxxxxxxxx" 
                                            className="input input-bordered w-full focus:input-primary" 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">ইমেইল *</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com" 
                                        className="input input-bordered w-full focus:input-primary" 
                                        required 
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">বার্তা *</span>
                                    </label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered h-32 w-full focus:textarea-primary" 
                                        placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                                        required
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-full btn-lg gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            পাঠানো হচ্ছে...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            বার্তা পাঠান
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Business Hours */}
                    <div className="card bg-linear-to-br from-pink-50 to-yellow-50 shadow-xl border-2 border-pink-200">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-primary text-white p-3 rounded-lg">
                                    <FaClock className="text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold">ব্যবসায়িক সময়</h3>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between p-3 bg-white rounded-lg">
                                    <span className="font-medium">শনিবার - বৃহস্পতিবার</span>
                                    <span className="font-bold text-primary">১০:০০ - ২০:০০</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white rounded-lg">
                                    <span className="font-medium">শুক্রবার</span>
                                    <span className="font-bold text-primary">১৪:০০ - ২০:০০</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="card bg-linear-to-r from-pink-500 to-yellow-500 text-white shadow-xl">
                        <div className="card-body">
                            <h3 className="text-xl font-bold mb-4">সোশ্যাল মিডিয়ায় আমরা</h3>
                            <p className="mb-4 opacity-90">আমাদের সাথে যুক্ত থাকুন এবং সর্বশেষ আপডেট পান</p>
                            <div className="flex gap-3">
                                <a href="#" className="btn btn-circle btn-lg bg-white hover:bg-blue-50 border-none">
                                    <FaFacebook className="text-2xl text-blue-600" />
                                </a>
                                <a href="#" className="btn btn-circle btn-lg bg-white hover:bg-green-50 border-none">
                                    <FaWhatsapp className="text-2xl text-green-600" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="text-lg font-bold mb-3">দ্রুত তথ্য</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <p>২৪ ঘণ্টায় উত্তর দেওয়া হয়</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                                    <p>বিনামূল্যে ডেলিভারি পরামর্শ</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                    <p>সোমবার-শুক্রবার সেবা</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContactPage;
