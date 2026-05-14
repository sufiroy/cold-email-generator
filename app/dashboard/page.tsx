'use client';

import { useState } from 'react';
import { EmailForm } from '@/components/email-form';
import { EmailDisplay } from '@/components/email-display';
import { EmailGeneratorInput } from '@/lib/types';

interface GeneratedEmails {
  short: string;
  medium: string;
  professional: string;
}

export default function DashboardPage() {
  const [emails, setEmails] = useState<GeneratedEmails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateEmails = async (formData: EmailGeneratorInput) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate emails');
      }

      const data = await response.json();
      setEmails(data.emails);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Cold Email Generator</h1>
            <p className="text-gray-400 mt-2">Generate 3 AI-powered email variations in seconds</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6">Generate Your Emails</h2>
              <EmailForm onSubmit={handleGenerateEmails} isLoading={isLoading} />
            </div>
          </div>

          {/* Results Section */}
          <div>
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 text-red-300">
                <p className="font-medium">Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
            <EmailDisplay emails={emails} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
