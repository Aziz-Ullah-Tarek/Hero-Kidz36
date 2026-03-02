import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTags, FaArrowLeft, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Container } from '@/components/ui/CommonUI';

// Sample blog data (পরে MongoDB collection থেকে load করা যাবে)
const blogsData = {
    1: {
        id: 1,
        title: "শিশুর বিকাশে খেলনার গুরুত্ব",
        excerpt: "খেলনা শুধু বিনোদনের উপকরণ নয়, এটি শিশুর মানসিক ও শারীরিক বিকাশেও গুরুত্বপূর্ণ ভূমিকা পালন করে...",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
        date: "২ মার্চ, ২০২৬",
        author: "হিরো কিডজ টিম",
        category: "পরামর্শ",
        content: `
            <h2>খেলনার মাধ্যমে শিশুর বিকাশ</h2>
            <p>খেলনা শুধুমাত্র বিনোদনের উপকরণ নয়, এটি শিশুর সার্বিক বিকাশে অত্যন্ত গুরুত্বপূর্ণ ভূমিকা পালন করে। গবেষণায় দেখা গেছে যে, সঠিক খেলনা শিশুর মানসিক, শারীরিক এবং সামাজিক দক্ষতা বৃদ্ধিতে সহায়তা করে।</p>
            
            <h3>মানসিক বিকাশ</h3>
            <p>শিক্ষামূলক খেলনা যেমন পাজল, ব্লক এবং গণনা বোর্ড শিশুর চিন্তাশক্তি, সমস্যা সমাধানের ক্ষমতা এবং সৃজনশীলতা বৃদ্ধি করে। এই খেলনাগুলো শিশুকে নতুন ধারণা শিখতে এবং তাদের কল্পনাশক্তি প্রসারিত করতে সাহায্য করে।</p>
            
            <h3>শারীরিক বিকাশ</h3>
            <p>বল, সাইকেল এবং অন্যান্য শারীরিক খেলনা শিশুর মোটর দক্ষতা, সমন্বয় এবং ভারসাম্য উন্নত করে। এগুলো শিশুকে সক্রিয় রাখে এবং স্বাস্থ্যকর শারীরিক বিকাশে সহায়তা করে।</p>
            
            <h3>সামাজিক দক্ষতা</h3>
            <p>দলগত খেলার খেলনা শিশুদের একসাথে খেলতে, ভাগাভাগি করতে এবং যোগাযোগ দক্ষতা বৃদ্ধি করতে সাহায্য করে। এটি তাদের সামাজিক সম্পর্ক তৈরি এবং বজায় রাখতে শেখায়।</p>
            
            <h3>সঠিক খেলনা নির্বাচন</h3>
            <p>শিশুর বয়স, আগ্রহ এবং বিকাশের পর্যায় অনুযায়ী খেলনা নির্বাচন করা গুরুত্বপূর্ণ। নিরাপদ, টেকসই এবং শিক্ষামূলক খেলনা বেছে নিন যা আপনার শিশুর বিকাশে সহায়ক হবে।</p>
            
            <h3>উপসংহার</h3>
            <p>খেলনা শিশুর জীবনে একটি গুরুত্বপূর্ণ ভূমিকা পালন করে। সঠিক খেলনা নির্বাচন এবং খেলার পরিবেশ তৈরি করে আপনি আপনার শিশুর সার্বিক বিকাশে সহায়তা করতে পারেন।</p>
        `,
        tags: ["শিশুর বিকাশ", "খেলনা", "প্যারেন্টিং"]
    },
    2: {
        id: 2,
        title: "বয়স অনুযায়ী সঠিক খেলনা নির্বাচন",
        excerpt: "প্রতিটি বয়সের শিশুর জন্য উপযুক্ত খেলনা আলাদা। জেনে নিন কোন বয়সে কোন খেলনা দেবেন...",
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800",
        date: "১ মার্চ, ২০২৬",
        author: "হিরো কিডজ টিম",
        category: "গাইড",
        content: `
            <h2>বয়স অনুযায়ী খেলনা নির্বাচনের গাইড</h2>
            <p>শিশুর বয়স এবং বিকাশের পর্যায় অনুযায়ী সঠিক খেলনা নির্বাচন অত্যন্ত গুরুত্বপূর্ণ। এই গাইডে আমরা বিভিন্ন বয়সের জন্য উপযুক্ত খেলনা সম্পর্কে আলোচনা করব।</p>
            
            <h3>০-১২ মাস বয়স</h3>
            <p>এই বয়সে শিশুরা তাদের ইন্দ্রিয় দিয়ে পৃথিবী অন্বেষণ করে। রঙিন র‍্যাটেল, নরম খেলনা, মিউজিক্যাল খেলনা এবং টিথার এই বয়সের জন্য আদর্শ।</p>
            
            <h3>১-৩ বছর বয়স</h3>
            <p>এই বয়সে শিশুরা হাঁটা শুরু করে এবং আরও সক্রিয় হয়। পুশ এবং পুল খেলনা, সাধারণ পাজল, ব্লক, এবং রোল প্লে খেলনা এই বয়সের জন্য উপযুক্ত।</p>
            
            <h3>৩-৫ বছর বয়স</h3>
            <p>প্রি-স্কুল বয়সী শিশুরা আরও জটিল খেলা পছন্দ করে। আর্ট সাপ্লাইজ, বিল্ডিং সেট, সাধারণ বোর্ড গেম, সাইকেল এবং শিক্ষামূলক খেলনা এই বয়সের জন্য আদর্শ।</p>
            
            <h3>৫+ বছর বয়স</h3>
            <p>স্কুল বয়সী শিশুরা চ্যালেঞ্জিং এবং শিক্ষামূলক খেলনা পছন্দ করে। বিজ্ঞান কিট, জটিল পাজল, ক্রীড়া সরঞ্জাম, এবং ইলেকট্রনিক শেখার খেলনা এই বয়সের জন্য উপযুক্ত।</p>
            
            <h3>নিরাপত্তা টিপস</h3>
            <p>সর্বদা বয়স-উপযুক্ত খেলনা নির্বাচন করুন এবং ছোট অংশযুক্ত খেলনা থেকে সাবধান থাকুন। নিয়মিত খেলনা পরীক্ষা করুন এবং ক্ষতিগ্রস্ত খেলনা সরিয়ে ফেলুন।</p>
        `,
        tags: ["বয়স গাইড", "খেলনা নির্বাচন", "নিরাপত্তা"]
    },
    3: {
        id: 3,
        title: "শিক্ষামূলক খেলনা: মজা ও শিক্ষা একসাথে",
        excerpt: "শিক্ষামূলক খেলনা শিশুদের খেলার সাথে সাথে নতুন কিছু শেখার সুযোগ দেয়...",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
        date: "২৮ ফেব্রুয়ারি, ২০২৬",
        author: "হিরো কিডজ টিম",
        category: "শিক্ষা",
        content: `
            <h2>শিক্ষামূলক খেলনার শক্তি</h2>
            <p>শিক্ষামূলক খেলনা শিশুদের খেলার মাধ্যমে শেখার সুযোগ প্রদান করে। এই খেলনাগুলো মজার সাথে সাথে গুরুত্বপূর্ণ দক্ষতা বিকাশে সাহায্য করে।</p>
            
            <h3>শিক্ষামূলক খেলনার প্রকার</h3>
            <p>বিভিন্ন ধরনের শিক্ষামূলক খেলনা রয়েছে যেমন গণিত খেলনা, ভাষা শেখার খেলনা, বিজ্ঞান কিট, এবং সৃজনশীল খেলনা।</p>
            
            <h3>গণিত শেখার খেলনা</h3>
            <p>কাউন্টিং বোর্ড, অ্যাবাকাস, এবং সংখ্যা পাজল শিশুদের গণিত দক্ষতা বিকাশে সাহায্য করে। এগুলো সংখ্যা চিনতে, গুনতে এবং সাধারণ গণিত শেখায়।</p>
            
            <h3>ভাষা ও পড়ার দক্ষতা</h3>
            <p>অক্ষর ব্লক, ফ্ল্যাশ কার্ড এবং ইন্টারেক্টিভ বই শিশুদের ভাষা দক্ষতা এবং পড়ার আগ্রহ বৃদ্ধি করে।</p>
            
            <h3>বিজ্ঞান ও প্রযুক্তি</h3>
            <p>সাধারণ বিজ্ঞান কিট, ম্যাগনেট সেট, এবং বিল্ডিং ব্লক শিশুদের বৈজ্ঞানিক চিন্তাভাবনা এবং সমস্যা সমাধানের দক্ষতা বিকাশে সাহায্য করে।</p>
            
            <h3>সৃজনশীল খেলনা</h3>
            <p>আর্ট সাপ্লাইজ, মিউজিক্যাল ইন্সট্রুমেন্ট এবং ক্রাফট কিট শিশুদের সৃজনশীলতা এবং আত্মপ্রকাশের দক্ষতা বিকাশে সাহায্য করে।</p>
            
            <h3>সঠিক ব্যালেন্স</h3>
            <p>শিক্ষামূলক এবং মজার খেলনার মধ্যে সঠিক ব্যালেন্স বজায় রাখা গুরুত্বপূর্ণ। খেলা হওয়া উচিত আনন্দদায়ক এবং চাপমুক্ত।</p>
        `,
        tags: ["শিক্ষামূলক খেলনা", "শেখা", "বিকাশ"]
    }
};

