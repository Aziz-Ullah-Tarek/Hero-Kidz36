import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <section className="relative w-full h-87.5 md:h-112.5 overflow-hidden rounded-3xl shadow-xl">
            {/* Background Image using Next.js for high performance */}
            <Image 
                src="/assets/hero.png" 
                alt="Hero Kids Toy Shop Banner"
                fill
                priority
                className="object-cover"
            />

            {/* A modern gradient overlay to make text pop */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-center">
                <div className="px-8 md:px-16 text-white z-10">
                    
                    {/* Modern Discount Badge with a subtle animation */}
                    <div className="inline-block bg-yellow-400 text-black text-xs md:text-sm font-bold px-3 py-1 rounded-lg mb-4 animate-pulse">
                        ঈদ স্পেশাল: ২৫% ছাড়! 🎁
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        সেরা খেলনা এখন <br /> 
                        <span className="text-yellow-400">আপনার সোনামণির</span> জন্য
                    </h1>
                    
                    <p className="mt-3 text-gray-200 text-sm md:text-base max-w-sm hidden sm:block">
                        নিরাপদ ও আধুনিক খেলনার চমৎকার সংগ্রহ। ঘরে বসেই অর্ডার করুন।
                    </p>

                    <div className="mt-6 flex gap-3">
                        <button className="btn btn-primary rounded-xl">
                            এখনই কিনুন
                        </button>
                        <button className="btn btn-primary btn-outline rounded-xl">
                            কালেকশন
                        </button>
                    </div>
                </div>
            </div>

            {/* Professional SVG Curve at the bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12.5 md:h-17.5 fill-white">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Banner;