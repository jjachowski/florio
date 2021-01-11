import { MoonIcon, SunIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, HStack, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import { ConditionBars } from '../../components/ConditionBars';
import { ConditionSeasonsSwitch } from '../../components/ConditionSeasonsSwitch';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import { PlantOtherNames } from '../../components/PlantOtherNames';
import { usePlantQuery } from '../../generated/graphql';
import useGetIntId from '../../utils/useGetIntId';

const Plant: React.FC = () => {
  const id = useGetIntId();
  const { data } = usePlantQuery({ variables: { id } });
  const test = data?.plant?.optimalConditions;
  return (
    <>
      <Navbar />
      <Layout variant='full-screen' p={20}>
        <Flex direction='row'>
          <Image
            shadow='2xl'
            rounded={20}
            objectFit='cover'
            height='40rem'
            maxW='30rem'
            src={data?.plant?.imageUrl}
            alt='Kalatea'
            mr={20}
          />
          <Flex w='100%' direction='column'>
            <Flex p={10} direction='column' shadow='2xl' rounded={20}>
              <Flex direction='row'>
                <Flex direction='column'>
                  <Heading>
                    {data?.plant?.names.find((n) => n.isPrimary)?.name}
                  </Heading>
                  <Box>
                    {data?.plant && (
                      <PlantOtherNames names={data?.plant.names} />
                    )}
                  </Box>
                </Flex>
                <HStack mb='auto' spacing={2} ml='auto' fontSize='3rem'>
                  <SunIcon />
                  <MoonIcon />
                  <TimeIcon />
                </HStack>
              </Flex>
              <ConditionSeasonsSwitch seasonsToDisplay={['all']} />
              <ConditionBars conditions={data?.plant?.optimalConditions} />
            </Flex>
            <Flex p={10} mt={8} direction='column' shadow='2xl' rounded={20}>
              <Heading size='md'>Opis</Heading>
              <Box>{data?.plant?.description}</Box>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Plant;
