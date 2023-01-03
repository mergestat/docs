---
title: Finding Code Hotspots in Git Repositories 🔥
authors: [patrickdevivo]
description: How to identify hotspots in your codebase using MergeStat.
image: mergestat-example.jpg
tags: [mergestat, sql, mergestat-lite, hotspots, code, git]
---

# Finding Code Hotspots in Git Repositories 🔥

Recently, I came across [this tweet](https://twitter.com/nicoespeon/status/1605586911900438528) from [Nicolas Carlo](https://understandlegacycode.com/):


[![Nicolas Carlo tweet about finding hotspots in a git repo](tweet.jpg)](https://twitter.com/nicoespeon/status/1605586911900438528)

Finding hotspots in a (git) codebase can be surfaced with the following:

```sh
git log --format=format: --name-only --since=12.month \
 | egrep -v '^$' \
 | sort \
 | uniq -c \
 | sort -nr \
 | head -50
```

This [defines](https://understandlegacycode.com/blog/focus-refactoring-with-hotspots-analysis/#calculate-the-churn-score-of-each-file) hotspots as the files most frequently modified in the last year (by number of commits).

This bash script looks a lot like what both [MergeStat](https://github.com/mergestat/mergestat) and [MergeStat Lite](https://github.com/mergestat/mergestat-lite) can surface, but using SQL 🎉!

## MergeStat Lite Example

[MergeStat Lite](https://github.com/mergestat/mergestat-lite) (our CLI) can be run against a git repo on disk to surface the same set of file paths:

```sql
select
    file_path, count(*)
from commits, stats('', commits.hash)
where commits.author_when > date('now', '-12 month')
and commits.parents < 2 -- ignore merge commits
group by file_path
order by count(*) desc
limit 50
```

[![Screenshot of MergeStat Lite Example](mergestat-lite-example.jpg)](https://github.com/mergestat/mergestat-lite)


## MergeStat Example

[MergeStat](https://github.com/mergestat/mergestat) can be used to surface this list as well:

```sql
select file_path, count(*)
from git_commits join git_commit_stats on (git_commits.repo_id = git_commit_stats.repo_id and git_commits.hash = git_commit_stats.commit_hash)
join repos on git_commits.repo_id = repos.id
where repo like '%mergestat/mergestat' -- limit to a specific repo
and git_commits.parents < 2
and author_when > now() - '1 year'::interval
group by file_path
order by count(*) desc
limit 50
```

[![Screenshot of MergeStat Example](mergestat-example.jpg)](https://github.com/mergestat/mergestat)

## Why bother?

As Nicolas Carlo points out, identifying hotspots in a codebase is an effective way to determine which files are worth examining as candidates for refactor.
