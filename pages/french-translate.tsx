import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from "components/layout"
import { useAuth } from "contexts/AuthContext";
import { getContributionNodeData } from "lib/drupal";

export default function TranslatedDataComponent() {
  const [translatedData, setTranslatedData] = useState(null);
  const { base64Credentials } = useAuth();

  useEffect(() => {
    // Fetch translated data when the component mounts
    getContributionNodeData('268e2f71-eaf9-44df-aac7-aacfbd72bfa7', 'fr', base64Credentials) 
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

      {/* Render other translated fields */}
    </div>
    </Layout>
  );
}
