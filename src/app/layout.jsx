import { Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layouts/Footer";

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
  title: "হিরো কিডস - শিশুদের শিক্ষামূলক খেলনা",
  description: "শিশুদের জন্য মানসম্মত শিক্ষামূলক খেলনা এবং পণ্য",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
        className={`${poppins.variable} ${hindSiliguri.variable} antialiased`}
        style={{ fontFamily: 'var(--font-hind-siliguri), var(--font-poppins), system-ui, sans-serif' }}
      >
        <header className="py-2 max-w-11/12 mx-auto">
          <Navbar />
        </header>

        <main className=" max-w-11/12 mx-auto py-2">
          {children}
        </main>
       
       <footer className="mt-10">
        <Footer />
       </footer>


      </body>
    </html>
  );
}