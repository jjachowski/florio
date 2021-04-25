import React from 'react';
import { Layout } from '../components/Layout';
import { NavagationButtons } from '../components/NavagationButtons';
import { Navbar } from '../components/Navbar';

interface LikedPlantsProps {}

const LikedPlants: React.FC<LikedPlantsProps> = ({}) => {
  return (
    <>
      <Navbar />

      <Layout>
        <NavagationButtons />
        liked plants works
      </Layout>
    </>
  );
};

export default LikedPlants;
