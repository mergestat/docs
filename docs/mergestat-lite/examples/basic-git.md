---
description: The following examples show simple mergestat-lite queries that make use of the git tables.
---
# Basic Git Queries

The following examples show simple queries that make use of the `git` tables.

### Listing `commits`

List all commits in the currently checked out history:

```sql
SELECT * FROM commits('https://github.com/mergestat/mergestat-lite')
```

We're specifying the HTTP git repo as an argument to the `commits` table-valued function, by passing it as the first parameter.
In the CLI, if you supply the `--repo` flag or if the current working directory is a git repo, `commits` (and other git tables) will use that repo instead.


```sql
SELECT * FROM commits -- repo is derived from context such as the --repo flag or the current directory
```

#### List all commits from a specific history

```sql
SELECT * FROM commits('', 'some-other-branch') -- list commits of a specific branch
SELECT * FROM commits('', 'COMMIT_SHA') -- list commits starting from a commit hash
```

Passing an empty string (`''`) as the first parameter to most `git` tables indicates that the default repository should be used (which is inferred from the context, such as the current directory or the `--repo` flag).
This can be necessary when an additional parameter is passed, but you want to infer the repository.

#### List all commits by a specific author

##### By email

```sql
-- All commits from authors with '@gmail.com' email addresses
SELECT * FROM commits('https://github.com/mergestat/mergestat-lite') WHERE author_email LIKE '%@gmail.com'
-- All commits from author with a specific email address
SELECT * FROM commits('https://github.com/mergestat/mergestat-lite') WHERE author_email = 'someone@example.com'
```

##### By name

```sql
SELECT * FROM commits('https://github.com/mergestat/mergestat-lite') WHERE author_name LIKE '%Patrick%'
```

### Listing `refs`

See [here](https://git-scm.com/book/en/v2/Git-Internals-Git-References) for more context on git references.

```sql
SELECT * FROM refs('https://github.com/mergestat/mergestat-lite')
```

####  Branches only

```sql
SELECT * FROM refs('https://github.com/mergestat/mergestat-lite')
WHERE type = 'branch'
```

```sql
-- select all branches and the timestamp of their last commit
SELECT refs.name, author_when
FROM refs, commits
WHERE type = 'branch' AND commits.hash = refs.hash
```

#### Tags only

```sql
SELECT * FROM refs('https://github.com/mergestat/mergestat-lite')
WHERE type = 'tag'
```

```sql
-- version tags only
SELECT * FROM refs('https://github.com/mergestat/mergestat-lite')
WHERE type = 'tag' AND name LIKE 'v%'
```

### Listing `files`

The [`files`](/mergestat-lite/reference/git-tables#files) table valued function lists all the files **in a given commit tree**.
It can be *joined* with the `commits` table to traverse the files in the history of a repository, across many commits.

```sql
SELECT * FROM files('https://github.com/mergestat/mergestat-lite')
LIMIT 10
```

:::note

This can be an expensive query if `*` is used, as the `contents` columns contains the full contents of a file.
This can cause problems in memory constrained execution environments, especially if you're returning many files over many commits.

:::


#### List all file paths in all commits

```sql
-- second parameter indicates what commit tree to list files from
SELECT commits.hash, files.path FROM commits, files('', commits.hash)
```

<!-- TODO(patrickdevivo) stats table -->
<!-- TODO(patrickdevivo) blame table -->
