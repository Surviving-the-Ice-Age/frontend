import React from 'react';

// Progress Bar 컴포넌트
export const Progress = ({
                             value = 0,
                             max = 100,
                             className = '',
                             size = 'default',
                             variant = 'default',
                             showLabel = false
                         }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
    };

    const variantClasses = {
        default: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        danger: 'bg-red-600',
        info: 'bg-cyan-600',
    };

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`relative w-full overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]} ${className}`}>
                <div
                    className={`h-full transition-all duration-300 ease-in-out ${variantClasses[variant]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

// Circular Progress 컴포넌트
export const CircularProgress = ({
                                     value = 0,
                                     max = 100,
                                     size = 120,
                                     strokeWidth = 8,
                                     className = '',
                                     showLabel = true,
                                     variant = 'default'
                                 }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorClasses = {
        default: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-500',
        danger: 'text-red-600',
        info: 'text-cyan-600',
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-gray-200"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-300 ease-in-out ${colorClasses[variant]}`}
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-semibold ${colorClasses[variant]}`}>
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
};

// 사용법:
// import { Progress, CircularProgress } from './Progress';
//
// <Progress value={75} max={100} showLabel />
// <Progress value={30} variant="success" size="lg" />
// <Progress value={80} variant="warning" />
//
// <CircularProgress value={85} size={100} variant="success" />
// <CircularProgress value={45} size={80} strokeWidth={6} variant="info" />