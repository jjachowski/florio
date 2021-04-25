import { Box, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface FileFieldProps {
  name: string;
  isRequired?: boolean;
  filePreviews: { name: string; size: number }[];
  onAccepted: (event: FileList) => void;
  hiddenFileInput: React.RefObject<HTMLInputElement>;
}

export const FileField: React.FC<FileFieldProps> = ({
  onAccepted,
  filePreviews,
  hiddenFileInput,
  ...props
}) => {
  //   const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (val) => onAccepted((val as unknown) as FileList),
  });
  const [, { error }] = useField(props);

  return (
    <Field name={props.name}>
      {() => (
        <FormControl isInvalid={!!error}>
          <Flex
            align='center'
            justify='center'
            border='2px'
            rounded={5}
            borderStyle='dashed'
            borderColor={error ? 'red.300' : 'gray.200'}
            _hover={{ borderColor: 'green.400', textColor: 'gray.700' }}
            w='100%'
            h='10rem'
            textColor='gray.400'
            {...getRootProps()}
          >
            <input ref={hiddenFileInput} {...getInputProps()} />
            <p>Przeciągnij pliki lub kliknij aby dodać zdjęcia rośliny</p>
          </Flex>
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
