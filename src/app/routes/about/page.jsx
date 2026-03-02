import React from 'react';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaAward } from 'react-icons/fa';

const AboutPage = () => {
    const features = [
        {
            icon: <FaShippingFast className="text-5xl text-primary" />,
            title: "দ্রুত ডেলিভারি",
            description: "সারাদেশে দ্রুত ও নিরাপদ ডেলিভারি সেবা"
        },
        {
            icon: <FaShieldAlt className="text-5xl text-success" />,
            title: "নিরাপদ পণ্য",
            description: "১০০% নিরাপদ ও নন-টক্সিক খেলনা"
        },
        {
            icon: <FaHeadset className="text-5xl text-info" />,
            title: "২৪/৭ সাপোর্ট",
            description: "যেকোনো সময় আমাদের সাথে যোগাযোগ করুন"
        },
        {
            icon: <FaAward className="text-5xl text-warning" />,
            title: "মানসম্মত পণ্য",
            description: "সর্বোচ্চ মানের খেলনা নিশ্চিতকরণ"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 space-y-3">
                <span className="bg-green-100 text-green-600 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    আমাদের সম্পর্কে
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
                    হিরো কিডজ
                </h1>
                <p className="text-gray-600 text-center max-w-2xl text-lg">
                    শিশুদের জন্য নিরাপদ ও শিক্ষামূলক খেলনার বিশ্বস্ত অনলাইন শপ
                </p>
                <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>

            {/* About Content */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6">আমাদের লক্ষ্য</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        হিরো কিডজ একটি বিশ্বস্ত অনলাইন খেলনার দোকান যেখানে আমরা শিশুদের জন্য 
                        নিরাপদ, শিক্ষামূলক এবং মানসম্মত খেলনা সরবরাহ করি। আমাদের প্রতিটি পণ্য 
                        যত্নসহকারে নির্বাচিত এবং শিশুদের বিকাশের কথা মাথায় রেখে বাছাই করা।
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        আমরা বিশ্বাস করি যে খেলা শিশুর শারীরিক ও মানসিক বিকাশের জন্য অত্যন্ত 
                        গুরুত্বপূর্ণ। তাই আমাদের কালেকশনে রয়েছে বিভিন্ন বয়সের জন্য উপযুক্ত 
                        খেলনা যা শিশুদের সৃজনশীলতা, কল্পনাশক্তি এবং শেখার ক্ষমতা বৃদ্ধি করে।
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        আমাদের সাথে কেনাকাটা মানে নিরাপত্তা, মান এবং বিশ্বস্ততার নিশ্চয়তা।
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img 
                        src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600" 
                        alt="Kids playing with toys"
                        className="rounded-lg shadow-2xl w-full h-auto"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">কেন হিরো কিডজ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center p-6">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">আমাদের প্রতিশ্রুতি</h2>
                <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                    প্রতিটি শিশুকে নিরাপদ, মানসম্মত এবং শিক্ষামূলক খেলনা সরবরাহ করা এবং 
                    তাদের শৈশবকে আরও আনন্দময় ও সমৃদ্ধ করে তোলা। আমরা প্রতিটি পণ্যের মান 
                    নিশ্চিত করি এবং বাবা-মায়েদের বিশ্বাস অর্জন করতে প্রতিশ্রুতিবদ্ধ।
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
