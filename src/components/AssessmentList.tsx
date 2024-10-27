import React from 'react';
import { ListChecks } from 'lucide-react';

export default function AssessmentList() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Assessments</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <ListChecks className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments yet</h3>
            <p className="text-gray-500">Create your first assessment to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}