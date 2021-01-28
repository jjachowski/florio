import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React, { useState } from 'react';
import { FileInput } from './FileInput';

interface FileFieldProps {
  name: string;
  error?: string;
  isRequired?: boolean;
  filePreviews: { name: string; size: number }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hiddenFileInput: React.RefObject<HTMLInputElement>;
}

export const FileField: React.FC<FileFieldProps> = ({
  error,
  onChange,
  filePreviews,
  hiddenFileInput,
  ...props
}) => {
  //   const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput!.current!.click();
  };
  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error}>
          <Button onClick={handleClick}>Dodaj zdjęcia rośliny</Button>
          <Input
            id={field.name}
            type='file'
            multiple
            ref={hiddenFileInput}
            onChange={onChange}
            display='none'
          />
          <Box overflow='scroll' mt={2}>
            {filePreviews
              .map((f) => `${f.name} (${(f.size / 1024).toFixed(2)}KB)`)
              .join(', ')}
          </Box>

          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
  );
};