const BlogDetailsPage = async ({ params }) => {
    const { id } = await params;
    const blog = blogsData[id];

    if (!blog) {
        return (
            <Container>
                <div className="text-center py-20">
                    <div className="mb-4">
                        <span className="text-6xl">📝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        ব্লগ খুঁজে পাওয়া যায়নি
                    </h3>
                    <p className="text-gray-500 mb-6">
                        এই ব্লগটি আর উপলব্ধ নেই
                    </p>
                    <Link href="/routes/blog">
                        <button className="btn btn-primary gap-2">
                            <FaArrowLeft />
                            ব্লগ তালিকায় ফিরে যান
                        </button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-8">
            {/* Breadcrumb */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li><Link href="/">হোম</Link></li>
                    <li><Link href="/routes/blog">ব্লগ</Link></li>
                    <li className="font-semibold">{blog.title}</li>
                </ul>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Featured Image */}
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="badge badge-primary badge-lg">{blog.category}</span>
                        </div>
                    </div>

                    {/* Blog Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {blog.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-primary" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUser className="text-primary" />
                                <span>{blog.author}</span>
                            </div>
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    <div className="mt-8 pt-8 border-t">
                        <div className="flex items-center gap-2 flex-wrap">
                            <FaTags className="text-primary text-xl" />
                            {blog.tags.map((tag, index) => (
                                <span key={index} className="badge badge-outline badge-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-8 p-6 bg-linear-to-r from-pink-50 to-yellow-50 rounded-xl border-2 border-pink-200">
                        <h3 className="text-xl font-bold mb-4">শেয়ার করুন</h3>
                        <div className="flex gap-3">
                            <button className="btn btn-circle btn-lg bg-blue-600 hover:bg-blue-700 border-none text-white">
                                <FaFacebook className="text-2xl" />
                            </button>
                            <button className="btn btn-circle btn-lg bg-sky-500 hover:bg-sky-600 border-none text-white">
                                <FaTwitter className="text-2xl" />
                            </button>
                            <button className="btn btn-circle btn-lg bg-green-600 hover:bg-green-700 border-none text-white">
                                <FaWhatsapp className="text-2xl" />
                            </button>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Link href="/routes/blog">
                            <button className="btn btn-outline w-full gap-2">
                                <FaArrowLeft />
                                ব্লগ তালিকায় ফিরে যান
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    {/* Author Card */}
                    <div className="card bg-linear-to-br from-pink-50 to-yellow-50 shadow-xl border-2 border-pink-200 mb-6">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="avatar placeholder">
                                    <div className="bg-primary text-white rounded-full w-16">
                                        <span className="text-2xl">HK</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{blog.author}</h3>
                                    <p className="text-sm text-gray-600">লেখক</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                শিশুদের বিকাশ এবং প্যারেন্টিং বিষয়ে আমরা বিশেষজ্ঞ পরামর্শ প্রদান করি।
                            </p>
                        </div>
                    </div>

                    {/* Related Blogs */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title mb-4">সম্পর্কিত ব্লগ</h3>
                            <div className="space-y-4">
                                {Object.values(blogsData)
                                    .filter(b => b.id !== blog.id)
                                    .slice(0, 2)
                                    .map((relatedBlog) => (
                                        <Link 
                                            key={relatedBlog.id} 
                                            href={`/routes/blog/${relatedBlog.id}`}
                                            className="block hover:bg-base-200 p-3 rounded-lg transition-colors"
                                        >
                                            <h4 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary">
                                                {relatedBlog.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">{relatedBlog.date}</p>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogDetailsPage;
