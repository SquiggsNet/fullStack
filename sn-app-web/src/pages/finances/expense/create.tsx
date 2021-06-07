import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { Wrapper } from "../../../components/Wrapper";
import { useCreateExpenseMutation } from "../../../generated/graphql";
import { useIsAuth } from "../../../utils/useIsAuth";
import { withApollo } from "../../../utils/withApollo";

export const CreateExpense: React.FC<{}> = ({}) => {
  useIsAuth();
  const [createExpense] = useCreateExpenseMutation();
  const router = useRouter();
  return (
    <Layout>
      <Wrapper variant="small">
        <Box
          bg={useColorModeValue("lightcard", "darkcard")}
          borderRadius={18}
          p={5}
        >
          <Formik
            initialValues={{
              name: "",
              description: "",
              value: 0,
              frequency: "",
            }}
            onSubmit={async (values) => {
              values.value = Number(values.value);
              const { errors } = await createExpense({
                variables: { options: values },
                // update: (cache) => {
                //   cache.evict({ fieldName: "posts:{}" });
                // },
              });
              if (!errors) {
                router.push("/finances");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Name" name="name" placeholder="name" />
                <InputField
                  label="Description"
                  name="description"
                  placeholder="description"
                />
                <InputField label="Value" name="value" />
                <InputField
                  label="Frequency"
                  name="frequency"
                  placeholder="frequency"
                />
                <Flex mt={4}>
                  <Button
                    ml="auto"
                    type="submit"
                    bg={useColorModeValue("lightprimary", "darkprimary")}
                    color={useColorModeValue("lightshades", "darkshades")}
                    isLoading={isSubmitting}
                  >
                    Create Expense
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

export default withApollo({ ssr: false })(CreateExpense);
