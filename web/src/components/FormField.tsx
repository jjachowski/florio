import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  isTextArea,
  ...props
}) => {
  const [, { error }] = useField(props);
  if (error) {
    console.log(error);
  }

  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          {isTextArea ? (
            <Textarea {...field} {...props} id={field.name} />
          ) : (
            <Input {...field} {...props} id={field.name} />
          )}

          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
  );
};
