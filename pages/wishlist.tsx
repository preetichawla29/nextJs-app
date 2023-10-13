import Head from "next/head"
import Link from "next/link"
import { formatDate } from "lib/utils"

import { getWishlistData } from "lib/drupal"
import { Layout } from "components/layout"
import { useAuth } from "contexts/AuthContext";
import useSWR from 'swr'

export default function IndexPage() {
  const { base64Credentials } = useAuth();

  const { data:nodes , error, isLoading } = useSWR(base64Credentials, getWishlistData)

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <Layout>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <main>
      <table className="container">
        <thead>
        <tr>
          <td className="mb-4 text-2xl font-bold">Title</td>
          <td className="mb-4 text-2xl font-bold">Wishlist Project</td>
          <td className="mb-4 text-2xl font-bold">Created On</td>
          <td className="mb-4 text-2xl font-bold">Last Updated</td>
        </tr>
        </thead>
        <tbody>
        {nodes?.length ? (
          nodes.map((node) => (
            <tr key={node.id}>
             <td>
             <h2 className="mb-4 text-1xl">{node.attributes.title}</h2></td>
          <td>  
             <Link className="text-blue" href={node.attributes.field_contribution_project.uri}>
					      {node.attributes.field_contribution_project.uri}
              </Link>
          </td>
          <td>  
            <div className="mb-4 text-gray-600">
              <span>{formatDate(node.attributes.created)}</span>
            </div>
          </td>
          <td>
            <div className="mb-4 text-gray-600">
             <span>{formatDate(node.attributes.changed)}</span>
            </div>
          </td>
            </tr>
          ))
        ) : (
          <div className="py-4">No nodes found</div>
        )}
        </tbody>
        </table>
        </main>
    </Layout>
  )
}
