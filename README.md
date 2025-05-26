# Social Support Application with AI Assistance

A comprehensive multi-step application form wizard for a government social support portal, featuring OpenAI GPT integration to assist users in describing their personal financial situations.

## 🌟 Features

### Core Functionality
- **3-Step Form Wizard**: Personal Information → Family & Financial Info → Situation Descriptions
- **AI-Powered Writing Assistance**: OpenAI GPT integration for situation descriptions
- **Progress Tracking**: Visual progress bar with step indicators
- **Auto-Save**: Form data automatically saved to localStorage
- **Form Validation**: Comprehensive validation with helpful error messages

### User Experience
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Bilingual Support**: English and Arabic with full RTL support
- **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- **Modern UI**: Clean, intuitive interface using Tailwind CSS and shadcn/ui
- **Loading States**: Smooth animations and loading indicators

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Hook Form**: Robust form handling and validation
- **Context API**: Global state management
- **Error Handling**: Graceful error handling for API failures
- **Toast Notifications**: User feedback for actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (for AI assistance features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd social-support-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔐 OpenAI API Key Setup

The application requires an OpenAI API key for AI writing assistance features.

### Option 1: Runtime Setup (Recommended for Development)
1. Navigate to Step 3 (Situation Descriptions)
2. Click any "Help Me Write" button
3. Enter your OpenAI API key when prompted
4. The key will be stored in localStorage for the session

### Option 2: Environment Setup
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. The application will prompt for the key when AI assistance is first used

### API Key Security Note
- In development, the API key is stored in localStorage
- For production deployment, implement proper API key management through your backend
- Never expose API keys in client-side code in production

## 📱 Application Flow

### Step 1: Personal Information
- Full Name, National ID, Date of Birth
- Gender, Address, City, State, Country
- Phone Number, Email Address
- **AI Assistance**: Not available

### Step 2: Family & Financial Information
- Marital Status, Number of Dependents
- Employment Status, Monthly Income
- Housing Status
- **AI Assistance**: Not available

### Step 3: Situation Descriptions
- Current Financial Situation
- Employment Circumstances  
- Reason for Applying
- **AI Assistance**: Available for all text fields

## 🤖 AI Assistance Features

### How It Works
1. Click "Help Me Write" next to any textarea in Step 3
2. AI generates contextual suggestions based on the field
3. Review the suggestion in a modal dialog
4. Choose to Accept, Edit, or Discard the suggestion

### AI Capabilities
- **Context-Aware**: Generates relevant content for each specific field
- **Professional Tone**: Maintains appropriate language for government applications
- **Editable**: Users can modify AI suggestions before applying
- **Error Handling**: Graceful fallbacks when API calls fail

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Left-to-right layout
- **Arabic (ar)**: Right-to-left layout with Arabic fonts

### Language Features
- Complete translation of all UI text
- RTL layout support for Arabic
- Proper font rendering for both languages
- Cultural considerations in form design

### Switching Languages
- Click the language toggle button in the header
- Language preference is maintained throughout the session
- All form content adapts to the selected language

## ♿ Accessibility Features

### WCAG Compliance
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators
- **Error Announcements**: Screen reader accessible error messages

### Implementation Details
- Semantic HTML structure
- Color contrast compliance
- Responsive design for various screen sizes
- Touch-friendly interface elements

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form with validation
- **State Management**: React Context API
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT-3.5-turbo API

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── FormWizard.tsx   # Main wizard container
│   ├── PersonalInfoStep.tsx
│   ├── FamilyFinancialStep.tsx
│   ├── SituationDescriptionsStep.tsx
│   ├── AIAssistanceModal.tsx
│   ├── ProgressBar.tsx
│   ├── Header.tsx
│   └── Layout.tsx
├── context/             # React context providers
│   ├── FormContext.tsx  # Form state management
│   └── LanguageContext.tsx # i18n and RTL support
├── services/           # External service integrations
│   └── openai.ts       # OpenAI API service
├── types/              # TypeScript type definitions
│   └── form.ts         # Form data interfaces
└── pages/              # Page components
    └── SocialSupport.tsx       # Main application page
```

### Key Design Decisions

1. **Context API over Redux**: Simpler state management for form data
2. **React Hook Form**: Better performance and validation compared to controlled components
3. **Tailwind CSS**: Rapid UI development with consistent design system
4. **TypeScript**: Enhanced developer experience and runtime safety
5. **Component Composition**: Modular, reusable component architecture

## 🧪 Testing

### Running Tests
```bash
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for form flow
- Accessibility testing with jest-axe

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Considerations
1. **API Key Management**: Implement backend proxy for OpenAI API
2. **Security Headers**: Configure appropriate CSP and security headers
3. **Performance**: Enable gzip compression and CDN
4. **Monitoring**: Add error tracking and analytics

### Deployment Checklist
- [ ] Remove development API key prompts
- [ ] Configure backend API proxy
- [ ] Set up error monitoring
- [ ] Enable HTTPS
- [ ] Configure proper caching headers
- [ ] Test all functionality in production environment

## 🤝 Contributing

### Development Setup
1. Follow the installation steps above
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run linting: `npm run lint`
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Prettier for code formatting
- Maintain component modularity
- Add JSDoc comments for complex functions

## 📞 Support

For technical issues or questions:
1. Check the troubleshooting section below
2. Review the GitHub issues
3. Contact the development team

## 🔧 Troubleshooting

### Common Issues

**AI Assistance Not Working**
- Verify OpenAI API key is valid
- Check network connectivity
- Ensure API quota is not exceeded

**Form Data Not Saving**
- Check localStorage availability
- Clear browser cache if needed
- Verify localStorage permissions

**Translation Issues**
- Clear browser cache
- Check language toggle functionality
- Verify translation keys exist

**Responsive Design Issues**
- Test on actual devices
- Check Tailwind CSS responsive classes
- Verify viewport meta tag

## 🔄 Future Enhancements

### Planned Features
- [ ] Multi-file upload support
- [ ] Email notification system
- [ ] Application status tracking
- [ ] Advanced form analytics
- [ ] Offline mode support
- [ ] Additional language support
- [ ] Voice input for accessibility

### Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement service worker for offline support
- [ ] Add performance monitoring
- [ ] Enhance security measures
- [ ] Optimize bundle size

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
