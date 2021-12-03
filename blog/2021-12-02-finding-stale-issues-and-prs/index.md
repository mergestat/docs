---
title: Finding Stale Issues and PRs ⌛
authors: [patrickdevivo]
tags: [mergestat, issues, prs, github]
---

Unanswered issues and pull requests on GitHub repos are no fun, especially if you're the one asking for help 🙂.
I've seen many projects making use of [automation](https://github.com/marketplace/stale) to close (or comment on) them, though folks have [argued against](https://drewdevault.com/2021/10/26/stalebot.html) that.

Regardless, *identifying* unanswered issues can be valuable, especially for maintainers to ensure they're addressing user concerns - or even for anyone looking for places to help.

You can use the **MergeStat [GitHub tables](/reference/github-tables)** to identify stale issues or PRs in a repo (or even across many repos).

:::info

**MergeStat** is an open-source tool for running SQL queries against git repositories and related data sources (like the GitHub API).
[**Check us out**](https://github.com/mergestat/mergestat) if you're not familiar.

:::

## Stale Issues

This will return the oldest 25 issues created more than 30 days ago, with no comments, that remain open.

```sql
SELECT
    title, author_login, comment_count, created_at, url
FROM github_repo_prs('uber-go/zap') -- replace with your repo
WHERE
    created_at < date('now', '-30 days') -- replace with how long you care about (https://www.sqlite.org/lang_datefunc.html)
    AND (merged = 0 OR closed = 0)
    AND comment_count = 0
ORDER BY created_at ASC
LIMIT 25
```

(see example [output](https://app.mergestat.com/w/public/query/q/39ba189c-6443-4f55-8986-71f68de56835))

## Stale PRs

```sql
SELECT
    title, author_login, comment_count, created_at, url
FROM github_repo_prs('mergestat/mergestat') -- replace with your repo
WHERE
    created_at < date('now', '-30 days') -- replace with how long you care about (https://www.sqlite.org/lang_datefunc.html)
    AND merged = 0
    AND closed = 0
    AND comment_count = 0
ORDER BY created_at ASC
LIMIT 25
```

:::note

You can run these queries either in the [**Public workspace**](https://app.mergestat.com/w/public) or by [**installing**](http://localhost:3000/getting-started-cli/installation) the CLI.
In either case you will need to supply a [GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for API authentication.

```bash
export GITHUB_TOKEN="my-github-token"
cat query.sql | mergestat -v
```

:::

## Considerations

1. Maybe `comment_count = 0` isn't good enough to indicate "staleness" - maybe finding issues/PRs where there are *only* comments from the original author, or where there are *no* comments from maintainers is more accurate.
2. The above queries can be joined with [`github_org_repos`](http://localhost:3000/reference/github-tables#github_user_repos-and-github_org_repos) to see stale PRs and issues *across an entire org*, not just in a single repo.
3. Maybe you could produce a dashboard (charts) to track issue staleness and alert on it - an SLA on issue response time?

If you're interested in exploring these use cases, feel free to [**come say hi on our Slack**](https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg) or shoot us a note on [**Twitter**](https://twitter.com/mergestat).