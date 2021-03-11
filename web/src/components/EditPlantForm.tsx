import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { FullPlantFragment } from '../generated/graphql';
import { FileField } from './FileField';
import { FormField } from './FormField';
import {
  Image as CloudinaryImage,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';

interface EditPlantFormProps {
  plantToEdit: FullPlantFragment;
}

export const EditPlantForm: React.FC<EditPlantFormProps> = ({
  plantToEdit,
}) => {
  const {} = plantToEdit;
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; size: number }[]
  >([]);

  return (
    <Formik
      initialValues={{
        primaryName: '',
        otherNames: '',
        description: '',
      }}
      onSubmit={async (values, { setErrors }) => {
        // const { primaryName, description } = values;
        // const plant = {
        //   primaryName,
        //   description,
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
              <HStack spacing={4} width='100%'>
                {plantToEdit.images.map((image) => (
                  <Box
                    key={image}
                    borderWidth='medium'
                    borderColor='gray.200'
                    borderStyle='dotted'
                    _hover={{ borderColor: 'red.400' }}
                    rounded={10}
                    overflow='hidden'
                  >
                    <CloudinaryImage cloudName='disxisevt' publicId={image}>
                      <Transformation
                        height='100'
                        quality='40'
                        width='100'
                        crop='fill'
                      />
                    </CloudinaryImage>
                  </Box>
                ))}
              </HStack>

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
