---
sidebar_position: 1
slug: /
---

# Intro

MergeStat enables **SQL queries** for data in git repositories (and related sources, such as the GitHub API).
It allows you to ask questions about the history and contents of your source code.
<!-- It's both an [open-source command line tool](https://github.com/mergestat/mergestat) and a [web application](https://app.mergestat.com/). -->

For example, it can execute queries that look like this:

```sql
-- how many commits have been authored by user@email.com?
SELECT count(*) FROM commits WHERE author_email = 'user@email.com'
```

## Why?

Querying source code and commit history with SQL can be an effective way to extract insights from your software development work, for both **engineering leaders** and **developers**.
We've seen a variety of uses so far, including for:

1. Engineering metrics
2. Code quality and pattern monitoring
3. Software supply chain analytics (examining declared dependencies)
4. Config and infra-as-code insights
5. Audit and compliance
6. Developer on-boarding
7. Vulnerability monitoring
