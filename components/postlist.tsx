import Link from 'next/link'

// Components
import BlogImage from 'components/blogimage'
import ParallaxCover from 'components/blog/parallaxcover'

// Utils
import { formatDate } from 'lib/formatdate'

import type { BlogPosts } from 'pages/blog'

import styles from './postlist.module.scss'

type PostListProps = {
  posts: BlogPosts
}

const PostList = ({ posts }: PostListProps): JSX.Element => (
  <ul className={styles.list}>
    {posts.length === 0 && <p className={styles.noResults}>🧐 No posts found</p>}
    {posts.map(post => {
      const {
        meta: { summary, title, readingTime: readTime, publishedAt, image },
      } = post
      const slug = post.meta.slug || post.filePath.replace(/\.mdx?$/, '')
      return (
        <li key={slug}>
          {slug === 'spring-parallax-framer-motion-guide' && (
            <Link href="/blog/spring-parallax-framer-motion-guide">
              <a>
                <ParallaxCover />
              </a>
            </Link>
          )}
          {image && (
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a aria-label={title}>
                <BlogImage src={image} alt={title} />
              </a>
            </Link>
          )}
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
            <a className={styles.title}>{title}</a>
          </Link>
          <p className={styles.summary}>{summary}</p>
          <p className={styles.meta}>
            Published on <time dateTime={publishedAt}>{formatDate(publishedAt)}</time> &middot; {readTime.text}
          </p>
        </li>
      )
    })}
  </ul>
)

export default PostList
