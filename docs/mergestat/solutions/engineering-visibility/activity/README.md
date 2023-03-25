---
description: MergeStat can be used to analyze git activity in an engineering organization.
image: ./rel-repo-activity.jpg
---

# Activity Analysis

Git history is a powerful place to look for anyone seeking to better understand code-related activities in an engineering organization.
Commit history is a high-fidelity view into the *actual* behaviors and patterns of teams, as it's directly tied to an output of engineering organizations (code).

[MergeStat](https://github.com/mergestat/mergestat) can be used to analyze git activity for various purposes.

- How frequently are we merging into `main`? (As a proxy for how effective we are at shipping code)
- Who are the "experts" in certain repos or parts of a codebase? (So we know who to target for questions)
- What parts of a project are seeing a lot of recent change (churn)? (Does this reflect a current feature initiative or do we have a flaky area in our codebase?)
- What are trends in our coding activities over time?
- How much (relative) effort is spent on what projects or parts of a codebase?
- How much (relative) effort is spent on refactoring old code vs writing new code?
- etc..

**If it's a question with an answer encoded in git history, MergeStat should be able to answer it!**

## Git Activity

By looking *only* at git commits (and associated *file changes*), we can answer some interesting questions.
MergeStat makes this *raw* data accessible through SQL for ad-hoc querying.
In addition, tools such as [dbt](https://www.getdbt.com/) can be used to define models on top of this raw data for easier use in downstream reporting and analytics.

We maintain [**this dbt project**](https://github.com/mergestat/mergestat-git-dbt) to showcase how raw git commit activity data can be turned into rollups and metrics for an analysis on the git activity of an engineering org.

[![Relatative repo activity](rel-repo-activity.jpg)](rel-repo-activity.jpg)

:::info More on the Way!

We're putting together more examples of how git activity can be used to extract valuable insights about an engineering organization.
Stay tuned for more!

:::

### Active Contributors

It can be important to know how many **active contributors** a project has:

- Many SaaS products charge based on the number of "active developers" (number of people who've committed code within a time window).
- An evaluation of the *health* of an open-source or internal codebase should take into account the number of recent contributors. This can be a proxy for how maintained a codebase is.
- Finding *who* the most recent contributors are to a project is a useful way to identify the right people to contact with questions.

#### Show the monthly count of unique authors (by email)

```sql
SELECT
    date_trunc('month', author_when),
    count(distinct author_email)
FROM git_commits
JOIN repos ON repos.id = git_commits.repo_id
-- WHERE repo LIKE '...' -- uncomment to filter by repo
GROUP BY 1
ORDER BY 1 DESC
```

#### Show a list of authors in the last 90 days

```sql
SELECT
    DISTINCT(author_email),
    author_name
FROM git_commits
JOIN repos ON repos.id = git_commits.repo_id
WHERE author_when > now() - '90 days'::interval
```
