---
title: Summarizing A Week of PRs 📅
authors: [patrickdevivo]
tags: [mergestat, prs, github, workflow, audit]
---

When a project has more than a handful of regular contributors, it can be dificult to see a high level view of all the changes happening.
I've felt this recently, even in a codebase that went from just 1 to 3 contributors - there's a lot going on every day, and cutting through the noise to understand the cadence of *outward* value is difficult.

I've found that using [MergeStat](https://github.com/mergestat/mergestat) to summarize progress has been a useful way to achieve aspects of this.
For instance, simply knowing **what PRs have merged in the past 7 days** has been a valuable summary for us:

 ```sql
-- show me PRs that merged in the past 7 days
SELECT
    base_repository_name,
    title,
    number,
    url,
    author_login,
    created_at,
    merged_at
FROM (
    SELECT * FROM github_prs('mergestat/mergestat') UNION ALL -- replace with your repo
    SELECT * FROM github_prs('mergestat/another-repo') -- can be run across multiple repositories
)
WHERE
merged_at > date('now', '-7 days') -- replace with the time period you care about
AND merged = true
```

Pull Requests in this context are a sensible "unit of work" (for us) - whereas individual commits or files changed would be far too noisy.
This query can be modified to your needs and you can run it with our [CLI](https://github.com/mergestat/mergestat) or in the [web app](https://app.mergestat.com/).
It uses our [GitHub API integration](http://localhost:3000/reference/github-tables#github_repo_prs) (and will need an auth token).

**We run this query in a [weekly GitHub action](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#schedule) that reports the results to a Slack channel.**
It's been a cool way to automate a summary of work done across several of our key repositories.


:::info Join our Slack

We've recently launched a [**community Slack**](https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg) - feel free to stop in if you have questions or anything to share 🎉.

:::
