# Tool Drop-In Folders

Each existing Kaizen Maths generator can live here as its own standalone HTML file.

Use this pattern:

```text
tools/
  substitution/
    index.html
  fractions/
    index.html
  quadratic-equations/
    index.html
```

Then update the matching registry entry in `../app.js`:

```js
{
  slug: "fractions",
  toolPath: "tools/fractions/index.html",
  imported: true
}
```

The app shell will embed the tool automatically.
