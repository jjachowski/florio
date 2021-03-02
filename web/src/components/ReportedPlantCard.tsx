import {
  Flex,
  Heading,
  Box,
  Tooltip,
  IconButton,
  Image,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import {
  PlantReportFragment,
  useMeQuery,
  useVoteReportMutation,
} from '../generated/graphql';
import { Card } from './Card';

interface ReportedPlantCardProps {
  plantReport: PlantReportFragment;
}

export const ReportedPlantCard: React.FC<ReportedPlantCardProps> = ({
  plantReport,
}) => {
  const { data } = useMeQuery();
  const [voteReport] = useVoteReportMutation();
  const toast = useToast();

  const handleVoteClick = async (value: number) => {
    if (
      data?.me?.upvotedReportsIds.includes(plantReport.report.id) &&
      value > 0
    ) {
      return;
    }
    if (
      data?.me?.downvotedReportsIds.includes(plantReport.report.id) &&
      value <= 0
    ) {
      return;
    }
    const result = await voteReport({
      variables: {
        reportId: plantReport.report.id,
        voteValue: value,
      },
      update: (cache) => {
        const reportId = cache.identify(plantReport.report);
        cache.modify({
          id: reportId,
          fields: {
            score(previous: number) {
              if (
                (value > 0 &&
                  data?.me?.downvotedReportsIds.includes(
                    plantReport.report.id
                  )) ||
                (value < 0 &&
                  data?.me?.upvotedReportsIds.includes(plantReport.report.id))
              ) {
                return previous + 2 * value;
              }
              return previous + value;
            },
          },
        });
        if (data?.me) {
          const meId = cache.identify(data?.me);
          if (value > 0) {
            cache.modify({
              id: meId,
              fields: {
                upvotedReportsIds(previous: number[]) {
                  return [...previous, plantReport.report.id];
                },
                downvotedReportsIds(previous: number[]) {
                  return previous.filter((d) => d !== plantReport.report.id);
                },
              },
            });
          } else {
            cache.modify({
              id: meId,
              fields: {
                upvotedReportsIds(previous: number[]) {
                  return previous.filter((d) => d !== plantReport.report.id);
                },
                downvotedReportsIds(previous: number[]) {
                  return [...previous, plantReport.report.id];
                },
              },
            });
          }
        }
      },
    });
    if (!result) {
      toast({
        variant: 'error',
        title: 'Coś poszło nie tak, spróbuj ponownie za chwilę',
      });
    }
  };

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
              aria-label='thumbs-up'
              icon={<FiThumbsUp />}
              onClick={() => handleVoteClick(1)}
              colorScheme={
                data?.me?.upvotedReportsIds.includes(plantReport.report.id)
                  ? 'green'
                  : undefined
              }
            />
          </Tooltip>
          {plantReport.report.score}
          <Tooltip openDelay={500} label='To zgłoszenie NIE jest poprawne'>
            <IconButton
              aria-label='thumbs-down'
              icon={<FiThumbsDown />}
              onClick={() => handleVoteClick(-1)}
              colorScheme={
                data?.me?.downvotedReportsIds.includes(plantReport.report.id)
                  ? 'red'
                  : undefined
              }
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
};
