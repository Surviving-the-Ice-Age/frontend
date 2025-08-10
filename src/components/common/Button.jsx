import React from 'react';

export const Button = ({
                           children,
                           variant = 'default',
                           size = 'default',
                           className = '',
                           onClick,
                           disabled = false,
                           type = 'button',
                           ...props
                       }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-blue-600 underline-offset-4 hover:underline',
        google: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    };

    const sizes = {
        sm: 'h-9 px-3 rounded-md text-xs',
        default: 'h-10 py-2 px-4',
        lg: 'h-11 px-8 rounded-md text-base',
        icon: 'h-10 w-10',
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// 사용법:
// import { Button } from './Button';
//
// <Button variant="default" size="lg" onClick={() => alert('클릭!')}>
//   기본 버튼
// </Button>
//
// <Button variant="outline" size="sm">
//   아웃라인 버튼
// </Button>
//
// <Button variant="destructive" disabled>
//   삭제 버튼
// </Button>