import {
  Box,
  Button,
  FormLabel,
  HStack,
  Flex,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { InputField } from "../../../../components/InputField";
import { Layout } from "../../../../components/Layout";
import {
  useAccountQuery,
  useUpdateAccountMutation,
} from "../../../../generated/graphql";
import { useGetIntId } from "../../../../utils/useGetIntId";
import { useIsAuth } from "../../../../utils/useIsAuth";
import { withApollo } from "../../../../utils/withApollo";
import { Wrapper } from "../../../../components/Wrapper";
import { RadioCard } from "../../../../components/RadioCard";

export const EditAccount: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const intId = useGetIntId();
  const [updateAccount] = useUpdateAccountMutation();
  const { data, loading } = useAccountQuery({
    variables: {
      id: intId,
    },
  });
  
  const [isCredit, setIsCredit] = useState<boolean>(true);
  const isCreditOptions = ["Asset", "Debt"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "isCredit",
    defaultValue: data?.account?.isCredit ? "Asset" : "Debt",
    onChange: (value) => {
      if (value === "Asset") {
        setIsCredit(true);
      } else if (value === "Debt") {
        setIsCredit(false);
      }
    },
  });
  if (loading) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  if (!data?.account) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }



  const group = getRootProps();
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
              name: data.account.name,
              description: data.account.description,
              balance: data.account.balance,
              balanceDate: data.account.balanceDate,
              isCredit: data.account.isCredit,
            }}
            onSubmit={async (values) => {
              values.balance = Number(values.balance);
              if (isCredit !== undefined) {
                values.isCredit = isCredit;
              }
              const { errors } = await updateAccount({
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
                <InputField label="Current Balance" name="balance" />
                <FormLabel htmlFor="isCredit">Account Type</FormLabel>
                <HStack justify="center" {...group}>
                  {isCreditOptions.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </HStack>
                <Flex mt={4}>
                  <Button
                    ml="auto"
                    type="submit"
                    bg={useColorModeValue("lightprimary", "darkprimary")}
                    color={useColorModeValue("lightshades", "darkshades")}
                    isLoading={isSubmitting}
                  >
                    Update account
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

export default withApollo({ ssr: false })(EditAccount);
