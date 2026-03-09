"use client";

import { FaShoppingCart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AddToCartButton({ 
  product, 
  className = "", 
  size = "btn-sm",
  children 
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (status === 'unauthenticated') {
      // Redirect to login page without showing sweetalert
      router.push(`/routes/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // If authenticated, add to cart
    try {
      // TODO: Implement actual cart logic (localStorage, Context API, or database)
      // For now, we'll use localStorage
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Update quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Add new item
        cartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'সফল!',
        text: 'পণ্যটি কার্টে যোগ হয়েছে',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });

      // Trigger cart update event
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ত্রুটি!',
        text: 'কার্টে যোগ করতে সমস্যা হয়েছে',
        confirmButtonText: 'ঠিক আছে',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`btn btn-primary ${size} gap-2 bangla-font shadow-md hover:shadow-lg transition-all ${className}`}
      disabled={status === 'loading'}
    >
      {status === 'loading' ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <FaShoppingCart />
          {children || 'কার্ট'}
        </>
      )}
    </button>
  );
}
