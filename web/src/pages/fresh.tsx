import { AddIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/layout';
import { Flex, Button } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { Layout } from '../components/Layout';
import { NavagationButtons } from '../components/NavagationButtons';
import { Navbar } from '../components/Navbar';

interface FreshProps {}

const Fresh: React.FC<FreshProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Layout mt={8} variant='regular'>
        <NavagationButtons />
      </Layout>
    </>
  );
};

export default Fresh;
