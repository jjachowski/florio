import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  const validateName = (value: any) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value !== "Naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{ name: "Sasuke" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Box rounded={10} borderWidth={3} p={4}>
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  isRequired
                >
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  isRequired
                >
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default Test;
