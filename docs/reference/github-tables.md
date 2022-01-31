---
sidebar_position: 3
---

# GitHub API

You can use `mergestat` to query the [GitHub API (v4)](https://docs.github.com/en/graphql).
Constraints in your SQL query are pushed to the GitHub API as much as possible.
For instance, if your query includes an `ORDER BY` clause and if items can be ordered in the GitHub API response (on the specified column), your query can avoid doing a full table scan and rely on the ordering returned by the API.

## Authenticating

You must provide an authentication token in order to use the GitHub API tables.
You can create a personal access token [following these instructions](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
`mergestat` will look for a `GITHUB_TOKEN` environment variable when executing, to use for authentication.
This is also true if running as a runtime loadable extension.

## Rate Limiting

All API requests to GitHub are [rate limited](https://docs.github.com/en/graphql/overview/resource-limitations#rate-limit).
The following tables make use of the GitHub GraphQL API (v4), which rate limits additionally based on the "complexity" of GraphQL queries.
Generally speaking, the more fields/relations in your GraphQL query, the higher the "cost" of a single API request, and the faster you may reach a rate limit.
Depending on your SQL query, it's hard to know ahead of time what a good client-side rate limit is.
By default, each of the tables below will fetch **100 items per page** and permit **2 API requests per second**.
You can override both of these parameters by setting the following environment variables:

1. `GITHUB_PER_PAGE` - expects an integer between 1 and 100, sets how many items are fetched per-page in API calls that paginate results.
2. `GITHUB_RATE_LIMIT` - expressed in the form `(number of requests) / (number of seconds)` (i.e. `1/3` means at most 1 request per 3 seconds)

If you encounter a rate limit error that looks like `You have exceeded a secondary rate limit`, consider setting the `GITHUB_PER_PAGE` value to a lower number.
If you have a large number of items to scan in your query, it may take longer, but you should avoid hitting a rate limit error.

## `github_stargazers`

Table-valued-function that returns a list of users who have starred a repository.

| Column     | Type     |
|------------|----------|
| login      | TEXT     |
| email      | TEXT     |
| name       | TEXT     |
| bio        | TEXT     |
| company    | TEXT     |
| avatar_url | TEXT     |
| created_at | DATETIME |
| updated_at | DATETIME |
| twitter    | TEXT     |
| website    | TEXT     |
| location   | TEXT     |
| starred_at | DATETIME |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT * FROM github_stargazers('mergestat', 'mergestat');
SELECT * FROM github_stargazers('mergestat/mergestat'); -- both are equivalent
```

## `github_starred_repos`

Table-valued-function that returns a list of repositories a user has starred.

| Column          | Type     |
|-----------------|----------|
| name            | TEXT     |
| url             | TEXT     |
| description     | TEXT     |
| created_at      | DATETIME |
| pushed_at       | DATETIME |
| updated_at      | DATETIME |
| stargazer_count | INT      |
| name_with_owner | TEXT     |
| starred_at      | DATETIME |

Params:
  1. `login` - the `login` of a GitHub user

```sql
SELECT * FROM github_starred_repos('patrickdevivo')
```

## `github_stargazer_count`

Scalar function that returns the number of stars a GitHub repository has.

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT github_stargazer_count('mergestat', 'mergestat');
SELECT github_stargazer_count('mergestat/mergestat'); -- both are equivalent
```

## `github_user`

Scalar function that returns information about a GitHub user as JSON.

Params:
  1. `login` - the user's login

```sql
SELECT github_user('patrickdevivo');
```

## `github_user_repos` and `github_org_repos`

Table-valued function that returns all the repositories belonging to a user or an organization.

| Column                      | Type     |
|-----------------------------|----------|
| created_at                  | DATETIME |
| database_id                 | INT      |
| default_branch_ref_name     | TEXT     |
| default_branch_ref_prefix   | TEXT     |
| description                 | TEXT     |
| disk_usage                  | INT      |
| fork_count                  | INT      |
| homepage_url                | TEXT     |
| is_archived                 | BOOLEAN  |
| is_disabled                 | BOOLEAN  |
| is_fork                     | BOOLEAN  |
| is_mirror                   | BOOLEAN  |
| is_private                  | BOOLEAN  |
| issue_count                 | INT      |
| latest_release_author       | TEXT     |
| latest_release_created_at   | DATETIME |
| latest_release_name         | TEXT     |
| latest_release_published_at | DATETIME |
| license_key                 | TEXT     |
| license_name                | TEXT     |
| name                        | TEXT     |
| open_graph_image_url        | TEXT     |
| primary_language            | TEXT     |
| pull_request_count          | INT      |
| pushed_at                   | DATETIME |
| release_count               | INT      |
| stargazer_count             | INT      |
| topics                      | JSON     |
| updated_at                  | DATETIME |
| watcher_count               | INT      |

Params:
  1. `login` - the `login` of a GitHub user or organization
  2. `affiliations` - a comma-separated list of [repository affiliations](https://docs.github.com/en/graphql/reference/enums#repositoryaffiliation). Can be: `OWNER`, `COLLABORATOR` or `ORGANIZATION_MEMBER`

```sql
SELECT * FROM github_user_repos('patrickdevivo')
SELECT * FROM github_org_repos('mergestat')
SELECT * FROM github_user_repos('patrickdevivo', 'OWNER')
SELECT * FROM github_org_repos('mergestat', 'OWNER,COLLABORATOR')
```

## `github_repo_issues`

Table-valued-function that returns all the issues of a GitHub repository.

| Column                | Type      |
|-----------------------|-----------|
| owner                 | TEXT      |
| reponame              | TEXT      |
| author_login          | TEXT      |
| body                  | TEXT      |
| closed                | BOOLEAN   |
| closed_at             | DATETIME  |
| comment_count         | INT       |
| created_at            | DATETIME  |
| created_via_email     | BOOLEAN   |
| database_id           | TEXT      |
| editor_login          | TEXT      |
| includes_created_edit | BOOLEAN   |
| label_count           | INT       |
| last_edited_at        | DATETIME  |
| locked                | BOOLEAN   |
| milestone_count       | INT       |
| number                | INT       |
| participant_count     | INT       |
| published_at          | DATETIME  |
| reaction_count        | INT       |
| state                 | TEXT      |
| title                 | TEXT      |
| updated_at            | DATETIME  |
| url                   | TEXT      |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT * FROM github_repo_issues('mergestat/mergestat');
SELECT * FROM github_repo_issues('mergestat', 'mergestat'); -- both are equivalent
```
## `github_repo_prs`

Table-valued-function that returns all the pull requests of a GitHub repository.

| Column                   | Type     |
|--------------------------|----------|
| additions                | INT      |
| author_login             | TEXT     |
| author_association       | TEXT     |
| author_avatar_url        | TEXT     |
| author_name              | TEXT     |
| base_ref_oid             | TEXT     |
| base_ref_name            | TEXT     |
| base_repository_name     | TEXT     |
| body                     | TEXT     |
| changed_files            | INT      |
| closed                   | BOOLEAN  |
| closed_at                | DATETIME |
| comment_count            | INT      |
| commit_count             | INT      |
| created_at               | TEXT     |
| created_via_email        | BOOLEAN  |
| database_id              | INT      |
| deletions                | INT      |
| editor_login             | TEXT     |
| head_ref_name            | TEXT     |
| head_ref_oid             | TEXT     |
| head_repository_name     | TEXT     |
| is_draft                 | INT      |
| label_count              | INT      |
| last_edited_at           | DATETIME |
| locked                   | BOOLEAN  |
| maintainer_can_modify    | BOOLEAN  |
| mergeable                | TEXT     |
| merged                   | BOOLEAN  |
| merged_at                | DATETIME |
| merged_by                | TEXT     |
| number                   | INT      |
| participant_count        | INT      |
| published_at             | DATETIME |
| review_decision          | TEXT     |
| state                    | TEXT     |
| title                    | TEXT     |
| updated_at               | DATETIME |
| url                      | TEXT     |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT * FROM github_repo_prs('mergestat/mergestat');
SELECT * FROM github_repo_prs('mergestat', 'mergestat'); -- both are equivalent
```

## `github_repo_branches`

Table-valued-function that returns branch information from a GitHub repository.

| Column                           | Type     |
|----------------------------------|----------|
| owner                            | TEXT     |
| repo_name                        | TEXT     |
| name                             | TEXT     |
| author_name                      | TEXT     |
| author_email                     | TEXT     |
| commit_hash                      | TEXT     |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT * FROM github_repo_branches('mergestat', 'mergestat');
SELECT * FROM github_repo_branches('mergestat/mergestat');
```

## `github_repo_branch_protections`

Table-valued-function that returns all the branch protection rules set on a GitHub repository (requires GitHub access token to have admin privileges).

| Column                           | Type     |
|----------------------------------|----------|
| allow_deletions                  | BOOLEAN  |
| allows_force_pushes              | BOOLEAN  |
| creator_login                    | TEXT     |
| database_id                      | INT      |
| dismisses_stale_reviews          | BOOLEAN  |
| is_admin_enforced                | BOOLEAN  |
| pattern                          | TEXT     |
| required_approving_review_count  | INT      |
| required_status_check_contexts   | BOOLEAN  |
| requires_approving_reviews       | DATETIME |
| requires_code_owners_reviews     | BOOLEAN  |
| requires_commit_signature        | BOOLEAN  |
| requires_conversation_resolution | BOOLEAN  |
| requires_linear_history          | BOOLEAN  |
| requires_status_checks           | BOOLEAN  |
| requires_strict_status_checks    | BOOLEAN  |
| restricts_pushes                 | BOOLEAN  |
| restricts_review_dismissal       | BOOLEAN  |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo

```sql
SELECT * FROM github_repo_branch_protections('mergestat/mergestat');
SELECT * FROM github_repo_branch_protections('mergestat', 'mergestat');
SELECT * FROM github_branch_protections('mergestat/mergestat');
SELECT * FROM github_branch_protections('mergestat', 'mergestat'); -- all are equivalent
```

## `github_repo_file_content`

Scalar function that returns the contents of a file in a GitHub repository

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo
  3. `expression` - either a simple file path (`README.md`) or a rev-parse suitable expression that includes a path (`HEAD:README.md` or `<some-sha>:README.md`)

```sql
SELECT github_stargazer_count('mergestat', 'mergestat', 'README.md');
SELECT github_stargazer_count('mergestat/mergestat', 'README.md'); -- both are equivalent
```

## `github_repo_issue_comments`

Table valued function that returns comments on a given issue.

| Column                       | Type |
|------------------------------|------|
| author_login                 | TEXT |
| author_url                   | TEXT |
| body                         | TEXT |
| created_at                   | TEXT |
| database_id                  | INT  |
| id                           | TEXT |
| updated_at                   | TEXT |
| url                          | TEXT |
| issue_id                     | TEXT |
| issue_number                 | INT  |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo
  3. `issue_number` - the issue number

```sql
SELECT github_repo_issue_comments('mergestat/mergestat', 100);
SELECT github_issue_comments('mergestat/mergestat', 100);
```

## `github_repo_pr_comments`

Table valued function that returns all comments on a given pull request.

| Column                     | Type |
|----------------------------|------|
| author_login               | TEXT |
| author_url                 | TEXT |
| body                       | TEXT |
| created_at                 | TEXT |
| database_id                | INT  |
| id                         | TEXT |
| updated_at                 | TEXT |
| url                        | TEXT |
| pr_id                      | TEXT |
| pr_number                  | INT  |

Params:
  1. `fullNameOrOwner` - either the full repo name `mergestat/mergestat` or just the owner `mergestat` (which would require the second argument)
  2. `name` - optional if the first argument is a "full" name, otherwise required - the name of the repo
  3. `number` - the pull request number to pull comments from

```sql
SELECT github_repo_pr_comments('mergestat/mergestat', 200);
SELECT github_repo_pr_comments('mergestat', 'mergestat', 200);
SELECT github_pr_comments('mergestat/mergestat', 200);
SELECT github_pr_comments('mergestat',' mergestat', 200);
```