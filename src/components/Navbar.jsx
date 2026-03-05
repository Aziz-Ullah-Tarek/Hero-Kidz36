import React from 'react';
import Logo from './layouts/Logo';
import Link from 'next/link';
import NavLink from './buttons/NavLink';
import { GiShoppingCart } from "react-icons/gi";

const Navbar = () => {

const nav=<>
   
   <li>
    <NavLink href="/">হোম</NavLink>
   </li>
   <li>
    <NavLink href="/routes/products">পণ্য</NavLink>
   </li>
   <li>
    <NavLink href="/routes/blog">ব্লগ</NavLink>
   </li>
   <li>
    <NavLink href="/routes/about">সম্পর্কে</NavLink>
   </li>
   <li>
    <NavLink href="/routes/contact">যোগাযোগ</NavLink>
   </li>

</>

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 bangla-font">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-xl bangla-font">
        {nav}
      </ul>
    </div>
   <Logo />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 bangla-font font-semibold">
    {nav}
    </ul>
  </div>
  <div className="navbar-end space-x-2">
    <Link href="/routes/cart" className="btn btn-primary shadow-md hover:shadow-lg transition-all">
    <GiShoppingCart className="text-2xl" />
    </Link>
 <Link href="/routes/login">
 <button className="btn btn-primary btn-outline bangla-font shadow-md hover:shadow-lg transition-all">লগইন</button>
 </Link>
  </div>
</div>
    );
};

export default Navbar;