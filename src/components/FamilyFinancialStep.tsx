import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import type { FamilyFinancialInfo } from '../types/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FamilyFinancialStep: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { t, isRTL } = useLanguage();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FamilyFinancialInfo>({
    defaultValues: state.formData.familyFinancialInfo,
  });

  const selectedMaritalStatus = watch('maritalStatus');
  const selectedEmploymentStatus = watch('employmentStatus');
  const selectedHousingStatus = watch('housingStatus');

  const onSubmit = (data: FamilyFinancialInfo) => {
    dispatch({ type: 'UPDATE_FAMILY_FINANCIAL_INFO', payload: data });
    dispatch({ type: 'SET_STEP', payload: 3 });
  };

  const goBack = () => {
    dispatch({ type: 'SET_STEP', payload: 1 });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('family.title')}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">
              {t('family.maritalStatus')} *
            </Label>
            <Select
              value={selectedMaritalStatus}
              onValueChange={(value) => setValue('maritalStatus', value as FamilyFinancialInfo['maritalStatus'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('family.maritalStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">{t('marital.single')}</SelectItem>
                <SelectItem value="married">{t('marital.married')}</SelectItem>
                <SelectItem value="divorced">{t('marital.divorced')}</SelectItem>
                <SelectItem value="widowed">{t('marital.widowed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dependents" className="text-sm font-medium text-gray-700">
              {t('family.dependents')} *
            </Label>
            <Input
              id="dependents"
              type="number"
              min="0"
              {...register('dependents', { 
                required: t('validation.required'),
                min: { value: 0, message: 'Cannot be negative' }
              })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.dependents ? 'true' : 'false'}
            />
            {errors.dependents && (
              <p className="text-sm text-red-600" role="alert">
                {errors.dependents.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentStatus" className="text-sm font-medium text-gray-700">
              {t('family.employmentStatus')} *
            </Label>
            <Select
              value={selectedEmploymentStatus}
              onValueChange={(value) => setValue('employmentStatus', value as FamilyFinancialInfo['employmentStatus'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('family.employmentStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">{t('employment.employed')}</SelectItem>
                <SelectItem value="unemployed">{t('employment.unemployed')}</SelectItem>
                <SelectItem value="self-employed">{t('employment.selfEmployed')}</SelectItem>
                <SelectItem value="retired">{t('employment.retired')}</SelectItem>
                <SelectItem value="student">{t('employment.student')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
              {t('family.monthlyIncome')} *
            </Label>
            <Input
              id="monthlyIncome"
              type="number"
              min="0"
              step="0.01"
              {...register('monthlyIncome', { 
                required: t('validation.required'),
                min: { value: 0, message: 'Cannot be negative' }
              })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.monthlyIncome ? 'true' : 'false'}
            />
            {errors.monthlyIncome && (
              <p className="text-sm text-red-600" role="alert">
                {errors.monthlyIncome.message}
              </p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="housingStatus" className="text-sm font-medium text-gray-700">
              {t('family.housingStatus')} *
            </Label>
            <Select
              value={selectedHousingStatus}
              onValueChange={(value) => setValue('housingStatus', value as FamilyFinancialInfo['housingStatus'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('family.housingStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owned">{t('housing.owned')}</SelectItem>
                <SelectItem value="rented">{t('housing.rented')}</SelectItem>
                <SelectItem value="shared">{t('housing.shared')}</SelectItem>
                <SelectItem value="homeless">{t('housing.homeless')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline"
            onClick={goBack}
            className="px-8 py-2"
          >
            {t('nav.back')}
          </Button>
          <Button 
            type="submit" 
            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t('nav.next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FamilyFinancialStep;
