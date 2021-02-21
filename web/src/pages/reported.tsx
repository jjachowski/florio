import { Box } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { useReportedPlantsQuery } from '../generated/graphql';

interface ReportedProps {}

const Reported: React.FC<ReportedProps> = ({}) => {
  const { data } = useReportedPlantsQuery();
  return (
    <>
      <Navbar />
      <Layout>
        reported plants:
        {data?.reportedPlants.map((plant) => (
          <Box>
            {plant.primaryName}
            {/* dodać inny typ w api - reported plant razem z report reason */}
          </Box>
        ))}
      </Layout>
    </>
  );
};

export default Reported;
