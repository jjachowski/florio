import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { ReportedPlantCard } from '../components/ReportedPlantCard';
import {
  useReportedPlantsQuery,
  useVoteReportMutation,
} from '../generated/graphql';

interface ReportedProps {}

const Reported: React.FC<ReportedProps> = ({}) => {
  const { data } = useReportedPlantsQuery();
  const [voteReport] = useVoteReportMutation();
  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        <Heading mb={4}>Zgłoszone rośliny</Heading>
        <VStack spacing={4}>
          {data?.reportedPlants.map((plantReport, index) => (
            <ReportedPlantCard
              plantReport={plantReport}
              key={index}
              onUpvoteReport={async () => {
                const result = await voteReport({
                  variables: {
                    reportId: plantReport.report.id,
                    voteValue: 1,
                  },
                  update: (cache) => {
                    const reportId = cache.identify(plantReport.report);
                    console.log('identified report: ', reportId);
                    cache.modify({
                      id: reportId,
                      fields: {
                        score(previous: number) {
                          console.log('previous: ', previous);

                          return previous + 1;
                        },
                      },
                    });
                  },
                });
                console.log(result);
              }}
              onDownvoteReport={async () => {
                const result = await voteReport({
                  variables: {
                    reportId: plantReport.report.id,
                    voteValue: -1,
                  },
                });
                console.log(result);
              }}
            />
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Reported;
