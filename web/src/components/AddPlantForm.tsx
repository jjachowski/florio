import { Box, Button, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useUploadFileTestMutation } from '../generated/graphql';
import { FileField } from './FileField';
import { FormField } from './FormField';
import { PetFriendlyField } from './PetFriendlyField';
import { PetFriendlySourceField } from './PetFriendlySourceField';

export type AddPlantFormInput = {
  primaryName: string;
  otherNames: string;
  description: string;
};

export type AddPlantFormValue = {
  primaryName: string;
  otherNames: string[];
  description: string;
  isCatFriendly: boolean;
  isCatFriendlySource: string;
  isDogFriendly: boolean;
  isDogFriendlySource: string;
  images: FileList;
};

interface AddPlantFormProps {
  onFormSubmit: (
    plant: AddPlantFormValue,
    setErrors: (errors: FormikErrors<AddPlantFormInput>) => void
  ) => void;
}

export const AddPlantForm: React.FC<AddPlantFormProps> = ({ onFormSubmit }) => {
  const [upload] = useUploadFileTestMutation();
  const [filePreviews, setFilePreviews] = useState<
    { name: string; size: number }[]
  >([]);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  return (
    <Formik
      initialValues={{
        primaryName: '',
        otherNames: '',
        description: '',
        isCatFriendly: false,
        isCatFriendlySource: '',

        isDogFriendly: false,
        isDogFriendlySource: '',

        images: [] as any,
      }}
      onReset={(_, { setFieldValue }) => {
        setFieldValue('images', []);
        setFilePreviews([]);
      }}
      onSubmit={async (values, { setErrors }) => {
        const plant = {
          ...values,
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
              <PetFriendlyField variation='cat' name='isCatFriendly' />
              <PetFriendlySourceField
                isDisabled={!props.values.isCatFriendly}
                variation='cat'
                name='isCatFriendlySource'
                placeholder='np. adres strony internetowej lub fragment książki...'
              />
              <PetFriendlyField variation='dog' name='isDogFriendly' />
              <PetFriendlySourceField
                isDisabled={!props.values.isDogFriendly}
                variation='dog'
                name='isDogFriendlySource'
                placeholder='np. adres strony internetowej lub fragment książki...'
              />
              <FileField
                name='images'
                isRequired
                hiddenFileInput={hiddenFileInput}
                filePreviews={filePreviews}
                onAccepted={(files) => {
                  if (!files) {
                    return;
                  }
                  setFilePreviews(
                    Array.from(files).map((f) => {
                      return { name: f.name, size: f.size };
                    })
                  );

                  props.setFieldValue('images', files);
                }}
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
