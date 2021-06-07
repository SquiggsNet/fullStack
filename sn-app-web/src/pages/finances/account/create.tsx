import { Box, Button, Flex, FormLabel, HStack, useColorModeValue, useRadioGroup } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { RadioCard } from "../../../components/RadioCard";
import { Wrapper } from "../../../components/Wrapper";
import { useCreateAccountMutation } from "../../../generated/graphql";
import { useIsAuth } from "../../../utils/useIsAuth";
import { withApollo } from "../../../utils/withApollo";

export const CreateAccount: React.FC<{}> = ({}) => {
  useIsAuth();
  const isCreditOptions = ["Asset", "Debt"];
  const [isCredit, setIsCredit] = useState<boolean>(true);
  const [createAccount] = useCreateAccountMutation();
  const router = useRouter();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "isCredit",
    defaultValue: "Asset",
    onChange: (value) => {
      if (value === "Asset") {
        setIsCredit(true);
      } else if (value === "Debt") {
        setIsCredit(false);
      }
    },
  });
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
              name: "",
              description: "",
              balance: 0,
              balanceDate: new Date(),
              isCredit: isCredit,
            }}
            onSubmit={async (values) => {
              values.balance = Number(values.balance);
              if (isCredit !== undefined) {
                values.isCredit = isCredit;
              }
              const { errors } = await createAccount({
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
                    Create Account
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

export default withApollo({ ssr: false })(CreateAccount);
