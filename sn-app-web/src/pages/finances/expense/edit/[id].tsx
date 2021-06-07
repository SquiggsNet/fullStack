import {
  Box,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { InputField } from "../../../../components/InputField";
import { Layout } from "../../../../components/Layout";
import {
  useExpenseQuery,
  useUpdateExpenseMutation,
} from "../../../../generated/graphql";
import { useGetIntId } from "../../../../utils/useGetIntId";
import { useIsAuth } from "../../../../utils/useIsAuth";
import { withApollo } from "../../../../utils/withApollo";
import { Wrapper } from "../../../../components/Wrapper";

export const EditExpense: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const intId = useGetIntId();
  const [updateExpense] = useUpdateExpenseMutation();
  const { data, loading } = useExpenseQuery({
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.expense) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

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
              name: data.expense.name,
              description: data.expense.description,
              value: data.expense.value,
              frequency: data.expense.frequency,
            }}
            onSubmit={async (values) => {
              values.value = Number(values.value);
              const { errors } = await updateExpense({
                variables: { id: intId, ...values },
              });
              if (!errors) {
                router.back();
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
                    Update expense
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

export default withApollo({ ssr: false })(EditExpense);
