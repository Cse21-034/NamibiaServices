"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Option {
    value: string;
    label: string;
}

interface CreatableSelectProps {
    options: Option[];
    value?: Option | null;
    onChange: (option: Option | null) => void;
    isDisabled?: boolean;
    placeholder?: string;
    className?: string;
    label?: string;
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({
    options,
    value,
    onChange,
    isDisabled = false,
    placeholder = "Select or type to add...",
    className = "",
    label
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    const handleSelect = (option: Option) => {
        onChange(option);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleCreate = () => {
        if (searchTerm.trim()) {
            const newOption = { value: searchTerm, label: searchTerm };
            onChange(newOption);
            setIsOpen(false);
            setSearchTerm("");
        }
    };

    const showCreateOption = searchTerm && !filteredOptions.some(opt => opt.label.toLowerCase() === searchTerm.toLowerCase());

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {label && <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{label}</label>}

            <div
                onClick={() => !isDisabled && setIsOpen(true)}
                className={`w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex items-center justify-between min-h-[42px] ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-neutral-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500'
                    }`}
            >
                {isOpen ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm placeholder-neutral-400"
                        placeholder="Type to search or add..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (filteredOptions.length > 0) {
                                    handleSelect(filteredOptions[0]);
                                } else if (showCreateOption) {
                                    handleCreate();
                                }
                            }
                        }}
                    />
                ) : (
                    <span className={`text-sm ${!value ? 'text-neutral-400' : ''}`}>
                        {value?.label || placeholder}
                    </span>
                )}
                <ChevronDownIcon className={`w-4 h-4 text-neutral-500 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-auto py-1">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(option);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between ${value?.value === option.value ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'
                                    }`}
                            >
                                {option.label}
                                {value?.value === option.value && <span className="text-xs ml-2">Selected</span>}
                            </button>
                        ))
                    ) : !showCreateOption ? (
                        <div className="px-3 py-2 text-sm text-neutral-400 text-center">No options found</div>
                    ) : null}

                    {showCreateOption && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreate();
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Add "{searchTerm}"
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreatableSelect;
