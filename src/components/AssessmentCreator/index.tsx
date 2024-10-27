import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Share2, BrainCircuit } from 'lucide-react';
import AssessmentDetails from './AssessmentDetails';
import ProctorSettings from './ProctorSettings';
import SharingOptions from './SharingOptions';
import StepIndicator from './StepIndicator';

const steps = ['Assessment Details', 'Proctor Settings', 'Share'];

export default function AssessmentCreator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    questionCount: 10,
    selectedTypes: [],
    questions: [],
    proctoring: {
      tabSwitching: true,
      micMandatory: false,
      cameraMandatory: true,
    },
    sharingMethod: 'manual',
    recipients: [],
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Here you would integrate with your AI service and assessment platform
    console.log('Submitting assessment configuration:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AssessmentDetails data={formData} onChange={updateFormData} />;
      case 1:
        return <ProctorSettings data={formData.proctoring} onChange={(proctoring) => updateFormData({ proctoring })} />;
      case 2:
        return <SharingOptions data={formData} onChange={updateFormData} />;
      default:
        return null;
    }
  };

  const stepIcons = [BrainCircuit, Settings, Share2];

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.role && formData.selectedTypes.length > 0 && formData.questions.length > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Create AI-Generated Assessment</h1>
            <p className="mt-2 text-blue-100">Configure your assessment settings and sharing preferences</p>
          </div>

          {/* Step Indicator */}
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep} 
            icons={stepIcons}
          />

          {/* Form Content */}
          <div className="px-8 py-6">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center px-4 py-2 text-white text-sm font-medium rounded-md ${
                  canProceed()
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Generate Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}