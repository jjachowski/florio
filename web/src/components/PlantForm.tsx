import { FetchResult } from '@apollo/client';
import { toast, Box, VStack, Button } from '@chakra-ui/react';
import { Formik, Form, FormikErrors } from 'formik';
import router from 'next/dist/next-server/lib/router/router';
import React from 'react';
import {
  AddPlantMutation,
  EditPlantMutation,
  PlantFieldsInput,
  useAddPlantMutation,
  useEditPlantMutation,
} from '../generated/graphql';
import Test from '../pages/test';
import { toErrorMap } from '../utils/toFormikErrorMap';
import { FormField } from './FormField';

export type PlantFormInput = {
  primaryName: string;
  otherNames: string;
  description: string;
  imageUrl: string;
};

export type PlantFormValue = {
  primaryName: string;
  otherNames: string[];
  description: string;
  imageUrl: string;
};

interface PlantFormProps {
  initialValues?: PlantFormInput;
  onFormSubmit: (
    plant: PlantFormValue,
    setErrors: (errors: FormikErrors<PlantFormInput>) => void
  ) => void;
}

export const PlantForm: React.FC<PlantFormProps> = ({
  initialValues = {
    primaryName: '',
    otherNames: '',
    description: '',
    imageUrl: '',
  },
  onFormSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const { primaryName, description, imageUrl } = values;
        const plant = {
          primaryName,
          description,
          imageUrl,
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
              <FormField
                name='imageUrl'
                isRequired
                placeholder='https://zielony-parapet ... .jpg'
                label='Link do grafiki'
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
