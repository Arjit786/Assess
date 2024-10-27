import React from 'react';
import { Calendar } from 'lucide-react';

export default function InterviewScheduler() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Interview Scheduler</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
            <p className="text-gray-500">Schedule interviews with candidates after assessment completion</p>
          </div>
        </div>
      </div>
    </div>
  );
}