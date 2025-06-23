
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ImpactStats from '@/components/ImpactStats';
import MiracleStory from '@/components/MiracleStory';
import StorySection from '@/components/StorySection';
import ParticipateSection from '@/components/ParticipateSection';
import TestimonyForm from '@/components/TestimonyForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ImpactStats />
      <MiracleStory />
      <StorySection />
      <ParticipateSection />
      <TestimonyForm />
      <Footer />
    </div>
  );
};

export default Index;
