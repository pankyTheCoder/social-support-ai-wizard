import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../context/LanguageContext';
import { getOpenAIService } from '../services/openai';
import AIAssistanceModal from './AIAssistanceModal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { SituationDescriptions } from '@/types/form';
import { useFormContext } from '@/context/FormContext';

const fieldConfigs: {
  key: keyof SituationDescriptions;
  labelKey: string;
  placeholderKey: string;
  defaultPlaceholder: string;
}[] = [
  {
    key: 'currentFinancialSituation',
    labelKey: 'situation.currentFinancial',
    placeholderKey: 'situation.currentFinancialPlaceholder',
    defaultPlaceholder:
      'Describe your current financial situation, including income sources, expenses, debts, and any financial difficulties you are experiencing...',
  },
  {
    key: 'employmentCircumstances',
    labelKey: 'situation.employment',
    placeholderKey: 'situation.employmentPlaceholder',
    defaultPlaceholder:
      'Describe your employment status, work history, any barriers to employment, and how your current situation affects your ability to work...',
  },
  {
    key: 'reasonForApplying',
    labelKey: 'situation.reason',
    placeholderKey: 'situation.reasonPlaceholder',
    defaultPlaceholder:
      'Explain why you are applying for social support, what specific assistance you need, and how it would help improve your situation...',
  },
];

const SituationDescriptionsStep: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { t, isRTL } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SituationDescriptions>({
    defaultValues: state.formData.situationDescriptions,
  });

  const [aiModalState, setAIModalState] = useState({
    isOpen: false,
    field: '' as keyof SituationDescriptions,
    suggestion: '',
    isLoading: false,
    error: undefined as string | undefined,
  });

  const currentValues = watch();

  const handleAIAssistance = async (field: keyof SituationDescriptions) => {
    let apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      const userApiKey = prompt('Please enter your OpenAI API key to use AI assistance:');
      if (!userApiKey) return;
      localStorage.setItem('openai_api_key', userApiKey);
      apiKey = userApiKey;
    }

    setAIModalState({
      isOpen: true,
      field,
      suggestion: '',
      isLoading: true,
      error: undefined,
    });

    try {
      const openAIService = getOpenAIService(apiKey!);
      const suggestion = await openAIService.generateSuggestion(field, currentValues[field]);
      setAIModalState(prev => ({
        ...prev,
        suggestion,
        isLoading: false,
      }));
    } catch (error) {
      console.error('AI assistance error:', error);
      setAIModalState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      }));
    }
  };

  const handleAcceptSuggestion = (text: string) => {
    setValue(aiModalState.field, text);
    toast({
      title: t('situation.suggestionApplied') || "AI suggestion applied",
      description: t('situation.suggestionAppliedDesc') || "The suggestion has been added to your form.",
    });
  };

  const handleEditSuggestion = (text: string) => {
    setValue(aiModalState.field, text);
    toast({
      title: t('situation.editedSuggestionApplied') || "Edited suggestion applied",
      description: t('situation.editedSuggestionAppliedDesc') || "Your edited suggestion has been added to your form.",
    });
  };

  const handleDiscardSuggestion = () => {
    toast({
      title: t('situation.suggestionDiscarded') || "Suggestion discarded",
      description: t('situation.suggestionDiscardedDesc') || "The AI suggestion was not applied.",
    });
  };

  const closeModal = () => {
    setAIModalState(prev => ({ ...prev, isOpen: false }));
  };

  const onSubmit = async (data: SituationDescriptions) => {
    dispatch({ type: 'UPDATE_SITUATION_DESCRIPTIONS', payload: data });
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      // Mock API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.removeItem('socialSupportForm');
      toast({
        title: t('app.success'),
        description: t('app.successDesc') || "Your application has been submitted successfully.",
      });
      console.log('Form submitted successfully:', {
        ...state.formData,
        situationDescriptions: data,
      });
      dispatch({ type: 'RESET_FORM_DATA' });
      dispatch({ type: 'SET_STEP', payload: 1 });
    } catch (error) {
      console.error('Submission error:', error);
      dispatch({ type: 'SET_SUBMIT_ERROR', payload: t('app.error') });
      toast({
        title: t('app.submitFailed') || "Submission failed",
        description: t('app.error'),
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const goBack = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('situation.title')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fieldConfigs.map(({ key, labelKey, placeholderKey, defaultPlaceholder }) => (
          <div key={key} className="space-y-2">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                {t(labelKey)} *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIAssistance(key)}
                className={`flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <Sparkles className="h-4 w-4" />
                {t('situation.helpWrite')}
              </Button>
            </div>
            <Textarea
              id={key}
              {...register(key, {
                required: t('validation.required'),
                minLength: {
                  value: 50,
                  message: t('validation.minLength').replace('{0}', '50'),
                },
              })}
              className={`min-h-32 w-full ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder={t(placeholderKey) || defaultPlaceholder}
              aria-invalid={errors[key] ? 'true' : 'false'}
            />
            {errors[key] && (
              <p className="text-sm text-red-600" role="alert">
                {errors[key]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="px-8 py-2"
            disabled={state.isSubmitting}
          >
            {t('nav.back')}
          </Button>
          <Button
            type="submit"
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white"
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? t('app.submitting') : t('nav.submit')}
          </Button>
        </div>
      </form>

      <AIAssistanceModal
        isOpen={aiModalState.isOpen}
        onClose={closeModal}
        suggestion={aiModalState.suggestion}
        isLoading={aiModalState.isLoading}
        error={aiModalState.error}
        onAccept={handleAcceptSuggestion}
        onEdit={handleEditSuggestion}
        onDiscard={handleDiscardSuggestion}
      />
    </div>
  );
};

export default SituationDescriptionsStep;