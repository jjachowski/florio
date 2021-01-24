import { Box, Button, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import React from 'react';
import { FileField } from './FileField';
import { FormField } from './FormField';

export type EditPlantFormInput = {
  primaryName: string;
  otherNames: string;
  description: string;
};

export type EditPlantFormValue = {
  primaryName: string;
  otherNames: string[];
  description: string;
};

interface EditPlantFormProps {
  initialValues?: EditPlantFormInput;
  onFormSubmit: (
    plant: EditPlantFormValue,
    setErrors: (errors: FormikErrors<EditPlantFormInput>) => void
  ) => void;
}

export const EditPlantForm: React.FC<EditPlantFormProps> = ({
  initialValues = {
    primaryName: '',
    otherNames: '',
    description: '',
    images: [],
  },
  onFormSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const { primaryName, description } = values;
        const plant = {
          primaryName,
          description,
          otherNames: values.otherNames.split(',').map((n) => n.trim()),
        };
        onFormSubmit(plant, setErrors);
      }}
    >
      {(props) => (
        <Box>
          <Form>
            <VStack spacing={4}>
              <FormField
                name='primaryName'
                isRequired
                placeholder='Maranta Fascinator'
                label='Nazwa rośliny'
              />
              <FormField
                name='otherNames'
                placeholder='Fascinator Tricolor'
                label='Pozostałe nazwy (oddziel przecinkiem)'
              />
              <FormField
                name='description'
                isRequired
                placeholder='Odmiana Fascinator Tricolor jest...'
                label='Opis'
              />
            </VStack>

            <Button
              mt={4}
              colorScheme='green'
              isLoading={props.isSubmitting}
              type='submit'
              mr={4}
            >
              Zapisz
            </Button>
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              colorScheme='red'
              type='reset'
            >
              Chcę zacząć on nowa
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};
