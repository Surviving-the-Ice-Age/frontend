import React, { useState } from 'react';

// Tabs Context
const TabsContext = React.createContext();

// Tabs Container
export const Tabs = ({ children, defaultValue, className = '', orientation = 'horizontal' }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={`${orientation === 'vertical' ? 'flex' : ''} ${className}`} data-orientation={orientation}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

// Tabs List
export const TabsList = ({ children, className = '' }) => {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);
    const childCount = React.Children.count(children);

    const gridClass = childCount === 2 ? 'grid-cols-2' :
        childCount === 3 ? 'grid-cols-3' :
            childCount === 4 ? 'grid-cols-4' :
                childCount === 5 ? 'grid-cols-5' :
                    'grid-cols-1';

    return (
        <div className={`grid ${gridClass} h-10 items-center rounded-md bg-gray-100 p-1 text-gray-500 w-full ${className}`}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { activeTab, setActiveTab })
            )}
        </div>
    );
};

// Tabs Trigger
export const TabsTrigger = ({ children, value, className = '', disabled = false }) => {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);

    const handleClick = () => {
        if (!disabled) {
            setActiveTab(value);
        }
    };

    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            onClick={handleClick}
            disabled={disabled}
            role="tab"
            aria-selected={activeTab === value}
        >
            {children}
        </button>
    );
};

// Tabs Content
export const TabsContent = ({ children, value, className = '' }) => {
    const { activeTab } = React.useContext(TabsContext);

    if (activeTab !== value) {
        return null;
    }

    return (
        <div
            className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
            role="tabpanel"
        >
            {children}
        </div>
    );
};

// 사용법:
// import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
// import { Camera, Type, Sparkles } from 'lucide-react';
//
// <Tabs defaultValue="images" className="w-full">
//   <TabsList>
//     <TabsTrigger value="images">
//       <Camera className="h-4 w-4 mr-2" />
//       이미지
//     </TabsTrigger>
//     <TabsTrigger value="text">
//       <Type className="h-4 w-4 mr-2" />
//       텍스트
//     </TabsTrigger>
//     <TabsTrigger value="preview" disabled>
//       <Sparkles className="h-4 w-4 mr-2" />
//       미리보기
//     </TabsTrigger>
//   </TabsList>
//
//   <TabsContent value="images">
//     이미지 콘텐츠
//   </TabsContent>
//
//   <TabsContent value="text">
//     텍스트 콘텐츠
//   </TabsContent>
//
//   <TabsContent value="preview">
//     미리보기 콘텐츠
//   </TabsContent>
// </Tabs>