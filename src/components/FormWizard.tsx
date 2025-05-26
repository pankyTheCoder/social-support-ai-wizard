import React from 'react';
import { useFormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './PersonalInfoStep';
import FamilyFinancialStep from './FamilyFinancialStep';
import SituationDescriptionsStep from './SituationDescriptionsStep';

const FormWizard: React.FC = () => {
  const { state } = useFormContext();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <FamilyFinancialStep />;
      case 3:
        return <SituationDescriptionsStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <ProgressBar currentStep={state.currentStep} totalSteps={3} />
      <div className="mt-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default FormWizard;
