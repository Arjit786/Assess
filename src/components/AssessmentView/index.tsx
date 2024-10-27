import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Timer, AlertCircle } from 'lucide-react';
import CodeEditor from '../AssessmentCreator/CodeEditor';

export default function AssessmentView() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    // In a real app, fetch assessment data from API
    // Simulating assessment data for demo
    setAssessment({
      title: "Software Engineer Assessment",
      questions: [
        {
          id: '1',
          type: 'mcq',
          question: 'What is the primary benefit of using TypeScript over JavaScript?',
          options: [
            'Static type checking',
            'Faster runtime performance',
            'Smaller bundle size',
            'Built-in database integration'
          ]
        },
        {
          id: '2',
          type: 'text',
          question: 'Explain the concept of dependency injection and its benefits.'
        },
        {
          id: '3',
          type: 'coding',
          question: 'Write a function that finds the longest palindrome in a given string.',
          code: 'function findLongestPalindrome(str) {\n  // Your code here\n}'
        }
      ]
    });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentQ = assessment.questions[currentQuestion];
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const handleSubmit = () => {
    // In a real app, submit answers to API
    console.log('Submitted answers:', answers);
    alert('Assessment submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">{assessment.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <Timer className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {currentQ.question}
            </h2>
            {currentQ.type === 'mcq' && (
              <div className="space-y-3">
                {currentQ.options.map((option: string, index: number) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option}
                      checked={answers[currentQ.id] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {currentQ.type === 'text' && (
              <textarea
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Type your answer here..."
              />
            )}
            {currentQ.type === 'coding' && (
              <div className="mt-4">
                <CodeEditor
                  value={answers[currentQ.id] || currentQ.code}
                  onChange={(value) => handleAnswer(value)}
                  language="javascript"
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestion === assessment.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(assessment.questions.length - 1, prev + 1))}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}