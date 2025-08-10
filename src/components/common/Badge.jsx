import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 border-transparent',
        destructive: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
        outline: 'text-gray-700 border-gray-300 hover:bg-gray-50',
        success: 'bg-green-600 text-white hover:bg-green-700 border-transparent',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 border-transparent',
        info: 'bg-cyan-600 text-white hover:bg-cyan-700 border-transparent',
    };

    return (
        <div className={`${baseClasses} ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

// 사용법:
// import { Badge } from './Badge';
//
// <Badge variant="default">기본</Badge>
// <Badge variant="secondary">보조</Badge>
// <Badge variant="success">성공</Badge>
// <Badge variant="warning">경고</Badge>
// <Badge variant="destructive">위험</Badge>
// <Badge variant="outline">아웃라인</Badge>