import React, { useState, useRef, useEffect } from 'react';
import { Plus, Lightbulb, ChevronDown, X } from 'lucide-react';
import { getAISuggestions } from '../utils/aiSuggestions';

interface Option {
  value: string;
  label: string;
}

interface AIFieldWithSuggestionsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onAddCustom: (value: string) => void;
  onRemoveCustom: (value: string) => void;
  customOptions: string[];
  fieldType: string;
  options: Option[];
  className?: string;
}

const AIFieldWithSuggestions: React.FC<AIFieldWithSuggestionsProps> = ({
  label,
  value,
  onChange,
  onAddCustom,
  onRemoveCustom,
  customOptions,
  fieldType,
  options,
  className = ''
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine original options with custom options
  const allOptions = [
    ...options,
    ...customOptions.map(opt => ({ value: opt, label: opt }))
  ];

  // Load AI suggestions when field is focused
  const handleFocus = async () => {
    if (suggestions.length === 0) {
      setIsLoadingSuggestions(true);
      try {
        const aiSuggestions = await getAISuggestions(fieldType);
        setSuggestions(aiSuggestions);
      } catch (error) {
        console.error('Error loading AI suggestions:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
    setShowSuggestions(true);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  // Handle custom input
  const handleAddCustom = () => {
    if (customValue.trim()) {
      onAddCustom(customValue.trim());
      onChange(customValue.trim());
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  // Handle remove custom option
  const handleRemoveCustom = (optionValue: string) => {
    onRemoveCustom(optionValue);
    if (value === optionValue) {
      onChange('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="flex gap-2">
        {/* Main Select Field */}
        <div className="flex-1 relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 appearance-none cursor-pointer pr-10"
          >
            {allOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Add Custom Button */}
        <button
          type="button"
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="px-3 py-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center gap-1"
          title="Tambah opsi custom"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* AI Suggestions Button */}
        <button
          type="button"
          onClick={handleFocus}
          className="px-3 py-3 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors duration-200 flex items-center gap-1"
          title="Lihat saran AI"
        >
          <Lightbulb className="w-4 h-4" />
        </button>

        {/* Show Custom Options Button */}
        {customOptions.length > 0 && (
          <button
            type="button"
            onClick={() => setShowCustomOptions(!showCustomOptions)}
            className="px-3 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1"
            title="Kelola opsi custom"
          >
            <span className="text-xs font-medium">{customOptions.length}</span>
          </button>
        )}
      </div>

      {/* Custom Input */}
      {showCustomInput && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Masukkan opsi custom..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah
          </button>
        </div>
      )}

      {/* Custom Options Management */}
      {showCustomOptions && customOptions.length > 0 && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">Opsi Custom:</div>
          <div className="space-y-2">
            {customOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                <span className="text-sm text-gray-700">{option}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCustom(option)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Hapus opsi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Saran AI untuk {label}
            </div>
          </div>
          
          {isLoadingSuggestions ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Memuat saran...</p>
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-sm border-b border-gray-50 last:border-b-0"
                >
                  {suggestion}
                </button>
              ))}
              {suggestions.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Tidak ada saran tersedia
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIFieldWithSuggestions;