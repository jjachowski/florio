import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

interface PetFriendlySourceFieldProps {
  name: string;
  placeholder?: string;
  error?: string;
  variation: 'cat' | 'dog';
  isDisabled: boolean;
}

export const PetFriendlySourceField: React.FC<PetFriendlySourceFieldProps> = ({
  isDisabled,
  variation,
  ...props
}) => {
  const [, { error }] = useField(props);

  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error} isDisabled={isDisabled}>
          <FormLabel htmlFor={field.name}>
            {`Podaj źródło potwierdzające, że roślina jest bezpieczna dla ${
              variation === 'cat' ? ' kota' : 'psa'
            }`}
          </FormLabel>
          <Textarea {...field} {...props} id={field.name} />
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
  );
};
