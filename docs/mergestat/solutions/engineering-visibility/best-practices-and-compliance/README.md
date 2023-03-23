---
description: MergeStat can be used to ensure best practices are followed in an engineering organization.
image: ./code_quality_2x-xkcd.png
---

# Best Practices & Compliance

Software development can be pretty chaotic 🙂.
Keeping tabs on all of the frameworks, linters, dependencies, patterns (anti-patterns), best practices, compliance needs...and generally the sprawl of *behaviors* and *tools* across an organization can be overwhelming.
This problem compounds at larger orgs, where there's more code, more people, and more tools!

[![xkcd code quality comic](code_quality_2x-xkcd.png)](https://xkcd.com/1513/)
*https://xkcd.com/1513/*

[MergeStat](https://github.com/mergestat/mergestat) makes it possible to treat code *as data*, in our mission to make it possible to *query* anything involved in building and shipping software with SQL.

A common way teams use MergeStat is to report on the adoption of best practices and compliance needs *across* an engineering organization (over many teams, codebases and tools).
This page is a collection of examples we've encountered so far.

## Which repos *don't* have CI/CD setup?

Show all repos that *do not* have a GitHub Action pipeline configured.

```sql
SELECT repo, path FROM repos
LEFT JOIN git_files
ON (git_files.repo_id = repos.id AND path ILIKE '.github/workflows/%')
WHERE path IS NULL
```

Similarly for CircleCI:

```sql
SELECT repo, path FROM repos
LEFT JOIN git_files
ON (git_files.repo_id = repos.id AND path ILIKE '.circleci/%')
WHERE path IS NULL
```

Or for Buildkite:

```sql
SELECT repo, path FROM repos
LEFT JOIN git_files
ON (git_files.repo_id = repos.id AND path ILIKE 'pipeline.yaml' OR path ILIKE 'pipeline.yml')
WHERE path IS NULL
```

The **inverse** could also be valuable.
Which codebases **do have** CI/CD configured:

```sql
SELECT repo FROM repos
JOIN git_files
ON (git_files.repo_id = repos.id)
WHERE path ILIKE '.github/workflows/%'
GROUP BY repo
```

## Which repos *don't* have a `CODEOWNERS` file?

List all repos missing a `CODEOWNERS` file:

```sql
SELECT repo, path FROM repos
LEFT JOIN git_files
ON (git_files.repo_id = repos.id AND path ILIKE '%CODEOWNERS')
WHERE path IS NULL
```

Get counts for how many repos have a `CODEOWNERS` file vs don't:

```sql
SELECT
    count(*) FILTER (WHERE path IS NULL) AS repos_without_codeowners,
    count(*) FILTER (WHERE path IS NOT NULL) AS repos_with_codeowners
FROM repos
LEFT JOIN git_files
ON (git_files.repo_id = repos.id AND path ILIKE '%CODEOWNERS')
```

## How many PRs are being merged without a review?

Show me *all* GitHub Pull Requests that have been merged without an explicit approval:

```sql
SELECT * FROM github_pull_requests
WHERE merged AND (review_decision IS NULL OR review_decision = 'REVIEW_REQUIRED')
```

Filter it down to PRs merged within the last month:

```sql
SELECT * FROM github_pull_requests
WHERE merged AND (review_decision IS NULL OR review_decision = 'REVIEW_REQUIRED')
AND merged_at > (now() - '1 month'::interval)
```

Now `GROUP BY` repo to show which projects have the most merged, unreviewed PRs:

```sql
SELECT base_repository_name, count(*) FROM github_pull_requests
WHERE merged AND (review_decision IS NULL OR review_decision = 'REVIEW_REQUIRED')
AND merged_at > (now() - '1 month'::interval)
GROUP BY base_repository_name
ORDER BY count(*) DESC
```

Now count by the PR author instead:

```sql
SELECT author_login, count(*) FROM github_pull_requests
WHERE merged AND (review_decision IS NULL OR review_decision = 'REVIEW_REQUIRED')
AND merged_at > (now() - '1 month'::interval)
GROUP BY author_login
ORDER BY count(*) DESC
```

## Which PRs are too big?

Large PRs (where there are a lot of code changes) are typically an anti-pattern.
These code changes can be harder to understand and therefore review, which may lead to issues being overlooked.

Show me all PRs merged in the last 3 months that modified more than 20 files:

```sql
SELECT * FROM github_pull_requests
WHERE merged
AND merged_at > (now() - '3 months'::interval)
AND changed_files > 20
```

## Which PRs are taking too long to merge?

A PR that's been open for a long time can be considered an anti-pattern, or at least something worth investigating.

Show me all PRs merged in the last 3 months that took longer than 5 days to merge (from when it was first opened):

```sql
SELECT merged_at - created_at, * FROM github_pull_requests
WHERE merged
AND merged_at > (now() - '3 months'::interval)
AND (merged_at - created_at) > '5 days'::interval
```
