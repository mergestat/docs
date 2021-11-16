---
sidebar_position: 5
title: Sourcegraph API
---

# Sourcegraph API (`experimental`!)

You can use `askgit` to query the [Sourcegraph API](https://sourcegraph.com/api/console).

## Authenticating

You must provide an authentication token in order to use the Sourcegraph API tables.
You can create a personal access token [following these instructions](https://docs.sourcegraph.com/cli/how-tos/creating_an_access_token).
`askgit` will look for a `SOURCEGRAPH_TOKEN` environment variable when executing, to use for authentication.
This is also true if running as a runtime loadable extension.

### `sourcegraph_search`

Table-valued-function that returns results from a Sourcegraph search.

| Column               | Type |
|----------------------|------|
| __typename           | TEXT |
| results              | TEXT |

`__typename` will be one of `Repository`, `CommitSearchResult`, or `FileMatch`.
`results` will be the JSON value of a search result (will match what's returned from the API)

Params:
  1. `query` - a sourcegraph search query ([docs](https://docs.sourcegraph.com/))

```sql
SELECT sourcegraph_search('askgit');
```
