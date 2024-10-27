import { useState } from 'react';
import { MessageSquarePlus, Bug, Lightbulb } from 'lucide-react';

export default function Feedback() {
  const [type, setType] = useState<'bug' | 'feature'>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your feedback system
    console.log({ type, title, description });
    alert('Thank you for your feedback!');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Submit Feedback</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Feedback Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              What type of feedback do you have?
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setType('feature')}
                className={`relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-blue-400 ${
                  type === 'feature' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <Lightbulb className={`w-6 h-6 ${
                  type === 'feature' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Feature Request
                </span>
              </button>

              <button
                type="button"
                onClick={() => setType('bug')}
                className={`relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-blue-400 ${
                  type === 'bug' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <Bug className={`w-6 h-6 ${
                  type === 'bug' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Bug Report
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={type === 'feature' ? 'Describe your feature idea' : 'Summarize the issue'}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={type === 'feature' ? 'Provide more details about your feature request...' : 'Steps to reproduce the issue...'}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}