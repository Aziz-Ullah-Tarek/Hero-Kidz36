"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children }) => {

    const path = usePathname();
    const isActive = href === "/" ? path === "/" : path.startsWith(href);
    
    return (
        <Link 
            className={isActive ? "btn btn-primary" : "btn btn-ghost"} 
            href={href}
        >
            {children}
        </Link>
    );
};

export default NavLink;