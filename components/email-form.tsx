'use client';

import { useState } from 'react';
import { EmailGeneratorInput } from '@/lib/types';

interface EmailFormProps {
  onSubmit: (data: EmailGeneratorInput) => Promise<void>;
  isLoading?: boolean;
}

export function EmailForm({ onSubmit, isLoading = false }: EmailFormProps) {
  const [formData, setFormData] = useState<EmailGeneratorInput>({
    senderName: '',
    senderService: '',
    prospectName: '',
    prospectCompany: '',
    prospectJobTitle: '',
    painPoint: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="John Smith"
            required
            maxLength={100}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Service/Product
          </label>
          <input
            type="text"
            name="senderService"
            value={formData.senderService}
            onChange={handleChange}
            placeholder="e.g., Cloud migration consulting"
            required
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Target Prospect Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4 mt-4">Target Prospect Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prospect Name
          </label>
          <input
            type="text"
            name="prospectName"
            value={formData.prospectName}
            onChange={handleChange}
            placeholder="Sarah Johnson"
            required
            maxLength={100}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="prospectCompany"
            value={formData.prospectCompany}
            onChange={handleChange}
            placeholder="TechCorp Inc"
            required
            maxLength={150}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="prospectJobTitle"
            value={formData.prospectJobTitle}
            onChange={handleChange}
            placeholder="CTO"
            required
            maxLength={100}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Pain Point */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Pain Point You Want to Address
          </label>
          <textarea
            name="painPoint"
            value={formData.painPoint}
            onChange={handleChange}
            placeholder="e.g., They're struggling with slow database queries and need to migrate to a modern cloud infrastructure"
            required
            minLength={20}
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.painPoint.length}/500 characters
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating emails...
          </span>
        ) : (
          'Generate Email Variations'
        )}
      </button>
    </form>
  );
}
