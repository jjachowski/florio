import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { useReportedPlantsQuery } from '../generated/graphql';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

interface ReportedProps {}

const Reported: React.FC<ReportedProps> = ({}) => {
  const { data } = useReportedPlantsQuery();
  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={10}>
        reported plants:
        <VStack spacing={4}>
          {data?.reportedPlants.map((report, index) => (
            <Card
              key={index}
              isFlex
              direction='row'
              p={0}
              overflow='hidden'
              w='100%'
            >
              <Image
                w='15%'
                src={
                  'https://res.cloudinary.com/disxisevt/image/upload/' +
                  report.plant.images[0]
                }
              />
              <Flex w='85%' direction='row' p={4}>
                <Flex direction='column'>
                  <Heading size='md'>{report.plant.primaryName}</Heading>
                  {report.plant.descriptionSnippet}
                </Flex>
                <Box h='100%' minW='2px' bgColor='gray.100' mx={4} />
                <Flex direction='column'>
                  <Heading size='md'>Powód zgłoszenia</Heading>
                  {report.reason}
                </Flex>
                <Flex
                  direction='column'
                  ml='auto'
                  justifyContent='space-evenly'
                >
                  <Tooltip openDelay={500} label='To zgłoszenie jest poprawne'>
                    <IconButton
                      color='green.500'
                      aria-label='thumbs-up'
                      icon={<FiThumbsUp />}
                    />
                  </Tooltip>
                  <Tooltip
                    openDelay={500}
                    label='To zgłoszenie NIE jest poprawne'
                  >
                    <IconButton
                      color='red.500'
                      aria-label='thumbs-down'
                      icon={<FiThumbsDown />}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </Card>
          ))}
        </VStack>
      </Layout>
    </>
  );
};

export default Reported;
