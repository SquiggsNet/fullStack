import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface loginValues {
  usernameOrEmail: string;
  password: string;
}

export const Login: React.FC = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const initialValues = { usernameOrEmail: "", password: "" };

  const submitForm = async (
    values: loginValues,
    { setErrors }: FormikHelpers<loginValues>
  ) => {
    const response = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login.user,
          },
        });
        cache.evict({ fieldName: "posts:{}" });
      },
    });
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };
  
  return (
    <Layout>
      <Wrapper variant="small">
        <Box
          bg={useColorModeValue("lightcard", "darkcard")}
          borderRadius={18}
          p={5}
        >
          <Formik initialValues={initialValues} onSubmit={submitForm}>
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  label="Username / Email"
                  name="usernameOrEmail"
                  placeholder="Username Or Email"
                  isRequired
                />
                <Box mt={4}>
                  <InputField
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    isRequired
                  />
                </Box>
                <Box mt={2}>
                  <NextLink href="/forgot-password">
                    <Link color="lightaccent">Forgot Password?</Link>
                  </NextLink>
                </Box>
                <Flex mt={4}>
                  <Button
                    ml="auto"
                    type="submit"
                    bg={useColorModeValue("lightprimary", "darkprimary")}
                    color={useColorModeValue("lightshades", "darkshades")}
                    isLoading={isSubmitting}
                  >
                    login
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

export default withApollo({ ssr: false })(Login);
