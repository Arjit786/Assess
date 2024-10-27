import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  icons: LucideIcon[];
}

export default function StepIndicator({ steps, currentStep, icons }: StepIndicatorProps) {
  return (
    <div className="px-8 py-4 border-b border-gray-200">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <li
                key={step}
                className={`relative ${
                  index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      index < currentStep
                        ? 'bg-blue-600'
                        : index === currentStep
                        ? 'bg-blue-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      index <= currentStep ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="hidden sm:block ml-4">
                    <span className="text-sm font-medium text-gray-900">{step}</span>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-8 -ml-px h-0.5 w-full sm:w-20 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}