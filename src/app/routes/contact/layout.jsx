export const metadata = {
    title: "যোগাযোগ করুন - আমাদের সাথে সংযুক্ত হন",
    description: "হিরো কিডস এর সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত। ফোন, ইমেইল বা সোশ্যাল মিডিয়ার মাধ্যমে আমাদের সাথে যোগাযোগ করুন।",
    keywords: ["যোগাযোগ", "হিরো কিডস সাপোর্ট", "কাস্টমার সার্ভিস", "হেল্পলাইন"],
    openGraph: {
        title: "যোগাযোগ করুন - হিরো কিডস",
        description: "আমাদের সাথে যোগাযোগ করুন। ২৪/৭ কাস্টমার সাপোর্ট।",
        type: "website",
        url: "https://herokidz36.vercel.app/routes/contact",
        images: [{
            url: "https://i.ibb.co.com/5X7ByV4k/logo.webp",
            width: 800,
            height: 600,
            alt: "হিরো কিডস - যোগাযোগ",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "যোগাযোগ করুন - হিরো কিডস",
        description: "আমাদের সাথে যোগাযোগ করুন। ২৪/৭ কাস্টমার সাপোর্ট।",
    },
    alternates: {
        canonical: "https://herokidz36.vercel.app/routes/contact",
    }
};

export default function ContactLayout({ children }) {
    return children;
}
