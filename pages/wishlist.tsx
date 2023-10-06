import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { absoluteUrl, formatDate } from "lib/utils"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"

interface IndexPageProps {
    nodes: DrupalNode[]
}

export default function IndexPage({ nodes }: IndexPageProps) {
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
             <h2 className="mb-4 text-1xl">{node.title}</h2></td>
          <td>  
             <Link className="text-blue" href={node.field_contribution_project.uri}>
					      {node.field_contribution_project.uri} 
              </Link>
          </td>
          <td>  
            <div className="mb-4 text-gray-600">
              <span>{formatDate(node.created)}</span>
            </div>
          </td>
          <td>
            <div className="mb-4 text-gray-600">
             <span>{formatDate(node.changed)}</span>
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

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--wishlist",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--contribution]": "title,path,field_contribution_files,uid,created",
        include: "node_type, revision_uid, uid, menu_link, field_contribution_review_status, field_contribution_reviewer",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
