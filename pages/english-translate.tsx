import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from "components/layout"


async function fetchTranslatedData(nodeId, language) {
  try {
    const response = await axios.get(
      `https://contribution-tracker.ddev.site/${language}/jsonapi/node/contribution/${nodeId}`
    );

    return response.data.data; // Assuming you're interested in the "data" part of the response
  } catch (error) {
    console.error('Error fetching translated data:', error);
    throw error;
  }
}
export default function TranslatedDataComponent() {
  const [translatedData, setTranslatedData] = useState(null);

  useEffect(() => {
    // Fetch translated data when the component mounts
    fetchTranslatedData('268e2f71-eaf9-44df-aac7-aacfbd72bfa7', 'en') 
      .then((data) => {
        setTranslatedData(data);
      });
  }, []);

  if (!translatedData) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
    <div>
      <h1 className="mb-4 text-4xl font-bold">{translatedData.attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: translatedData.attributes.field_contribution_details.value }} />
    </div>
    </Layout>
  );
}

