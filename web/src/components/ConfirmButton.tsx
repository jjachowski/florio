import {
  Button,
  ButtonGroup,
  Placement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  ThemeTypings,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

interface ConfirmButtonProps {
  title: string;
  question: string;
  confirmText: string;
  colorScheme?: ThemeTypings['colorSchemes'];
  placement?: Placement;
  onYesClicked: Function;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  children,
  title,
  question,
  confirmText,
  colorScheme,
  placement,
  onYesClicked,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover placement={placement} isOpen={isOpen} onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      {/* <Box onClick={() => setIsOpen(!isOpen)}>{children}</Box> */}
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>{title}</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton onClick={onClose} />
        <PopoverBody>{question}</PopoverBody>
        <PopoverFooter d='flex' justifyContent='flex-end'>
          <ButtonGroup size='sm'>
            <Button
              colorScheme={colorScheme}
              onClick={() => {
                onClose();
                onYesClicked();
              }}
            >
              {confirmText}
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
