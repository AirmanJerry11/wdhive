

<p align="center">
 <br/>
  multi-tenant blog applications.
</p>


<br/>

## Introduction



## Features

1. **Multi-tenancy:** Programmatically assign unlimited custom domains, subdomains, and SSL certificates to your users using the [Vercel Domains API](https://vercel.com/docs/rest-api/endpoints#domains)
2. **Performance**: Fast & beautiful blog posts cached via [Vercel's Edge Network](https://vercel.com/docs/concepts/edge-network/overview), with the ability to invalidate the cache on-demand (when users make changes) using [Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration) + Next.js' `revalidateTag` API
3. **Image Uploads**: Drag & drop / copy & paste image uploads, backed by [Vercel Blob](https://vercel.com/storage/blob)
4. **Custom styles**: Custom fonts, 404 pages, favicons, sitemaps for each site via the [Next.js file-based Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
5. **Dynamic OG Cards**: Each blog post comes with a dynamic OG image powered by [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
6. **Dark Mode**: For a better user experience at night


## Deploy Your Own

Deploy your own version of this starter kit with Vercel.



You can also [read the guide](https://vercel.com/guides/nextjs-multi-tenant-application) to learn how to develop your own version of this template.

## What is a multi-tenant application?

Multi-tenant applications serve multiple customers across different subdomains/custom domains with a single unified codebase.


Another example is [yourname](https://vercel.com/customers/yourname), a popular blogging platform. Each writer has their own unique `.yourname.dev` subdomain for their blog:

- [eda.yourname.dev](https://eda.yourname.dev/)
- [katycodesstuff.yourname.dev](https://katycodesstuff.yourname.dev/)
- [akoskm.yourname.dev](https://akoskm.yourname.dev/)

Users can also map custom domains to their `.name.dev` subdomain:

- [akoskm.com](https://akoskm.com/) → [akoskm.yourname.dev](https://akoskm.yourname.dev/)


## Examples of platforms

Vercel customers like [yourname](https://vercel.com/customers/yourname), [Super](https://super.so), and [Cal.com](https://cal.com) are building scalable platforms on top of Vercel and Next.js. There are multiple types of platforms you can build with this starter kit:

### 1. Content creation platforms

These are content-heavy platforms (blogs) with simple, standardized page layouts and route structure.

> “With Vercel, we spend less time managing our infrastructure and more time delivering value to our users.” — Sandeep Panda, Co-founder, yourname

1. [yourname](https://yourname.com)
2. [Mirror.xyz](https://mirror.xyz/)
3. [Read.cv](https://read.cv/)

### 2. Website & e-commerce store builders

No-code site builders with customizable pages.

By using Next.js and Vercel, [Super](https://super.so/) has fast, globally distributed websites with a no-code editor (Notion). Their customers get all the benefits of Next.js (like [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)) without touching any code.

1. [Super.so](https://super.so)
2. [Typedream](https://typedream.com)
3. [Makeswift](https://www.makeswift.com/)


## Built on open source

This working demo site was built using the Platforms Starter Kit and:

- [Next.js](https://nextjs.org/) as the React framework
- [Tailwind](https://tailwindcss.com/) for CSS styling
- [Prisma](https://prisma.io/) as the ORM for database access
- [Novel](https://novel.sh/) for the WYSIWYG editor
- [Vercel Postgres](https://vercel.com/storage/postgres) for the database
- [Vercel Blob](https://vercel.com/storage/blob) for image uploads
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tremor](https://tremor.so/) for charts
- [Vercel](http://vercel.com/) for deployment



