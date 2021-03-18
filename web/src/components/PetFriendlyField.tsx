import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react';

interface PetFriendlyFieldProps {
  variation: 'dog' | 'cat';
  name: string;
  error?: string;
  isRequired?: boolean;
  checked?: boolean;
}

export const PetFriendlyField: React.FC<PetFriendlyFieldProps> = ({
  variation,
  checked,
  ...props
}) => {
  const [, { error, value }] = useField(props);

  return (
    <Field name={props.name}>
      {({ field }: any) => (
        <FormControl isInvalid={!!error}>
          <Checkbox
            isChecked={checked}
            {...field}
            {...props}
            id={field.name}
            defaultIsChecked={false}
          >
            {`Bezpieczna dla ${variation === 'cat' ? 'kota' : 'psa'}`}
          </Checkbox>
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      )}
    </Field>
    //{isPetFriendly.value && (
    // <Field
    //   name={
    //     variation === 'cat' ? 'isCatFriendlySource' : 'isDogFriendlySource'
    //   }
    // >
    //   {({ field }: any) => (
    //     <FormControl isInvalid={!!error}>
    //       <FormLabel htmlFor={field.name}>
    //         {`Podaj źródło potwierdzające, że roślina jest bezpieczna dla ${
    //           variation === 'cat' ? ' kota' : 'psa'
    //         }`}
    //       </FormLabel>
    //       <Input {...field} {...props} id={field.name} />
    //       {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    //     </FormControl>
    //   )}
    // </Field>
    //   )}
  );
};
