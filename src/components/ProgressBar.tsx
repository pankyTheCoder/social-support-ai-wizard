import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const { t, isRTL } = useLanguage();
  
  const steps = [
    t('nav.personalInfo'),
    t('nav.familyFinancial'),
    t('nav.situationDescriptions'),
  ];

  return (
    <div className="w-full mb-8" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          {t('nav.step')} {currentStep} {t('nav.of')} {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          role="meter"
          aria-label={`Progress: ${currentStep} of ${totalSteps} steps completed`}
        />
      </div>
      
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              aria-label={`Step ${index + 1}: ${step}`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs font-medium mt-2 text-center max-w-20 ${
                isRTL ? 'mr-2' : 'ml-2'
              } ${
                index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
