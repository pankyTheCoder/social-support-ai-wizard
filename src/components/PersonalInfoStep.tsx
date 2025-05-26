import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormContext } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import type { PersonalInfo } from '../types/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PersonalInfoStep: React.FC = () => {
  const { state, dispatch } = useFormContext();
  const { t, isRTL } = useLanguage();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PersonalInfo>({
    defaultValues: state.formData.personalInfo,
  });

  const onSubmit = (data: PersonalInfo) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
    dispatch({ type: 'SET_STEP', payload: 2 });
  };

  const selectedGender = watch('gender');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('personal.title')}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              {t('personal.name')} *
            </Label>
            <Input
              id="name"
              {...register('name', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId" className="text-sm font-medium text-gray-700">
              {t('personal.nationalId')} *
            </Label>
            <Input
              id="nationalId"
              {...register('nationalId', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.nationalId ? 'true' : 'false'}
            />
            {errors.nationalId && (
              <p className="text-sm text-red-600" role="alert">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
              {t('personal.dateOfBirth')} *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth', { required: t('validation.required') })}
              className="w-full"
              aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-600" role="alert">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
              {t('personal.gender')} *
            </Label>
            <Select
              value={selectedGender}
              onValueChange={(value) => setValue('gender', value as PersonalInfo['gender'])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('personal.gender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('gender.male')}</SelectItem>
                <SelectItem value="female">{t('gender.female')}</SelectItem>
                <SelectItem value="other">{t('gender.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              {t('personal.address')} *
            </Label>
            <Input
              id="address"
              {...register('address', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.address ? 'true' : 'false'}
            />
            {errors.address && (
              <p className="text-sm text-red-600" role="alert">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              {t('personal.city')} *
            </Label>
            <Input
              id="city"
              {...register('city', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.city ? 'true' : 'false'}
            />
            {errors.city && (
              <p className="text-sm text-red-600" role="alert">
                {errors.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
              {t('personal.state')} *
            </Label>
            <Input
              id="state"
              {...register('state', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.state ? 'true' : 'false'}
            />
            {errors.state && (
              <p className="text-sm text-red-600" role="alert">
                {errors.state.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
              {t('personal.country')} *
            </Label>
            <Input
              id="country"
              {...register('country', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.country ? 'true' : 'false'}
            />
            {errors.country && (
              <p className="text-sm text-red-600" role="alert">
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              {t('personal.phone')} *
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone', { required: t('validation.required') })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              {t('personal.email')} *
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: t('validation.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('validation.email')
                }
              })}
              className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
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

export default PersonalInfoStep;
