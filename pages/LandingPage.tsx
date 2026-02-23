import React from 'react';
import Hero from '../components/Hero';
import MissionSection from '../components/MissionSection';
import StrengthSection from '../components/StrengthSection';
import PathSection from '../components/PathSection';
import CTASection from '../components/CTASection';

interface LandingPageProps {
  isDarkMode: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode }) => {
  return (
    <>
      <Hero isDarkMode={isDarkMode} />
      <MissionSection />
      <StrengthSection />
      <PathSection />
      <CTASection />
    </>
  );
};

export default LandingPage;
