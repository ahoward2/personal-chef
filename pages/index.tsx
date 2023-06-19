import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllPostsFrontMatter } from '@/lib/notion/getOps'
import { databaseId } from '@/lib/notion/client'
import Card from '@/components/Card'
import { HeroBlurb } from '@/components/HeroBlurb'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllPostsFrontMatter(databaseId)

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="flex justify-between pb-3">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl md:leading-14">
              Latest
            </h1>
            <p className="hidden text-lg leading-7 text-gray-500 dark:text-gray-400 md:block">
              {siteMetadata.description}
            </p>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="flex self-end text-base font-medium leading-6">
              <Link
                href="/recipes"
                className="text-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="all posts"
              >
                All Recipes &rarr;
              </Link>
            </div>
          )}
        </div>
        <div>
          <ul className="flex overflow-x-scroll pt-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-x-auto">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, title, featureImage, tags, cookTime } = frontMatter
              return (
                <li key={slug} className="min-w-[70%] pr-4 sm:min-w-0 sm:pr-0 md:w-full">
                  <article className="h-full">
                    <Card
                      title={title}
                      imgSrc={featureImage}
                      href={`/recipes/${slug}`}
                      tags={tags}
                      cookTime={cookTime}
                    />
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        <HeroBlurb />
      </div>
    </>
  )
}
