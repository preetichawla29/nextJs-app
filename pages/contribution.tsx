import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeContributionTeaser } from "components/node--contribution--teaser"
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
      <div>
        {nodes?.length ? (
          nodes
          .map((node) => (
            <div key={node.id}>
              <NodeContributionTeaser node={node} />
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
  
      </div>
    </Layout>

    
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--contribution",
    context,
    {
        locale: "fr",
        defaultLocale: "fe",
      params: {
        "filter[status]": 1,
        "fields[node--contribution]": "title,path,field_contribution_files,uid,created",
        include: "field_contribution_files,uid, field_contribution_reviewer",
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

