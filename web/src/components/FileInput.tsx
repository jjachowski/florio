import { Button, Input, InputProps } from '@chakra-ui/react';
import React from 'react';

interface FileInputProps extends InputProps {
  handleFile: (file: FileList) => void;
}

// https://masakudamatsu.medium.com/how-to-customize-the-file-upload-button-in-react-b3866a5973d8
export const FileInput: React.FC<FileInputProps> = ({
  handleFile,
  ...props
}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput!.current!.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event?.target?.files.length > 0) {
      const fileUploaded = event?.target?.files;
      handleFile(fileUploaded);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Dodaj zdjęcia rośliny</Button>
      <Input
        {...props}
        type='file'
        multiple
        ref={hiddenFileInput}
        onChange={handleChange}
        onReset={() => console.log('restet!')}
        display='none'
      />
    </>
  );
};
