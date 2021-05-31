import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useIsAuth } from "../../../utils/useIsAuth";
import { withApollo } from "../../../utils/withApollo";

export const EditPost: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const intId = useGetIntId();
  const [updatePost] = useUpdatePostMutation();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
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

  if (!data?.post) {
    return (
      <Layout>
        <Box>loading...</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          const { errors } = await updatePost({
            variables: { id: intId, ...values },
          });
          if (!errors) {
            router.back();
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
                Update post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
