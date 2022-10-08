---
sidebar_position: 4
---

# NPM Registry

MergeStat Lite can also query the NPM registry API.

## `npm_get_package`

Scalar function that queries `https://registry.npmjs.org/<<packageName>>` or `https://registry.npmjs.org/<<packageName>>/<<version>>` (depending on number of params)
and returns the JSON response.

Params:
  1. `package` - name of the NPM package
  2. `version` - (optional) package version

```sql
SELECT npm_get_package('jquery')
SELECT npm_get_package('jquery', 'latest')
```
