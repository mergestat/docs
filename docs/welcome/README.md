---
sidebar_position: 1
slug: /
description: MergeStat enables SQL queries for data in git repositories (and related sources, such as the GitHub API). It allows you to ask questions about the history and contents of your source code.
---

# Intro

MergeStat enables **SQL queries** for data in git repositories (and related sources, such as the GitHub API).
It allows you to ask questions about the history and contents of your source code.

For example, it can execute queries that look like this:

```sql
-- For example, count commits by author across all repositories
SELECT author_name, count(*) FROM git_commits GROUP BY author_name ORDER BY count(*) DESC
```

## Why?

Querying source code and commit history with SQL can be an effective way to extract insights from your software development work, for various operational use cases.
For instance:

1. Engineering transparency
2. Code quality and pattern monitoring
3. Software supply chain analytics (examining declared dependencies)
4. Config and infra-as-code insights
5. Audit and compliance
6. Developer on-boarding
7. Vulnerability monitoring

## Mission

MergeStat's mission is to enable ***operational analytics*** for engineering teams.
We believe there is value in treating the *processes* of software development as data, and in so doing allow engineers, teams and organizations to be more effective in their every day work.

We recognize that software development is often more *art* than science, and that there can be a great deal of nuance and variation in how different engineers, teams and organizations behave.
As such, we try to **minimize prescriptiveness** as much as possible.

MergeStat should be as neutral as it can in the use-cases it enables.
We of course want to be useful, but we don't want to prescribe *how* to be useful.
We should avoid making *value judgements* about the data MergeStat accesses and presents.
In other words, we should be descriptive and not prescriptive.

For example, we want to avoid concepts such as "productivity," "velocity," and other *qualities* (which are often subjective and dependent on circumstance).
Instead, we want to empower developers and teams to use data to support their own definitions of higher level concepts, based on what they care about or what matters to their circumstances.
