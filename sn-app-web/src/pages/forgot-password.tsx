import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

export const ForgotPassword: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);
  const [fogotPassword] = useForgotPasswordMutation();

  return (
    <Layout>
      <Wrapper variant="small" color="sndarkaccent">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await fogotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>An email has been sent to this account</Box>
            ) : (
              <Form>
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  isRequired
                />
                <Button
                  mt={4}
                  type="submit"
                  bg="primary"
                  color="snlightshades"
                  isLoading={isSubmitting}
                >
                  Get Password Reset Email
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
