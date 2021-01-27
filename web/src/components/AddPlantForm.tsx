import { Box, Button, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useUploadFileTestMutation } from '../generated/graphql';
import { FileField } from './FileField';
import { FormField } from './FormField';

export type AddPlantFormInput = {
  primaryName: string;
  otherNames: string;
  description: string;
};

export type AddPlantFormValue = {
  primaryName: string;
  otherNames: string[];
  description: string;
  images: FileList;
};

interface AddPlantFormProps {
  initialValues?: AddPlantFormInput;
  onFormSubmit: (
    plant: AddPlantFormValue,
    setErrors: (errors: FormikErrors<AddPlantFormInput>) => void
  ) => void;
}

export const AddPlantForm: React.FC<AddPlantFormProps> = ({
  initialValues = {
    primaryName: '',
    otherNames: '',
    description: '',
    images: null,
  },
  onFormSubmit,
}) => {
  const [upload] = useUploadFileTestMutation();
  const [filePreviews, setFilePreviews] = useState<
    { name: string; size: number }[]
  >([]);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  return (
    <Formik
      initialValues={initialValues}
      onReset={(val, { setFieldValue }) => {
        setFieldValue('images', null);
        setFilePreviews([]);
        hiddenFileInput!.current!.value = '';
      }}
      onSubmit={async (values, { setErrors }) => {
        console.log(values);

        // const { primaryName, description, images } = values;
        // const plant = {
        //   primaryName,
        //   description,
        //   images,
        //   otherNames: values.otherNames.split(',').map((n) => n.trim()),
        // };
        // onFormSubmit(plant, setErrors);
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
              <FileField
                name='images'
                isRequired
                hiddenFileInput={hiddenFileInput}
                filePreviews={filePreviews}
                onChange={async (event) => {
                  console.log(event);
                  console.log(event.target.files);

                  const result = await upload({
                    variables: { images: event.target.files },
                  });
                  console.log(result);

                  // console.log('change');

                  // const { files } = event.target;

                  // if (!files) {
                  //   return;
                  // }
                  // setFilePreviews(
                  //   Array.from(files).map((f) => {
                  //     return { name: f.name, size: f.size };
                  //   })
                  // );

                  // props.setFieldValue('images', event.target.files);
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
