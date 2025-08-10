import {ChevronDown} from "lucide-react";
import React from "react";

const SelectField = ({ label, icon: Icon, value, onChange, options, placeholder, error }) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon size={18} className="text-blue-600" />
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl bg-white appearance-none cursor-pointer transition-colors ${
                    error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option
                        key={typeof option === 'object' ? option.value : option}
                        value={typeof option === 'object' ? option.value : option}
                    >
                        {typeof option === 'object' ? option.label : option}
                    </option>
                ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

export default SelectField;