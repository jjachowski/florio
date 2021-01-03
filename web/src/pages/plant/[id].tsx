import { Box } from '@chakra-ui/react';
import React from 'react';
import useGetIntId from '../../utils/useGetIntId';

const Plant: React.FC = () => {
  const id = useGetIntId();
  return <Box>Plant page working! Plant id: {id}</Box>;
};

export default Plant;
