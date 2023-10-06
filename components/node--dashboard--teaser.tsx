import Image from "next/image"
import Link from "next/link"
import { DrupalBlock } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface BlockDashoardTeaserProps {
  block: DrupalBlock
}

export function BlockDashoardTeaser({ block, ...props }: BlockDashoardTeaserProps) {
  return (
    <article {...props}>
    {block.title}
    </article>
  )
}
