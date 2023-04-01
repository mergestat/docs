---
title: Exploring Git Blame w/ SQL 🌎
authors: [patrickdevivo]
description: One of MergeStat's more unusual data syncs is `GIT_BLAME`. It's unusual because the output of `git blame` is typically not viewed *in aggregate*, let alone with SQL 🙂. We spent some time playing with this data, and ended up finding some interesting queries as a result!
tags: [mergestat, sql, git, open-source, blame]
---

# Exploring Git Blame w/ SQL 🌎

One of [MergeStat](https://github.com/mergestat/mergestat)'s more unusual data syncs is `GIT_BLAME`.
It's unusual because the output of `git blame` is typically not viewed *in aggregate*, let alone with SQL 🙂.

We spent some time playing with this data, and ended up finding some interesting queries as a result!

The `GIT_BLAME` sync today, runs `git blame ...` on every file in a repo, and stores the output in a postgres table with the following columns:

| column                | type                                               |
|-----------------------|----------------------------------------------------|
| `repo_id`               | `UUID NOT NULL`                                      |
| `author_email`          | `TEXT`                                               |
| `author_name`           | `TEXT`                                               |
| `author_when`           | `TIMESTAMP(6) WITH TIME ZONE`                        |
| `commit_hash`           | `TEXT`                                               |
| `line_no`               | `INTEGER NOT NULL`                                   |
| `line`                  | `TEXT`                                               |
| `path`                  | `TEXT NOT NULL`                                      |
| `_mergestat_synced_at`  | `TIMESTAMP(6) WITH TIME ZONE NOT NULL` |

So for every line of code in a repo, we're able to access the author information (and commit hash, which can be joined with the `git_commits` table) about who last modified that line.

### What percent of code (by line) is each author "blameable" for?

Of all the lines of code in the repo, what percent was last modified by each author.

```sql
WITH blamed_lines AS (
    SELECT * FROM git_blame
    JOIN repos ON repos.id = git_blame.repo_id
    WHERE repo = 'https://github.com/mergestat/mergestat' -- only look at one repo
)
SELECT ROUND(100.0*count(*)/(SELECT count(*) FROM blamed_lines), 2) AS percent, author_name FROM blamed_lines
GROUP BY author_name
ORDER BY count(*) DESC
```

```
37.12	(author #1)
27.02	(author #2)
12.51	(author #3)
6.47	(author #4)
4.47	(author #5)
3.23	(author #6)
2.25	(author #7)
1.92	(author #8)
1.59	(author #9)
...
```

Let's limit our analysis to only certain types of files in a repo.

```sql
WITH blamed_lines AS (
    SELECT * FROM git_blame
    JOIN repos ON repos.id = git_blame.repo_id
    WHERE repo = 'https://github.com/mergestat/mergestat' -- only look at one repo
    AND path LIKE '%.go' -- only look at .go files
)
SELECT ROUND(100.0*count(*)/(SELECT count(*) FROM blamed_lines), 2) AS percent, author_name FROM blamed_lines
GROUP BY author_name
ORDER BY count(*) DESC
```

### What's the average (mean) age of a line of code?

How long has it been since a line of code in our repo was last modified?

```sql
SELECT avg((extract(epoch FROM (SELECT (now() - author_when)))/86400)::int) as avg_age_days from git_blame
JOIN repos ON repos.id = git_blame.repo_id
WHERE repo = 'https://github.com/mergestat/mergestat'
```

What about only in certain file types?

```sql
SELECT avg((extract(epoch FROM (SELECT (now() - author_when)))/86400)::int) as avg_age_days from git_blame
JOIN repos ON repos.id = git_blame.repo_id
WHERE repo = 'https://github.com/mergestat/mergestat'
AND path LIKE '%.go' -- only look at go files
```

### What's the average age of code, by author?

```sql
SELECT count(*), avg((extract(epoch FROM (SELECT (now() - author_when)))/86400)::int) AS avg_age_days, author_name FROM git_blame
JOIN repos on repos.id = git_blame.repo_id
WHERE repo = 'https://github.com/mergestat/mergestat'
GROUP BY author_name
ORDER BY count(*) DESC
```
