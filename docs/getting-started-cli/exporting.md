---
sidebar_position: 4
---

# Exporting to SQLite

You can use the `mergestat export` sub command to save the output of queries into a sqlite database file.
The command expects a path to a db file (which will be created if it doesn't already exist) and a variable number of "export pairs," specified by the `-e` flag.
Each pair represents the name of a table to create and a query to generate its contents.

```
mergestat export my-export-file -e commits -e "SELECT * FROM commits" -e files -e "SELECT * FROM files"
```

This can be useful if you're looking to use another tool to examine the data emitted by `mergestat`.
Since the exported file is a plain SQLite database, queries should be much faster (as the original git repository is no longer traversed) and you should be able to use any tool that supports querying SQLite database files.
