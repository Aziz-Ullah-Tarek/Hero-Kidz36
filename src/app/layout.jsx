import { Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layouts/Footer";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins(
  {
    weight: ["200", "300", "400", "500", "600", "700"],
     subsets: ["latin"], 
     variable: "--font-poppins",
  }
)

const hindSiliguri = Hind_Siliguri(
  {
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["bengali", "latin"],
    variable: "--font-hind-siliguri",
  }
)

export const metadata = {
  metadataBase: new URL('https://herokidz36.vercel.app'),
  title: {
    default: "হিরো কিডস - শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য",
    template: "%s | হিরো কিডস",
  },
  description: "শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য। বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ থেকে শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট এবং আরও অনেক কিছু কিনুন। দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্ট।",
  keywords: [
    "হিরো কিডস",
    "শিশু খেলনা",
    "শিক্ষামূলক খেলনা",
    "বেবি প্রোডাক্ট",
    "বাংলাদেশ খেলনা",
    "অনলাইন খেলনা শপ",
    "Hero Kidz",
    "Kids toys Bangladesh",
    "Educational toys",
    "Baby products",
    "Children toys online"
  ],
  authors: [{ name: "Hero Kidz" }],
  creator: "Hero Kidz",
  publisher: "Hero Kidz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: "https://herokidz36.vercel.app",
    siteName: "হিরো কিডস - Hero Kidz",
    title: "হিরো কিডস - শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা",
    description: "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ। শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট এবং আরও অনেক কিছু। দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্ট।",
    images: [
      {
        url: "https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png",
        width: 1200,
        height: 630,
        alt: "হিরো কিডস - শিশু খেলনা কালেকশন",
      },
      {
        url: "https://i.ibb.co.com/5X7ByV4k/logo.webp",
        width: 800,
        height: 600,
        alt: "হিরো কিডস লোগো",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "হিরো কিডস - শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা",
    description: "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ। শিক্ষামূলক খেলনা, বেবি প্রোডাক্ট এবং আরও অনেক কিছু।",
    images: ["https://i.ibb.co.com/xS2HhC38/Screenshot-2026-03-05-124723.png"],
    creator: "@herokidz",
    site: "@herokidz",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
    // Add your verification codes here
  },
  category: "E-commerce",
  classification: "Kids Toys & Products",
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "হিরো কিডস - Hero Kidz",
    "alternateName": "Hero Kidz",
    "url": "https://herokidz36.vercel.app",
    "logo": "https://i.ibb.co.com/5X7ByV4k/logo.webp",
    "description": "বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন খেলনা শপ। শিক্ষামূলক খেলনা এবং বেবি প্রোডাক্ট।",
    "sameAs": [
      "https://www.facebook.com/herokidz",
      "https://www.instagram.com/herokidz"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "হিরো কিডস",
    "alternateName": "Hero Kidz",
    "url": "https://herokidz36.vercel.app",
    "description": "শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://herokidz36.vercel.app/routes/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "bn-BD"
  };

  return (
    <html lang="bn">
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${hindSiliguri.variable} antialiased`}
        style={{ fontFamily: 'var(--font-hind-siliguri), var(--font-poppins), system-ui, sans-serif' }}
      >
        <AuthProvider>
          <header className="py-2 max-w-11/12 mx-auto">
            <Navbar />
          </header>

          <main className=" max-w-11/12 mx-auto py-2">
            {children}
          </main>
         
         <footer className="mt-10">
          <Footer />
         </footer>
        </AuthProvider>
      </body>
    </html>
  );
}