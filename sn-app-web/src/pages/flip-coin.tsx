import React from 'react'
import { CoinFlip } from '../components/CoinFlip';
import { Layout } from '../components/Layout';
import { withApollo } from "../utils/withApollo";

export const FlipCoin: React.FC = ({}) => {
    return (
      <Layout>
        <CoinFlip />
      </Layout>
    );
}

export default withApollo({ ssr: false })(FlipCoin);