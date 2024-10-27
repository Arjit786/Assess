import React from 'react';
import { MonitorCheck, Mic, Camera } from 'lucide-react';

interface ProctorSettingsProps {
  data: {
    tabSwitching: boolean;
    micMandatory: boolean;
    cameraMandatory: boolean;
  };
  onChange: (settings: {
    tabSwitching: boolean;
    micMandatory: boolean;
    cameraMandatory: boolean;
  }) => void;
}

export default function ProctorSettings({ data, onChange }: ProctorSettingsProps) {
  const toggleSetting = (key: keyof typeof data) => {
    onChange({ ...data, [key]: !data[key] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-700">
          Configure proctoring settings to ensure assessment integrity. These settings will be enforced during the assessment.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <MonitorCheck className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Tab Switching Detection</h3>
              <p className="text-sm text-gray-500">Alert when candidate switches browser tabs</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('tabSwitching')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              data.tabSwitching ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                data.tabSwitching ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Mic className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Microphone Access</h3>
              <p className="text-sm text-gray-500">Require microphone access during assessment</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('micMandatory')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              data.micMandatory ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                data.micMandatory ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Camera className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Camera Access</h3>
              <p className="text-sm text-gray-500">Require camera access for video monitoring</p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting('cameraMandatory')}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              data.cameraMandatory ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                data.cameraMandatory ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}