import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/post`);
  }, [router]);
  return (
    <>
      <Layout>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
