import { Layout } from "components/layout";
import { LoginForm } from "components/login-form";
import { useAuth } from "../contexts/AuthContext";

export default function MyPage() {

  const { base64Credentials } = useAuth();

  // @TODO: It shouln't work unless we write a function in drupal.ts to fetch data, 
  // passing the base64credentials to that function.

  return (
    <Layout>
      {/* <div>
        {authUserData ? (
          <div>
            <h2 className="mb-4 text-4xl font-bold">{authUserData.attributes.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: authUserData.attributes.field_contribution_details.value,
              }}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div></div>
      </div> */}
      <LoginForm />
    </Layout>
  );
}
