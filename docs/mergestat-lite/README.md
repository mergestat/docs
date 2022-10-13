---
sidebar_position: 2
---
# MergeStat Lite

[**`mergestat-lite`**](https://github.com/mergestat/mergestat-lite) is a local CLI for executing SQL queries. It makes use of [SQLite](https://sqlite.org/index.html) to power its query execution environment.
However, data is not *pre-loaded* into a SQLite database file.
Instead, we take advantage of a feature called the [virtual table mechanism](https://www.sqlite.org/vtab.html), which allows us to define how to *access* data sources, which SQLite then uses to fetch data *as a query executes*.

This allows us to query data sources *directly*, such as git repositories on disk, without a potentially time consuming pre-load step.

Naturally, our dialect of SQL is the [SQLite implementation](https://www.sqlite.org/lang.html).
MergeStat Lite extends SQLite by defining **table-valued functions** and **scalar functions** (similar to what the popular [`osquery`](https://osquery.io/) project does).

### Table-Valued Functions

[Table-valued functions](https://www.sqlite.org/vtab.html#tabfunc2), as the name implies, return a table of results.
This is how our `commits` table works for instance:

```sql
SELECT * FROM commits('https://github.com/mergestat/mergestat-lite', 'HEAD')
SELECT * FROM commits -- no arguments supplied
```


### Scalar Functions

[Scalar functions](https://www.sqlite.org/appfunc.html) return a scalar value, and so can only be used where a scalar value would be found:

```sql
-- GITHUB_TOKEN env must be set
SELECT github_stargazer_count('mergestat/mergestat-lite')
```
