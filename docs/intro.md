---
sidebar_position: 1
slug: /
---

# Intro

MergeStat enables **SQL queries** for data in git repositories (and related sources, such as the GitHub API).
It allows you to ask questions about the history and contents of your source code.
It's both an [open-source command line tool](https://github.com/askgitdev/askgit) and a [web application](https://app.mergestat.com/).

For example, it can execute queries like this:

```sql
-- how many commits have been authored by user@email.com?
SELECT count(*) FROM commits WHERE author_email = 'user@email.com'
```
