import { useNavigate } from 'react-router-dom';
import { BrainCircuit, LayoutTemplate } from 'lucide-react';

export default function NewAssessment() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Assessment</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          onClick={() => navigate('/create-assessment')}
          className="relative group bg-white p-6 rounded-lg shadow-sm border-2 border-transparent hover:border-blue-500 transition-all duration-200"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
              <BrainCircuit className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Assessment</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create a customized assessment using our AI engine to generate relevant questions
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('/templates')}
          className="relative group bg-white p-6 rounded-lg shadow-sm border-2 border-transparent hover:border-blue-500 transition-all duration-200"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
              <LayoutTemplate className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Assessment Templates</h3>
            <p className="mt-2 text-sm text-gray-500">
              Choose from our library of pre-built assessment templates for various roles
            </p>
          </div>
        </button>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Quick Tips</h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• AI-Powered assessments adapt to your specific requirements</li>
          <li>• Templates are perfect for standard role evaluations</li>
          <li>• Both options support customization after creation</li>
        </ul>
      </div>
    </div>
  );
}