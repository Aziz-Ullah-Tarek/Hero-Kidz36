"use client";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import { FaShoppingCart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ProductActions({ product }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBuyNow = async () => {
    // Check if user is authenticated
    if (status === 'unauthenticated') {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'লগইন প্রয়োজন',
        text: 'পণ্য কিনতে প্রথমে লগইন করুন',
        showCancelButton: true,
        confirmButtonText: 'লগইন করুন',
        cancelButtonText: 'বাতিল',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280'
      });

      if (result.isConfirmed) {
        router.push(`/routes/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      }
      return;
    }

    // If authenticated, proceed with buy now
    try {
      // Add to cart
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cartItems.find(item => item._id === product._id);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Redirect to cart
      router.push('/routes/cart');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'সমস্যা হয়েছে। আবার চেষ্টা করুন',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  return (
    <div className="space-y-3">
      <AddToCartButton 
        product={product}
        className="w-full"
        size="btn-lg"
      >
        <FaShoppingCart />
        কার্টে যোগ করুন
      </AddToCartButton>
      <button 
        onClick={handleBuyNow}
        className="btn btn-accent btn-lg w-full gap-2 text-lg"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          'এখনই কিনুন'
        )}
      </button>
    </div>
  );
}
