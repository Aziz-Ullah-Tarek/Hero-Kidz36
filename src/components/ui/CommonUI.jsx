import React from 'react';

/**
 * Reusable Loading Spinner Component with DaisyUI
 */
export function LoadingSpinner({ size = 'md', text = '' }) {
    const sizeClass = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg'
    }[size];

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <span className={`loading loading-spinner loading-primary ${sizeClass}`}></span>
            {text && <p className="mt-4 text-gray-600 bangla-font">{text}</p>}
        </div>
    );
}

/**
 * Reusable Error Alert Component with DaisyUI
 */
export function ErrorAlert({ title = 'একটি সমস্যা হয়েছে', message }) {
    return (
        <div className="alert alert-error shadow-lg mb-8">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h3 className="font-bold bangla-heading">{title}</h3>
                    {message && <div className="text-xs bangla-text">{message}</div>}
                </div>
            </div>
        </div>
    );
}

/**
 * Reusable Empty State Component
 */
export function EmptyState({ icon = '🧸', title = 'কোনো ডাটা নেই', description = '' }) {
    return (
        <div className="text-center py-20">
            <div className="mb-4">
                <span className="text-6xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2 bangla-heading">
                {title}
            </h3>
            {description && (
                <p className="text-gray-500 bangla-text">
                    {description}
                </p>
            )}
        </div>
    );
}

/**
 * Reusable Section Header Component
 */
export function SectionHeader({ title, subtitle, className = '' }) {
    return (
        <div className={`flex flex-col items-center mb-10 space-y-3 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center bangla-heading">
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-600 text-center max-w-xl bangla-text">
                    {subtitle}
                </p>
            )}
            <div className="w-24 h-1 bg-linear-to-r from-pink-500 to-yellow-500 rounded-full"></div>
        </div>
    );
}

/**
 * Reusable Badge Component
 */
export function Badge({ children, variant = 'primary', size = 'md' }) {
    const variantClass = {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        accent: 'badge-accent',
        success: 'badge-success',
        error: 'badge-error',
        warning: 'badge-warning',
        info: 'badge-info',
    }[variant];

    const sizeClass = {
        sm: 'badge-sm',
        md: 'badge-md',
        lg: 'badge-lg'
    }[size];

    return (
        <span className={`badge ${variantClass} ${sizeClass}`}>
            {children}
        </span>
    );
}

/**
 * Reusable Container Component
 */
export function Container({ children, className = '' }) {
    return (
        <div className={`container mx-auto px-4 py-8 ${className}`}>
            {children}
        </div>
    );
}
