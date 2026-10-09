# _AGENT.md — `src/content/blog/`

> Named `_AGENT.md` (underscore) on purpose: any other `.md` in this folder is parsed as a blog post and must satisfy the schema. Never rename this file to `AGENT.md`.

Markdown posts for the `blog` collection (schema in `../config.ts`). Two posts, both written in March 2023 and originally published on dev.to. Filenames contain spaces and a colon — that is fine; Astro slugifies them.

## `What is tRPC and how can we use it in our Apps.md` (125 lines, ~4 min read)
- Frontmatter: `title`, `description` ("In this article, we will explore the tRPC library and its features…"), `pubDate: 2023-03-06`, `category: "DEV"`.
- Slug: `what-is-trpc-and-how-can-we-use-it-in-our-apps`.
- Structure: `## Introduction` → `## Why tRPC over REST or GraphQL ?` → `### Features of tRPC` (bullet list) → `## How to setup/use tRPC` with `### 1. Define backend router`, `### 2. Creating router instance`, `### 3. Add a query procedure`, `### 4. Using input parser to validate procedure inputs`, `### 5. Adding a mutation procedure` → `## now we can use your backend on the client.` with `### 1. setup the tRPC Client`, `### 2. Querying & mutating`.
- Code is shown as **9 images** (screenshots hot-linked from dev.to's CDN), not fenced code blocks — so Shiki highlighting isn't exercised by this post. If the images ever 404, the fix is to transcribe them into fenced ```ts blocks.

## `Beyond Basic Validation: Elevating Your Form Data Handling Strategy.md` (43 lines, ~3 min read)
- Frontmatter: `title`, `description` (added during the revamp: "Why front-end validation matters, what it does and doesn't protect you from, and how to do it properly with schema-based tools."), `pubDate: 2023-03-10`, `category: "DEV"`.
- Slug: `beyond-basic-validation-elevating-your-form-data-handling-strategy`.
- Structure: `## Intro` → `## What is validation?` → `## Why should we do data validation?` → `## How validation is done on the front-end side?`; one hot-linked image and one fenced code block.

## Editing notes
- The inert `layout: ../../layouts/LayoutBlogPost.astro` line was removed from both files on 2026-09-10; never re-add it.
- Newest post appears first everywhere (sorted by `pubDate`).
- Prev/next links on post pages are computed from the same sorted order in `src/pages/blog/[...slug].astro`.
- `category` renders as an accent-coloured mono label above the title; keep it short and uppercase-friendly.
- `tags` are accepted by the schema but not displayed anywhere yet.
