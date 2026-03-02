import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Image from "next/image";

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
