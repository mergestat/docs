# Public Workspace API

:::caution

The public API offering is in **alpha** and behavior will likely change. Please be aware.

:::

We currently offer an API for executing queries in our free [**public** workspace](https://app.mergestat.com/w/public).
No authentication is needed, however queries are subject to certain limitations:

1. Git operations can only operate on public repositories
2. Only 500 rows may be returned in a single query
3. 15 min max query timeout
4. Query options cannot be set (no `GitHub` token or default repo)

### Endpoint

All API requests will be made the following endpoint: **`https://graphql.mergestat.com/api/rest/`**

### Executing a Query

Make a `POST` request to **`https://graphql.mergestat.com/api/rest/query`** with the following JSON body:

```json
{
    "sql": "SELECT * FROM commits('https://github.com/mergestat/mergestat')"
}
```

`sql` is the only allowed parameter and should be a string of the SQL you'd like to execute.

The response will look something like:

```json
{
  "query": {
    "id": "f96e0c55-67de-4f02-9111-54f291d9a839",
    "status": "QUEUED"
  }
}
```

:::tip
Mark down the `id` returned, as it will be used in subsequent endpoints to retrieve results.
:::

### Retrieving Results

Make a `GET` request to **`https://graphql.mergestat.com/api/rest/query-results/:queryID`** where `:queryID` is replaced by the `id` returned when executing the query.
Output will look like the following:

:::tip
There are **4** types of result entries for a query: **`LOG`**, **`SCHEMA`**, **`ROW`** and **`ERROR`**.
Keep this in mind when working with results, to treat each type separately.
:::

```json
{
  "query": {
    "status": "DONE",
    "execution_time_ms": 1008,
    "done_at": "2021-12-07T14:45:17.412896+00:00",
    "created_at": "2021-12-07T14:45:16.404479+00:00",
    "created_by": null
  },
  "results": [
    {
      "row_num": 1,
      "type": "LOG",
      "contents": {
        "info": "invoking query with id: 30ff1438-800e-4dcd-ad6a-d46e81a44bab"
      },
      "created_at": "2021-12-07T14:45:16.595281"
    },
    {
      "row_num": 2,
      "type": "SCHEMA",
      "contents": {
        "colNames": [
          "hash",
          ...
        ],
        "colTypes": [
          "TEXT",
          ...
        ]
      },
      "created_at": "2021-12-07T14:45:17.379708"
    },
    {
      "row_num": 3,
      "type": "ROW",
      "contents": {
        "hash": "e54291f783a8811c47688b5e366deb1de001b6cd",
        ...
      },
      "created_at": "2021-12-07T14:45:17.379708"
    },
    {
      "row_num": 4,
      "type": "ROW",
      "contents": {
        "hash": "c80539634843c7efd9917065bf84733c2bd23519",
        ...
      },
      "created_at": "2021-12-07T14:45:17.379708"
    },
    {
      "row_num": 5,
      "type": "ROW",
      "contents": {
        "hash": "d73842e747c7e897c669fcdd2db64cc5264b48e0",
        ...
      },
      "created_at": "2021-12-07T14:45:17.379708"
    },
    ...
  ]
}
```