import { useColorMode, Switch } from '@chakra-ui/react';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Switch color="teal.400" isChecked={isDark} onChange={toggleColorMode} />
  );
};
