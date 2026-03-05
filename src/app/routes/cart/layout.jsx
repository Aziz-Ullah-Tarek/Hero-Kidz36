export const metadata = {
    title: "শপিং কার্ট - আপনার নির্বাচিত পণ্য",
    description: "আপনার শপিং কার্টে যোগ করা পণ্যগুলো দেখুন এবং অর্ডার সম্পন্ন করুন। নিরাপদ পেমেন্ট এবং দ্রুত ডেলিভারি।",
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "শপিং কার্ট - হিরো কিডস",
        description: "আপনার নির্বাচিত পণ্যগুলো দেখুন এবং অর্ডার সম্পন্ন করুন।",
    },
};

export default function CartLayout({ children }) {
    return children;
}
