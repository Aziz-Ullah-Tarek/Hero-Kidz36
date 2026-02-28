import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
        <Image src="/assets/logo.png" alt="Hero Kidz Logo" width={40} height={40} />

        <h1 className="text-xl font-bold ml-2">Hero <span className="text-primary">Kidz</span></h1>
        
        </Link>
    );
};

export default Logo;