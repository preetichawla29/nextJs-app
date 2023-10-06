import { useEffect, useState } from 'react';
import { fetchAuthenticatedData } from '../lib/drupal';
import { Layout } from "components/layout"
import { LoginForm } from 'components/login-form';


export default function MyPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const username = 'heykarthikwithu';
    const password = 'password';
    // Use the utility function to make an authenticated API request
    fetchAuthenticatedData(username, password)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // console.log('value', data)
  return (
    <Layout>
   
   <div>
        {data ? (
            <div>
            <h2  className="mb-4 text-4xl font-bold">{data.attributes.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.attributes.field_contribution_details.value }} />
            </div>
        ) : (
            <p>Loading...</p>
        )}
         <div>
     
    </div>
        </div>
        <LoginForm/>
    </Layout>
  );
}
