import {
  Flex,
  Heading,
  Box,
  Tooltip,
  IconButton,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import {
  PlantReportFragment,
  useVoteReportMutation,
} from '../generated/graphql';
import { Card } from './Card';

interface ReportedPlantCardProps {
  plantReport: PlantReportFragment;
  onUpvoteReport: () => void;
  onDownvoteReport: () => void;
}

export const ReportedPlantCard: React.FC<ReportedPlantCardProps> = ({
  plantReport,
  onUpvoteReport,
  onDownvoteReport,
}) => {
  const [voteReport] = useVoteReportMutation();
  return (
    <Card isFlex direction='row' p={0} overflow='hidden' w='100%'>
      <Image
        w='15%'
        src={
          'https://res.cloudinary.com/disxisevt/image/upload/' +
          plantReport.plant.images[0]
        }
      />
      <Flex w='85%' direction='row' p={4}>
        <Flex direction='column'>
          <Heading size='md'>{plantReport.plant.primaryName}</Heading>
          {plantReport.plant.descriptionSnippet}
        </Flex>
        <Box h='100%' minW='2px' bgColor='gray.100' mx={4} />
        <Flex direction='column'>
          <Heading size='md'>Powód zgłoszenia</Heading>
          {plantReport.report.reason}
        </Flex>
        <Flex
          direction='column'
          ml='auto'
          justifyContent='space-evenly'
          align='center'
        >
          <Tooltip openDelay={500} label='To zgłoszenie jest poprawne'>
            <IconButton
              color='green.500'
              aria-label='thumbs-up'
              icon={<FiThumbsUp />}
              onClick={onUpvoteReport}
            />
          </Tooltip>
          {plantReport.report.score}
          <Tooltip openDelay={500} label='To zgłoszenie NIE jest poprawne'>
            <IconButton
              color='red.500'
              aria-label='thumbs-down'
              icon={<FiThumbsDown />}
              onClick={onDownvoteReport}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
};
