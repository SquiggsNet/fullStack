import { Box, useRadio, UseRadioProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";


export const RadioCard: React.FC<UseRadioProps | undefined> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: useColorModeValue("lightprimary", "darkprimary"),
          color: useColorModeValue("lightshades", "darkshades"),
          borderColor: useColorModeValue("lightprimary", "darkprimary"),
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
