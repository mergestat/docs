import React from 'react';
import Layout from '@theme/Layout';
import EmailSubscribe from '../components/EmailSubscribe';

function Subscribe() {
  return (
    <Layout title="Subscribe">
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '20px',
            flexDirection: 'column'
        }}>
        <div
            style={{
                textAlign: 'center'
            }}
        >
            <h2>Subscribe</h2>
            <p>Add your email to stay in the loop.</p>
        </div>
        <div>
            <EmailSubscribe />
        </div>
      </div>
    </Layout>
  );
}

export default Subscribe;
