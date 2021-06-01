import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: registerValues) => {
    const errors: registerValues = initialValues;
    let hasErrors = false;
    const hasPasswords = values.password && values.confirmPassword;
    if (hasPasswords) {
      const hasSamePasswords = values.password === values.confirmPassword;
      if (!hasSamePasswords) {
        hasErrors = true;
        errors.confirmPassword =
          "Confirmation password does not match password";
      }
      else {
        errors.confirmPassword = "";
      }
    }
    return hasErrors ? errors : {};
  };

  const submitForm = async (
    values: registerValues,
    { setErrors }: FormikHelpers<registerValues>
  ) => {
    const response = await register({
      variables: {
        options: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.register.user,
          },
        });
      },
    });
    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };
  
  return (
    <Layout>
      <Wrapper variant="small">
        <Box bg="sndarkaccent" color="snlightshades" borderRadius={18} p={5}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  label="Username"
                  name="username"
                  placeholder="Username"
                  isRequired
                />
                <Box mt={4}>
                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    isRequired
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    isRequired
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    isRequired
                  />
                </Box>
                <Box mt={2}>
                  <NextLink href="/forgot-password">
                    <Link color="snlightaccent">Forgot Password?</Link>
                  </NextLink>
                </Box>
                <Flex mt={4}>
                  <Button
                    ml="auto"
                    type="submit"
                    bg="primary"
                    color="snlightshades"
                    isLoading={isSubmitting}
                  >
                    Register
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
