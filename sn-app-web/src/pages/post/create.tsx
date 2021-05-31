import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useCreatePostMutation } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import { withApollo } from "../../utils/withApollo";
export const CreatePost: React.FC<{}> = ({}) => {
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const router = useRouter();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { options: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (!errors) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" name="title" placeholder="title" />
            <Box mt={4}>
              <InputField label="Body" name="text" placeholder="body" />
            </Box>
            <Flex mt={4}>
              <Button
                ml="auto"
                type="submit"
                bg="primary"
                color="snlightshades"
                isLoading={isSubmitting}
              >
                Create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
