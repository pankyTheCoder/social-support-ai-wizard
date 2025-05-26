export interface PersonalInfo {
    name: string;
    nationalId: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  }
  
  export interface FamilyFinancialInfo {
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    dependents: number;
    employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired' | 'student';
    monthlyIncome: number;
    housingStatus: 'owned' | 'rented' | 'shared' | 'homeless';
  }
  
  export interface SituationDescriptions {
    currentFinancialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
  }
  
  export interface FormData {
    personalInfo: PersonalInfo;
    familyFinancialInfo: FamilyFinancialInfo;
    situationDescriptions: SituationDescriptions;
  }
  
  export interface AIAssistanceRequest {
    field: keyof SituationDescriptions;
    existingText?: string;
  }
  
  export interface AIAssistanceResponse {
    suggestion: string;
    isLoading: boolean;
    error?: string;
  }
  