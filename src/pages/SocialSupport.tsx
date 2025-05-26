import React from 'react';
import { FormProvider } from '../context/FormContext';
import { LanguageProvider } from '../context/LanguageContext';
import Layout from '../components/Layout';
import FormWizard from '../components/FormWizard';

const SocialSupport: React.FC = () => {
  return (
    <LanguageProvider>
      <FormProvider>
        <Layout>
          <FormWizard />
        </Layout>
      </FormProvider>
    </LanguageProvider>
  );
};

export default SocialSupport;
