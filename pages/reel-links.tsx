import siteMetadata from '@/data/siteMetadata'
import ReelLinksLayout from '@/layouts/ReelLinksLayout'
import { PageSEO } from '@/components/SEO'
import { getAllPostsFrontMatter } from '@/lib/notion/getOps'
import { databaseId } from '@/lib/notion/client'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllPostsFrontMatter(databaseId)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function ReelLinks({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Reel Links - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ReelLinksLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  )
}
