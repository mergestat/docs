---
title: Exploring Git Blame w/ SQL 🌎
authors: [patrickdevivo]
description: One of MergeStat's more unusual data syncs is `GIT_BLAME`. It's unusual because the output of `git blame` is typically not viewed *in aggregate*, let alone with SQL 🙂. We spent some time playing with this data, and ended up finding some interesting queries as a result!
tags: [mergestat, sql, git, open-source, blame]
---

# Exploring Git Blame w/ SQL 🌎

One of [MergeStat](https://github.com/mergestat/mergestat)'s more unusual data syncs is `GIT_BLAME`.
It's unusual because the output of `git blame` is typically not viewed *in aggregate*, let alone with SQL 🙂.

We spent some time playing with this data, and came up with some interesting queries!
We also learned a bit about the [MongoDB source code](https://github.com/mongodb/mongo) running these queries (from the time of writing):

- The average (mean) age of a LOC in MongoDB is **1042 days** (almost 3 years!)
- There are **807** distinct authors with "blameable" LOC (using `author_email` to measure distinctness)
- The file with the oldest average (mean) LOC is [`debian/prerm`](https://github.com/mongodb/mongo/blob/master/debian/prerm) 
- The file with the newest average (mean) LOC is [`src/mongo/db/s/README_routing_info_cache_consistency_model.md`](https://github.com/mongodb/mongo/blob/master/src/mongo/db/s/README_routing_info_cache_consistency_model.md)

![MongoDB Logo](MongoDB_ForestGreen.png)

Check our [getting started instructions](/mergestat/getting-started/running-locally/) to run these queries on your own data!

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

So for every line of code in a repo, we're able to access the author information (and commit hash, which can be joined with the `git_commits` table) about who *last modified* that line.

### What percent of code (by line) is each author "blameable" for?

Of all the lines of code in a repo, what percent of the code was last modified by each author:

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

This query tells us about how much code in a repo is directly attributable to what authors (where "attributable" means directly blameable - i.e. the author was the last to modify the line in some way).
This may tell us something about how much "impact" an author has on a codebase (at least in an aggregate view).

For example, authors directly attributable to more of the current code could be considered to be more knowledgeable about the project overall. Or, if an author has a relatively low ranking on this list, their impact on the project could be considered minimal (why has none of their contribution "stuck around" over time? Is their code frequently getting rewritten by others?).

This way of viewing the data could fall apart when:

- An author changes a lot of files with superficial changes (like by applying auto-fixes with a code linter). This alone would move the author's blameable line count up quite a bit, but it would be unfair to conclude that this author is extra *knowledgeable* about the code from that alone.
- There's a lot of old code in a project from an author who's no longer an active maintainer. This person may no longer be "knowledgeable," though they may have many lines still attributable to them.
- An author brings in a large amount of vendored (3rd party) code.

To account for some of these scenarios, we can tweak the above query to apply certain filters. For instance, let's limit our analysis to only certain *types* of files in a repo.

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

A query similar to the above could allow you to look only at blameable lines for certain directories as well.

### What's the average (mean) age of a line of code?

How long has it been since a line of code in our repo was last modified?
This may be an interesting way to measure the "staleness" of code in a project.
What's the age of most of our code?

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

Combining the two queries above, we can look at the relative age of code by author!

```sql
SELECT count(*), avg((extract(epoch FROM (SELECT (now() - author_when)))/86400)::int) AS avg_age_days, author_name FROM git_blame
JOIN repos on repos.id = git_blame.repo_id
WHERE repo = 'https://github.com/mergestat/mergestat'
GROUP BY author_name
ORDER BY count(*) DESC
```

This tells us something about how "relevant" certain authors remain in a codebase.
Do some authors have more recent code (on average) than others?

:::info Join our Slack

If you found this interesting, hop in our [**community Slack**](https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg)! We're always happy to chat about **MergeStat** there 🎉.

:::
