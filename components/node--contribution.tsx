import Image from "next/image"
import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { absoluteUrl, formatDate } from "lib/utils"
import { useTranslation } from "next-i18next";
interface NodeContributionProps {
  node: DrupalNode
}

export function NodeContribution({ node, ...props }: NodeContributionProps) {
	const { t } = useTranslation();
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
			<div className="my-4">
				<span className="font-semibold">Contribution Project: </span>
				<div>
				<Link className="text-blue" href={node.field_contribution_project.uri}>
					{node.field_contribution_project.uri} </Link></div>
			</div>
      
			<div className="my-4">
				<span className="font-semibold">Contribution Link: </span>
				<div>
				<Link className="text-blue" href={node.field_contribution_issue_link.uri}>
					{node.field_contribution_issue_link.uri} </Link></div>
			</div>

			<div className="my-4">
				<span className="font-semibold">Contribution Details: </span>
      {node.field_contribution_details?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.field_contribution_details?.processed }}
          className="font-serif text-xl leading-loose prose"
        />
      )}
			</div>
			<div className="my-4">
				<span className="font-semibold">Contribution Type: </span>
				<div>
				{node.field_contribution_type.name}
			</div>
			</div>
			<div className="my-4">
			{node.field_contribution_reviewer?.display_name ? (
				<span className="font-semibold">Contribution Reviewer: </span>
				) : null}
				<div>
					{node.field_contribution_reviewer?.display_name} 
					</div>
					
			</div>
			<div className="my-4">
			{node.field_contribution_review_status.name ?(
				<span className="font-semibold">Contribution Review Status: </span>
				) : null}
				<div>
				{node.field_contribution_review_status.name}
					</div>
			</div>
			<div className="my-4">
			{node.field_contribution_team.name ?(
				<span className="font-semibold">Contribution Team: </span>
				) : null}
				<div>
				{node.field_contribution_team.name}
			</div>
			</div>
			<div className="my-4">
			{node.field_contribution_status.name ?(
				<span className="font-semibold">Contribution Status: </span>
				) : null}
				<div>
				{node.field_contribution_status.name}
					</div>
			</div>
			<div className="my-4">
			{node.field_contribution_version ?(
				<span className="font-semibold">Contribution version: </span>
				) : null}
				<div>
					{node.field_contribution_version} 
					</div>
			</div>
		
			<div className="my-4">
				
			{node.revision_uid.display_name ?(
				<span className="font-semibold">Contribution Author: </span>
				) : null}
				<div>
				<Link href={node.revision_uid.type} className="text-blue no-underline">
				{node.revision_uid.display_name}
				</Link>
					</div>
			</div>
	
      {node.field_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
    </article>
  )
}
