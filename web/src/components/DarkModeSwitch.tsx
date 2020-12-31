import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, Switch, IconButton } from '@chakra-ui/react';
import React from 'react';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  // return <Switch isChecked={isDark} onChange={toggleColorMode} />;
  return (
    <IconButton
      aria-label="change theme"
      variant="ghost"
      isRound
      onClick={toggleColorMode}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
    />
  );
};
