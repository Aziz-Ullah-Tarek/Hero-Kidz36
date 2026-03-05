import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Image from "next/image";

export const metadata = {
  title: "হিরো কিডস - শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য",
  description: "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ। শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট, স্পোর্টস টয়েজ এবং আরও অনেক কিছু সাশ্রয়ী মূল্যে পাবেন। দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্ট।",
  openGraph: {
    title: "হিরো কিডস - শিশুদের জন্য শিক্ষামূলক খেলনা",
    description: "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ। দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্ট।",
    images: [
      {
        url: "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png",
        width: 1200,
        height: 630,
        alt: "হিরো কিডস - খেলনা কালেকশন",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png"],
  },
};

export default function Home() {
  return (
    <div >
      <section className="min-h-[350px] my-5">
        <Banner />
      </section>
      <section className="my-5">
        <Products />
      </section>
      
     
    </div>
  
  );
}
