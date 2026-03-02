import React from 'react';
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/CommonUI';

const BlogPage = () => {
    // Sample blog data (পরে MongoDB থেকে load করা যাবে)
    const blogs = [
        {
            id: 1,
            title: "শিশুর বিকাশে খেলনার গুরুত্ব",
            excerpt: "খেলনা শুধু বিনোদনের উপকরণ নয়, এটি শিশুর মানসিক ও শারীরিক বিকাশেও গুরুত্বপূর্ণ ভূমিকা পালন করে...",
            image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
            date: "২ মার্চ, ২০২৬",
            author: "হিরো কিডজ টিম",
            category: "পরামর্শ"
        },
        {
            id: 2,
            title: "বয়স অনুযায়ী সঠিক খেলনা নির্বাচন",
            excerpt: "প্রতিটি বয়সের শিশুর জন্য উপযুক্ত খেলনা আলাদা। জেনে নিন কোন বয়সে কোন খেলনা দেবেন...",
            image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800",
            date: "১ মার্চ, ২০২৬",
            author: "হিরো কিডজ টিম",
            category: "গাইড"
        },
        {
            id: 3,
            title: "শিক্ষামূলক খেলনা: মজা ও শিক্ষা একসাথে",
            excerpt: "শিক্ষামূলক খেলনা শিশুদের খেলার সাথে সাথে নতুন কিছু শেখার সুযোগ দেয়...",
            image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
            date: "২৮ ফেব্রুয়ারি, ২০২৬",
            author: "হিরো কিডজ টিম",
            category: "শিক্ষা"
        }
    ];

    return (
        <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li className="font-semibold">ব্লগ</li>
                </ul>
            </div>

            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 space-y-3">
                <span className="bg-blue-100 text-blue-600 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    ব্লগ
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
                    আমাদের ব্লগ
                </h1>
                <p className="text-gray-600 text-center max-w-2xl">
                    শিশুর বিকাশ, খেলনা নির্বাচন এবং প্যারেন্টিং টিপস
                </p>
                <div className="w-32 h-1.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <figure className="relative w-full h-56">
                            <Image 
                                src={blog.image} 
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <div className="badge badge-primary">{blog.category}</div>
                            <h2 className="card-title text-xl hover:text-primary transition-colors">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 line-clamp-3">
                                {blog.excerpt}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt />
                                    <span>{blog.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaUser />
                                    <span>{blog.author}</span>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <Link href={`/routes/blog/${blog.id}`}>
                                    <button className="btn btn-primary btn-sm">
                                        বিস্তারিত পড়ুন
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coming Soon Message */}
            <div className="text-center mt-16 p-8 bg-base-200 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">আরও ব্লগ শীঘ্রই আসছে!</h3>
                <p className="text-gray-600">
                    নিয়মিত আমাদের সাথে থাকুন নতুন নতুন প্যারেন্টিং টিপস জানতে
                </p>
            </div>
        </Container>
    );
};

export default BlogPage;
