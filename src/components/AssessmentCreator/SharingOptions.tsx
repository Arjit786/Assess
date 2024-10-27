import React, { useState } from 'react';
import { Link2, Upload, Mail, Copy } from 'lucide-react';
import { nanoid } from 'nanoid';

interface SharingOptionsProps {
  data: {
    sharingMethod: string;
    recipients: string[];
  };
  onChange: (data: Partial<{ sharingMethod: string; recipients: string[] }>) => void;
}

export default function SharingOptions({ data, onChange }: SharingOptionsProps) {
  const [csvContent, setCsvContent] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const assessmentId = nanoid();
  const assessmentLink = `${window.location.origin}/assessment/${assessmentId}`;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvContent(text);
        const emails = text
          .split('\n')
          .map((line) => line.trim())
          .filter((email) => email.includes('@'));
        onChange({ recipients: emails });
      };
      reader.readAsText(file);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(assessmentLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const sendInvitations = () => {
    // In a real app, this would send emails to recipients
    console.log('Sending invitations to:', data.recipients);
    alert('Invitations sent successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Share Assessment</h3>
        
        {/* Sharing Methods */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => onChange({ sharingMethod: 'manual' })}
            className={`relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-blue-400 ${
              data.sharingMethod === 'manual'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <Link2 className={`w-6 h-6 ${
              data.sharingMethod === 'manual' ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Manual Sharing
            </span>
            <span className="mt-1 block text-sm text-gray-500">
              Share assessment link manually
            </span>
          </button>

          <button
            onClick={() => onChange({ sharingMethod: 'bulk' })}
            className={`relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-blue-400 ${
              data.sharingMethod === 'bulk'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <Upload className={`w-6 h-6 ${
              data.sharingMethod === 'bulk' ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Bulk Upload
            </span>
            <span className="mt-1 block text-sm text-gray-500">
              Upload CSV with email addresses
            </span>
          </button>
        </div>

        {/* Manual Sharing Section */}
        {data.sharingMethod === 'manual' && (
          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={assessmentLink}
                className="flex-1 rounded-md border-gray-300 bg-gray-50 px-4 py-2 text-sm"
              />
              <button
                onClick={copyLink}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Copy className="w-4 h-4 mr-2" />
                {showCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This unique link will be valid for 7 days. Share it with your candidates.
            </p>
          </div>
        )}

        {/* Bulk Upload Section */}
        {data.sharingMethod === 'bulk' && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a CSV file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".csv"
                      className="sr-only"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV with email addresses</p>
              </div>
            </div>

            {data.recipients.length > 0 && (
              <div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Recipients ({data.recipients.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto">
                    {data.recipients.map((email, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-600 py-1 border-b border-gray-200 last:border-0"
                      >
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={sendInvitations}
                  className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitations
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}