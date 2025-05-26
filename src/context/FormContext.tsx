import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { FormData } from '../types/form';

interface FormState {
  currentStep: number;
  formData: FormData;
  isSubmitting: boolean;
  submitError?: string;
}

type FormAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<FormData['personalInfo']> }
  | { type: 'UPDATE_FAMILY_FINANCIAL_INFO'; payload: Partial<FormData['familyFinancialInfo']> }
  | { type: 'UPDATE_SITUATION_DESCRIPTIONS'; payload: Partial<FormData['situationDescriptions']> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMIT_ERROR'; payload: string | undefined }
  | { type: 'LOAD_FROM_STORAGE'; payload: FormState }
  | { type: 'RESET_FORM_DATA' };

const initialFormData: FormData = {
  personalInfo: {
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  familyFinancialInfo: {
    maritalStatus: 'single',
    dependents: 0,
    employmentStatus: 'unemployed',
    monthlyIncome: 0,
    housingStatus: 'rented',
  },
  situationDescriptions: {
    currentFinancialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

const initialState: FormState = {
  currentStep: 1,
  formData: initialFormData,
  isSubmitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        formData: {
          ...state.formData,
          personalInfo: { ...state.formData.personalInfo, ...action.payload },
        },
      };
    case 'UPDATE_FAMILY_FINANCIAL_INFO':
      return {
        ...state,
        formData: {
          ...state.formData,
          familyFinancialInfo: { ...state.formData.familyFinancialInfo, ...action.payload },
        },
      };
    case 'UPDATE_SITUATION_DESCRIPTIONS':
      return {
        ...state,
        formData: {
          ...state.formData,
          situationDescriptions: { ...state.formData.situationDescriptions, ...action.payload },
        },
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_SUBMIT_ERROR':
      return { ...state, submitError: action.payload };
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    case 'RESET_FORM_DATA':
      return { ...state, formData: initialFormData };
    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  saveToStorage: () => void;
  clearStorage: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('socialSupportForm');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load form data from storage:', error);
      }
    }
  }, []);

  const saveToStorage = () => {
    localStorage.setItem('socialSupportForm', JSON.stringify(state));
  };

  const clearStorage = () => {
    localStorage.removeItem('socialSupportForm');
  };

  // Auto-save on state changes
  useEffect(() => {
    if (state.currentStep > 1 || Object.values(state.formData.personalInfo).some(value => value !== '' && value !== 'male')) {
      saveToStorage();
    }
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch, saveToStorage, clearStorage }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
