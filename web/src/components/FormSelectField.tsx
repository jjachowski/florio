import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

export type SelectOption = {
  displayName: string;
  value: any;
};

interface FormSelectFieldProps {
  name: string;
  label: string;
  error?: string;
  placeholder: string;
  isRequired?: boolean;
  options: SelectOption[];
}

export const FormSelectField: React.FC<FormSelectFieldProps> = ({
  label,
  options,
  ...props
}) => {
  const [, { error }] = useField(props);

  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Select {...field} {...props} id={field.name}>
            {options.map((o) => (
              <option key={o.displayName} value={o.value}>
                {o.displayName}
              </option>
            ))}
          </Select>
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
  );
};
