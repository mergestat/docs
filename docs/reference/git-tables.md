---
sidebar_position: 1
---

# Git Repositories

The following tables access a git repository in the current directory by default.
If the `--repo` flag is specified, they will use the path provided there instead.
A parameter (usually the first) can also be provided to any of the tables below to override the default repo path.
For instance, `SELECT * FROM commits('https://github.com/mergestat/mergestat')` will clone this repo to a temporary directory on disk and return its commits.

## `commits`

Similar to `git log`, the `commits` table includes all commits in the history of the currently checked out commit.

| Column          | Type     |
|-----------------|----------|
| hash            | TEXT     |
| message         | TEXT     |
| author_name     | TEXT     |
| author_email    | TEXT     |
| author_when     | DATETIME |
| committer_name  | TEXT     |
| committer_email | TEXT     |
| committer_when  | DATETIME |
| parents         | INT      |

Params:
  1. `repository` - path to a local (on disk) or remote (http(s)) repository
  2. `rev` - return commits starting at this revision (i.e. branch name or SHA), defaults to `HEAD`

```sql
-- return all commits starting at HEAD
SELECT * FROM commits

-- specify an alternative repo on disk
SELECT * FROM commits('/some/path/to/repo')

-- clone a remote repo and use it
SELECT * FROM commits('https://github.com/mergestat/mergestat')

-- use the default repo, but provide an alternate branch/ref
-- list available refs and branches with `SELECT * FROM refs('https://github.com/mergestat/mergestat')`
SELECT * FROM commits('', 'some-ref')
```

## `refs`

Similar to `git-show-ref`, the `refs` table includes all git references available in a selected repository.

| Column    | Type |
|-----------|------|
| name      | TEXT |
| type      | TEXT |
| remote    | TEXT |
| full_name | TEXT |
| hash      | TEXT |
| target    | TEXT |

Params:
  1. `repository` - path to a local (on disk) or remote (http(s)) repository

```sql
-- return all refs available in a repo
SELECT * FROM refs('https://github.com/mergestat/mergestat')
```

## `stats`

| Column    | Type |
|-----------|------|
| file_path | TEXT |
| additions | INT  |
| deletions | INT  |

Params:
  1. `repository` - path to a local (on disk) or remote (http(s)) repository
  2. `rev` - commit hash (or branch/tag name) to use for retrieving stats, defaults to `HEAD`
  3. `to_rev` - commit hash to calculate stats relative to

```sql
-- return stats of HEAD
SELECT * FROM stats

-- return stats of a specific commit
SELECT * FROM stats('', 'COMMIT_HASH')

-- return stats for every commit in the current history
SELECT commits.hash, stats.* FROM commits, stats('', commits.hash)
```

## `files`

| Column     | Type |
|------------|------|
| path       | TEXT |
| executable | BOOL |
| contents   | TEXT |

Params:
  1. `repository` - path to a local (on disk) or remote (http(s)) repository
  2. `rev` - commit hash (or branch/tag name) to use for retrieving files in, defaults to `HEAD`

:::note

Queries of files can be an expensive if `*` is used, as the `contents` columns contains the full contents of a file.
This can cause problems in memory constrained execution environments, especially if you're returning many files over many commits.

:::

```sql
-- return the attributes of two files
SELECT * FROM files
LIMIT 2

-- return the file paths modified in individual commits
SELECT files.path, commits.hash FROM commits, files('', commits.hash)
LIMIT 10
```

## `blame`

Similar to `git blame`, the `blame` table includes blame information for all files in the current HEAD.

| Column      | Type     |
|-------------|----------|
| line_no     | INT      |
| commit_hash | TEXT     |

Params:
  1. `repository` - path to a local (on disk) or remote (http(s)) repository
  2. `rev` - commit hash (or branch/tag name) to use for retrieving blame information from, defaults to `HEAD`
  3. `file_path` - path of file to blame

```sql
-- return blame information for the first 10 lines of the file `README.md`
SELECT * FROM blame('', 'HEAD', 'README.md')
LIMIT 10

-- return blame information for lines of files in the repository
SELECT files.path, blame.line_no, blame.commit_hash FROM files, blame('', 'HEAD', files.path)
LIMIT 10
```
