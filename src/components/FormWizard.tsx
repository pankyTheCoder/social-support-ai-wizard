import React, { useMemo } from 'react';
import { useFormContext } from '../context/FormContext';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './PersonalInfoStep';
import FamilyFinancialStep from './FamilyFinancialStep';
import SituationDescriptionsStep from './SituationDescriptionsStep';

const steps = [
  <PersonalInfoStep key="personal" />,
  <FamilyFinancialStep key="family" />,
  <SituationDescriptionsStep key="situation" />,
];

const FormWizard: React.FC = () => {
  const { state } = useFormContext();

  const currentStepIndex = useMemo(() => {
    return Math.max(0, Math.min(steps.length - 1, (state.currentStep || 1) - 1));
  }, [state.currentStep]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <ProgressBar currentStep={state.currentStep} totalSteps={steps.length} />
      <div className="mt-8">
        {steps[currentStepIndex]}
      </div>
    </div>
  );
};

export default FormWizard;