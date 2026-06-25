# Kaizen Maths Site

This is the Kaizen Maths web application for teacher-facing maths tools, worksheets, classroom displays, and assessment practice.

It is deliberately lightweight, but it models the important site ideas:

- one shared app layout
- one central tool registry
- searchable and filterable tool library
- collection routes
- per-tool pages
- legacy HTML tool hosting through iframes
- shared teacher notes area
- responsive mobile layout

## Open Locally

Open `index.html` directly in a browser, or serve the folder with any static server.

```sh
python3 -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173/
```

## Current Routes

```text
#/
#/tools
#/tools/substitution
#/collections/algebra
#/collections/numbers
#/collections/classroom-tools
#/teacher
```

## Where Tools Are Registered

For this prototype, tool data lives in `app.js` in the `tools` array.

Each tool record currently includes:

```js
{
  slug: "substitution",
  title: "Algebraic Substitution",
  category: "Algebra",
  level: "KS3 / GCSE",
  type: "Practice Generator",
  access: "Free",
  status: "Pilot",
  description: "Generate substitution questions with answers, worked steps, a timer, and teacher notes.",
  tags: ["algebra", "substitution", "expressions", "worked steps"],
  toolPath: "tools/substitution/index.html",
  imported: true,
  legacyUrl: "https://www.kaizen-maths.com/substitution"
}
```

## How To Add An Existing HTML Tool

You do not need to rebuild the generator. Copy the existing single-file tool into a folder under `tools/`.

Example:

```text
tools/
  fractions/
    index.html
```

Then update the registry entry in `app.js`:

```js
{
  slug: "fractions",
  title: "Fractions",
  toolPath: "tools/fractions/index.html",
  imported: true
}
```

The route `#/tools/fractions` will then embed that file inside the Kaizen Maths site.

In a full Next.js/Vercel app, this would become something like:

```text
src/tools/registry.ts
public/tools/substitution/index.html
public/tools/fractions/index.html
src/app/tools/[slug]/page.tsx
```

## Suggested Migration Path

1. Add all existing tools to the registry.
2. Copy each existing HTML file into `tools/<slug>/index.html`.
3. Set `imported: true` for each copied tool.
4. Add accounts, subscriptions, school workspaces, analytics, saved sets, and exact-share question seeds.
5. Convert individual tools only when there is a clear reason to go beyond iframe hosting.
