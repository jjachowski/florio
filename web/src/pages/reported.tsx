import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { ReportedPlantCard } from '../components/ReportedPlantCard';
import {
  useMeQuery,
  useReportedPlantsQuery,
  useVoteReportMutation,
} from '../generated/graphql';

interface ReportedProps {}

const Reported: React.FC<ReportedProps> = ({}) => {
  const { data } = useReportedPlantsQuery();

  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        <Heading mb={4}>Zgłoszone rośliny</Heading>
        <VStack spacing={4}>
          {data?.reportedPlants.map((plantReport, index) => (
            <ReportedPlantCard plantReport={plantReport} key={index} />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Reported;
