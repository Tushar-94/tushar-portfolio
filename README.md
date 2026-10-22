This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SEO configuration — Phase 3.1

Before a production build, set `NEXT_PUBLIC_SITE_URL` to the site's actual public
HTTPS origin. No production domain is currently configured in this repository.
The value must contain the origin only: no path, query, fragment, credentials, or
port. Localhost and private network addresses are rejected. Do not use a preview
deployment URL as the production origin.

Set the variable in your hosting provider's production build environment, or in
an untracked `.env.local` when testing with your real domain, then run:

```sh
npm run build
npm run start
```

`NEXT_PUBLIC_` variables are embedded during the build. Rebuild whenever the
production origin changes. Builds without a configured origin remain usable,
but intentionally omit canonicals, public social-image URLs, URL-based JSON-LD,
and sitemap entries. There is no invented production domain or production
localhost canonical. Development uses `http://localhost:3000` only as a metadata
base for local social-image previews.

### Indexing and deployment environments

- A production build with a valid site origin is indexable.
- `next dev`, Vercel environments other than `production`, and Netlify contexts
  other than `production` emit `noindex, nofollow`. Keep these platform environment
  variables available during the build. Other preview hosts must supply a
  non-production `VERCEL_ENV` or `CONTEXT` value during their build.
- Unconfigured production builds also emit `noindex, nofollow`.
- `robots.txt` allows crawling, including static assets, so crawlers can read the
  HTML `noindex` directive. Blocking a URL in robots.txt would prevent that;
  [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
  explains the distinction. Preview protection is an indexing precaution, not
  access control for private content.
- The production sitemap is advertised only in an indexable build. Development,
  preview, and unconfigured builds return an empty sitemap.

### Published routes and sharing

The canonical writing index is `/writing`; `/blog` permanently redirects there.
Published article URLs remain `/blog/[slug]`. The sitemap derives six case-study
URLs from `caseStudies` and published article URLs from `blogPosts`, alongside
`/`, `/about`, `/projects`, and `/writing` (currently 12 URLs). Drafts in `articles`
are excluded. Experience and Contact remain homepage anchors, not separate routes.

`/og` serves the shared 1200 × 630 PNG generated with Next.js `ImageResponse` and
its bundled Geist font, without external image or font requests. Metadata uses
this image for Open Graph and Twitter/X large-image cards when a base is available.

Person and WebSite JSON-LD use the existing verified profile URLs. Project and
article pages include breadcrumbs; articles also include BlogPosting JSON-LD.
Article dates currently have month/year precision, so exact `datePublished`,
`dateModified`, and sitemap `lastModified` values are intentionally omitted.
The shared branding card is not asserted to be an article-content image in JSON-LD.

Before launch, verify the rendered canonical and Open Graph URLs, `/robots.txt`,
`/sitemap.xml`, and `/og` on the real domain. Validate structured data using
Google's Rich Results Test or Schema.org's validator, and submit the sitemap to
Search Console. These external checks require the final deployment and are not
performed automatically by this repository.
