import { AddIcon } from '@chakra-ui/icons';
import { Button, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { PlantCard } from '../components/PlantCard';
import { usePlantsPreviewQuery, usePlantsQuery } from '../generated/graphql';
import NavLink from 'next/link';
import { useRouter } from 'next/router';
const Index = () => {
  const { data } = usePlantsPreviewQuery();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Layout mt={16} variant='regular'>
        <VStack spacing={8}>
          <Button ml='auto' onClick={() => router.push('/plant/add')}>
            <AddIcon mr={2} />
            Dodaj nową roślinę :)
          </Button>
          {data?.plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Index;
