import { Box, Button, Link, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { NavBar } from "../../components/NavBar";
import { Wrapper } from "../../components/Wrapper";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../utils/withApollo";

interface resetValues {
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validate = (values: resetValues) => {
    const errors: resetValues = initialValues;
    let hasErrors = false;
    const hasPasswords = values.newPassword && values.confirmPassword;
    if (hasPasswords) {
      const hasSamePasswords = values.newPassword === values.confirmPassword;
      if (!hasSamePasswords) {
        hasErrors = true;
        errors.confirmPassword =
          "Confirmation password does not match password";
      } else {
        errors.confirmPassword = "";
      }
    }
    return hasErrors ? errors : {};
  };

  const submitForm = async (
    values: resetValues,
    { setErrors }: FormikHelpers<resetValues>
  ) => {
const response = await changePassword({
  variables: {
    newPassword: values.newPassword,
    token:
      typeof router.query.token === "string" ? router.query.token : "",
  },
  update: (cache, { data }) => {
    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: data?.changePassword.user,
      },
    });
  },
});
if (response.data?.changePassword.errors) {
  const errorMap = toErrorMap(response.data.changePassword.errors);
  if ("token" in errorMap) {
    setTokenError(errorMap.token);
  }
  setErrors(errorMap);
} else if (response.data?.changePassword.user) {
  router.push("/");
}
  };

  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Box
          bg={useColorModeValue("cardlight", "carddark")}
          borderRadius={18}
          p={5}
        >
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mt={4}>
                  <InputField
                    label="New Password"
                    name="newPassword"
                    placeholder="New Password"
                    type="password"
                    required
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    required
                  />
                </Box>
                {tokenError ? (
                  <Box>
                    <Box color="red">{tokenError}</Box>
                    <NextLink href="/forgot-password">
                      <Link>Click here to request new link</Link>
                    </NextLink>
                  </Box>
                ) : null}
                <Button
                  mt={4}
                  type="submit"
                  bg="primary"
                  isLoading={isSubmitting}
                >
                  Change Password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
