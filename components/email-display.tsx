'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils/clipboard';

interface EmailDisplayProps {
  emails?: {
    short: string;
    medium: string;
    professional: string;
  };
  isLoading?: boolean;
}

export function EmailDisplay({ emails, isLoading = false }: EmailDisplayProps) {
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);

  const handleCopy = async (variant: string, content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedVariant(variant);
      setTimeout(() => setCopiedVariant(null), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 bg-gray-900 rounded-lg">
              <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!emails) {
    return null;
  }

  const variants = [
    {
      id: 'short',
      title: 'Short Version',
      description: 'Quick & punchy - best for busy executives',
      content: emails.short,
    },
    {
      id: 'medium',
      title: 'Medium Version',
      description: 'Balanced - good for most scenarios',
      content: emails.medium,
    },
    {
      id: 'professional',
      title: 'Professional Version',
      description: 'Detailed - for formal introductions',
      content: emails.professional,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
        <p className="text-green-300 text-sm font-medium">
          ✓ Your cold emails are ready! Copy any variation and customize as needed.
        </p>
      </div>

      {variants.map(variant => (
        <div
          key={variant.id}
          className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{variant.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{variant.description}</p>
              </div>
              <button
                onClick={() => handleCopy(variant.id, variant.content)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  copiedVariant === variant.id
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copiedVariant === variant.id ? '✓ Copied!' : 'Copy Email'}
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {variant.content}
              </p>
            </div>

            <div className="mt-4 flex gap-2 text-xs text-gray-500">
              <span>{variant.content.length} characters</span>
              <span>•</span>
              <span>{variant.content.split('\n').length} paragraphs</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
