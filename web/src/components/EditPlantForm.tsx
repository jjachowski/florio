import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { Image as CloudinaryImage, Transformation } from 'cloudinary-react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FullPlantFragment, useEditPlantMutation } from '../generated/graphql';
import { FileField } from './FileField';
import { FormField } from './FormField';
import { PetFriendlyField } from './PetFriendlyField';
import { PetFriendlySourceField } from './PetFriendlySourceField';

interface EditPlantFormProps {
  plantToEdit: FullPlantFragment;
}

export const EditPlantForm: React.FC<EditPlantFormProps> = ({
  plantToEdit,
}) => {
  const [editPlant] = useEditPlantMutation();
  console.log(plantToEdit);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; size: number }[]
  >([]);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);

  const toggeSelectedToDelete = (imageName: string) => {
    if (selectedToDelete.includes(imageName)) {
      setSelectedToDelete(selectedToDelete.filter((s) => s !== imageName));
    } else {
      setSelectedToDelete([...selectedToDelete, imageName]);
    }
  };

  return (
    <Formik
      initialValues={{
        primaryName: plantToEdit.primaryName,
        otherNames: plantToEdit.otherNames,
        description: plantToEdit.description,
        isCatFriendly: plantToEdit.isCatFriendly,
        isCatFriendlySource: plantToEdit.isCatFriendlySource ?? '',
        isDogFriendly: plantToEdit.isDogFriendly,
        isDogFriendlySource: plantToEdit.isDogFriendlySource ?? '',
        images: [],
      }}
      onSubmit={async (values) => {
        const result = await editPlant({
          variables: {
            id: plantToEdit.id,
            input: values as any,
            imagesToDelete: selectedToDelete,
          },
        });
        console.log(result);
      }}
      onReset={() => setSelectedToDelete([])}
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
              <PetFriendlyField
                checked={props.values.isCatFriendly}
                variation='cat'
                name='isCatFriendly'
              />
              <PetFriendlySourceField
                isDisabled={!props.values.isCatFriendly}
                variation='cat'
                name='isCatFriendlySource'
                placeholder='np. adres strony internetowej lub fragment książki...'
              />
              <PetFriendlyField
                checked={props.values.isDogFriendly}
                variation='dog'
                name='isDogFriendly'
              />
              <PetFriendlySourceField
                isDisabled={!props.values.isDogFriendly}
                variation='dog'
                name='isDogFriendlySource'
                placeholder='np. adres strony internetowej lub fragment książki...'
              />
              <Box w='100%' mr='auto' color='gray.500'>
                {`Wybierz zdjęcia do usunięcia (zaznaczono: ${selectedToDelete.length})`}
              </Box>
              <HStack spacing={4} width='100%'>
                {plantToEdit.images.map((image) => (
                  <Box
                    key={image}
                    border='2px'
                    borderColor={
                      selectedToDelete.includes(image) ? 'red.600' : 'gray.200'
                    }
                    borderStyle={
                      selectedToDelete.includes(image) ? 'solid' : 'dashed'
                    }
                    _hover={{ borderColor: 'red.500', borderStyle: 'dashed' }}
                    onClick={() => toggeSelectedToDelete(image)}
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
