import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({ label, ...props }) => {
  const [, { error }] = useField(props);

  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input {...field} {...props} id={field.name} />
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
  );
};
