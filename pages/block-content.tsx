import React, { useEffect, useState } from 'react';
import { getBlockData } from '../lib/drupal';
import { Layout } from "components/layout"

export default function Home() {
  const [blockData, setBlockData] = useState(null);

  useEffect(() => {
    getBlockData('960b2fcb-c8c7-4087-8233-f24eb6d5621f', 'en')
      .then((data) => {
        setBlockData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <Layout>
        <div>
        {blockData ? (
            <div>
            <h2  className="mb-4 text-4xl font-bold">{blockData.attributes.field_title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blockData.attributes.body.value }} />
            </div>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    </Layout>
  );
}


