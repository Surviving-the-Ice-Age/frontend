import React from 'react';

// Card 컴포넌트
export const Card = ({ children, className = '' }) => (
    <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}>
        {children}
    </div>
);

// CardHeader 컴포넌트
export const CardHeader = ({ children, className = '' }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

// CardTitle 컴포넌트
export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

// CardDescription 컴포넌트
export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-gray-600 ${className}`}>
        {children}
    </p>
);

// CardContent 컴포넌트
export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// 사용법:
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
//
// <Card>
//   <CardHeader>
//     <CardTitle>제목</CardTitle>
//     <CardDescription>설명</CardDescription>
//   </CardHeader>
//   <CardContent>
//     내용
//   </CardContent>
// </Card>