import React from "react";

const InputField = ({ label, icon: Icon, value, onChange, placeholder, error, multiline = false }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon size={18} className="text-blue-600" />
            {label}
        </label>
        {multiline ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl resize-none transition-colors ${
                    error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-xl transition-colors ${
                    error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);
export default InputField;