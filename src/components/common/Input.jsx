import React from 'react';

// 기본 Input 컴포넌트
export const Input = ({
                          type = 'text',
                          placeholder,
                          value,
                          onChange,
                          className = '',
                          icon: Icon,
                          error = false,
                          disabled = false,
                          ...props
                      }) => {
    const baseClasses = 'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const stateClasses = error
        ? 'border-red-500 focus-visible:ring-red-500'
        : 'border-gray-300 focus-visible:ring-blue-600';

    return (
        <div className="relative w-full">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${baseClasses} ${stateClasses} ${Icon ? 'pl-10' : ''} ${className}`}
                {...props}
            />
        </div>
    );
};

// Textarea 컴포넌트
export const Textarea = ({
                             placeholder,
                             value,
                             onChange,
                             className = '',
                             rows = 3,
                             error = false,
                             disabled = false,
                             ...props
                         }) => {
    const baseClasses = 'flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none';

    const stateClasses = error
        ? 'border-red-500 focus-visible:ring-red-500'
        : 'border-gray-300 focus-visible:ring-blue-600';

    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            className={`${baseClasses} ${stateClasses} ${className}`}
            {...props}
        />
    );
};

// Select 컴포넌트
export const Select = ({
                           value,
                           onChange,
                           children,
                           className = '',
                           error = false,
                           disabled = false,
                           placeholder = "선택하세요",
                           ...props
                       }) => {
    const baseClasses = 'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const stateClasses = error
        ? 'border-red-500 focus-visible:ring-red-500'
        : 'border-gray-300 focus-visible:ring-blue-600';

    return (
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${baseClasses} ${stateClasses} ${className}`}
            {...props}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
        </select>
    );
};

// 사용법:
// import { Input, Textarea, Select } from './Input';
// import { Mail, Lock, User } from 'lucide-react';
//
// <Input
//   type="email"
//   placeholder="이메일"
//   icon={Mail}
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
// />
//
// <Textarea
//   placeholder="설명을 입력하세요"
//   rows={4}
//   value={description}
//   onChange={(e) => setDescription(e.target.value)}
// />
//
// <Select value={category} onChange={(e) => setCategory(e.target.value)}>
//   <option value="cafe">카페</option>
//   <option value="restaurant">음식점</option>
// </Select>