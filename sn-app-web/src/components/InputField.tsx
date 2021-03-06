import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export const InputField: React.FC<
  InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    isRequired?: boolean;
  }
> = ({ label, size: _, isRequired, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
