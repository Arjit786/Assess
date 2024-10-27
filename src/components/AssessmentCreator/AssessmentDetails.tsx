import React, { useState } from 'react';
import { Briefcase, Hash, ListChecks } from 'lucide-react';
import { nanoid } from 'nanoid';
import CodeEditor from './CodeEditor';

const commonRoles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'HR Manager',
  'Financial Analyst',
];

const questionTypes = [
  { id: 'mcq', label: 'Multiple Choice', description: 'Questions with predefined options' },
  { id: 'text', label: 'Text Response', description: 'Free-form text answers' },
  { id: 'coding', label: 'Coding', description: 'Programming challenges with live execution' },
];

interface Question {
  id: string;
  type: string;
  question: string;
  options?: string[];
  answer?: string;
  code?: string;
}

interface AssessmentDetailsProps {
  data: {
    role: string;
    questionCount: number;
    selectedTypes: string[];
    questions: Question[];
  };
  onChange: (data: Partial<{
    role: string;
    questionCount: number;
    selectedTypes: string[];
    questions: Question[];
  }>) => void;
}

export default function AssessmentDetails({ data, onChange }: AssessmentDetailsProps) {
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const toggleQuestionType = (typeId: string) => {
    const newTypes = data.selectedTypes.includes(typeId)
      ? data.selectedTypes.filter(t => t !== typeId)
      : [...data.selectedTypes, typeId];
    onChange({ selectedTypes: newTypes });
  };

  const handleGenerateQuestions = async () => {
    // Simulated AI-generated questions
    const mockQuestions = [
      {
        id: nanoid(),
        type: 'mcq',
        question: 'What is the primary benefit of using TypeScript over JavaScript?',
        options: [
          'Static type checking',
          'Faster runtime performance',
          'Smaller bundle size',
          'Built-in database integration'
        ],
        answer: 'Static type checking'
      },
      {
        id: nanoid(),
        type: 'text',
        question: 'Explain the concept of dependency injection and its benefits.',
      },
      {
        id: nanoid(),
        type: 'coding',
        question: 'Write a function that finds the longest palindrome in a given string.',
        code: 'function findLongestPalindrome(str) {\n  // Your code here\n}'
      }
    ];
    onChange({ questions: mockQuestions });
  };

  const deleteQuestion = (id: string) => {
    onChange({
      questions: data.questions.filter(q => q.id !== id)
    });
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    onChange({
      questions: data.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Role
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            list="roles"
            value={data.role}
            onChange={(e) => onChange({ role: e.target.value })}
            className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter or select job role"
          />
          <datalist id="roles">
            {commonRoles.map((role) => (
              <option key={role} value={role} />
            ))}
          </datalist>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Choose from common roles or enter a custom one
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Questions
        </label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            min="5"
            max="50"
            value={data.questionCount}
            onChange={(e) => onChange({ questionCount: parseInt(e.target.value) })}
            className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Recommended: 10-30 questions for optimal assessment duration
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Question Types
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {questionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleQuestionType(type.id)}
              className={`relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-blue-400 ${
                data.selectedTypes.includes(type.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300'
              }`}
            >
              <ListChecks className={`w-6 h-6 ${
                data.selectedTypes.includes(type.id) ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {type.label}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {data.selectedTypes.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleGenerateQuestions}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate Questions
          </button>
        </div>
      )}

      {data.questions && data.questions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Questions</h3>
          <div className="space-y-4">
            {data.questions.map((question, index) => (
              <div key={question.id} className="bg-white border rounded-lg p-4 relative">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {question.type.toUpperCase()}
                      </span>
                      <button
                        onClick={() => setEditingQuestion(editingQuestion === question.id ? null : question.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {editingQuestion === question.id ? 'Done' : 'Edit'}
                      </button>
                    </div>
                    
                    {editingQuestion === question.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {question.type === 'coding' && (
                          <CodeEditor
                            value={question.code || ''}
                            onChange={(value) => updateQuestion(question.id, { code: value })}
                          />
                        )}
                        {question.type === 'mcq' && (
                          <div className="space-y-2">
                            {question.options?.map((option, optIndex) => (
                              <input
                                key={optIndex}
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(question.options || [])];
                                  newOptions[optIndex] = e.target.value;
                                  updateQuestion(question.id, { options: newOptions });
                                }}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-gray-900">
                          {index + 1}. {question.question}
                        </p>
                        {question.type === 'coding' && question.code && (
                          <div className="mt-2">
                            <CodeEditor
                              value={question.code}
                              onChange={(value) => {}}
                              language="javascript"
                            />
                          </div>
                        )}
                        {question.options && (
                          <ul className="mt-2 space-y-1">
                            {question.options.map((option, optIndex) => (
                              <li key={optIndex} className="text-sm text-gray-600 ml-4">
                                • {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => deleteQuestion(question.id)}
                    className="ml-4 text-gray-400 hover:text-red-500"
                  >
                    <span className="sr-only">Delete question</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Assessment Preview</h3>
        <div className="text-sm text-blue-700">
          <p>Role: <span className="font-medium">{data.role || 'Not specified'}</span></p>
          <p>Questions: <span className="font-medium">{data.questionCount}</span></p>
          <p>Types: <span className="font-medium">
            {data.selectedTypes.length > 0 
              ? data.selectedTypes.map(t => questionTypes.find(qt => qt.id === t)?.label).join(', ')
              : 'None selected'}
          </span></p>
          <p>Estimated Duration: <span className="font-medium">{data.questionCount * 2} minutes</span></p>
        </div>
      </div>
    </div>
  );
}