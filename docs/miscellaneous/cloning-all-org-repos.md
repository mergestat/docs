# Clone Multiple Repos to Disk

The `--clone-dir` option of the CLI allows users to specify a local directory to use when cloning repositories (either via `http(s)` or `ssh`) during query execution.
This makes it possible, and quite easy, to run a command to **clone *all* the repositories of a GitHub organization to a local directory**.
We make use of the GitHub API to retrieve a list of the repositories we'd like to clone, and call a special `clone` scalar function to copy the remote repository to disk.

This can be useful for anyone looking to back-up all repositories belong to an organization, or run a script that acts on multiple repositories on disk.

For instance, this SQL:

```sql
-- Clone all git repositories in the mergestat GitHub org to disk
SELECT clone('https://github.com/mergestat/'|| name) AS path FROM github_org_repos('mergestat')
```

Can be run in the CLI like so:

```bash
mergestat "SELECT clone('https://github.com/mergestat/'|| name) AS path FROM github_org_repos('mergestat')" -v --clone-dir my-dir
```

In order to clone all `mergestat` GitHub repos to a local directory called `my-dir`.

:::info

Remember to supply the `--clone-dir` flag, otherwise the repos will be cloned into temporary directories in your file-system.
Note that you will also need to supply the `GITHUB_TOKEN` environment variable, since these queries make use of the GitHub API to list repositories to clone.

:::

## Advantages

This approach can be a better alternative to patching together ad-hoc scripts to accomplish the same outcome.

1. GitHub API pagination is handled for you
2. [GitHub API rate limiting](https://docs.mergestat.com/reference/github-tables#rate-limiting) is handled, and can be controlled if necessary
3. Arbitrary filters (or UNIONS) can be expressed in SQL, to specify arbitrary sets of repos

## Examples

### Clone all user repos

```sql
SELECT clone('https://github.com/patrickdevivo/'|| name) AS path FROM github_user_repos('patrickdevivo')
```

### Clone using `ssh`

```sql
SELECT clone('ssh://git@github.com:mergestat/'|| name) AS path FROM github_org_repos('mergestat')
```

### Clone only `golang` repos

```sql
SELECT clone('https://github.com/mergestat/'|| name) AS path FROM github_org_repos('mergestat')
WHERE primary_language = 'Go'
```

### Clone repos across multiple owners

```sql
SELECT clone('https://github.com/' || owner || '/' || name) AS path FROM (
    SELECT 'mergestat' AS owner, name FROM github_org_repos('mergestat') LIMIT 5
    UNION ALL
    SELECT 'patrickdevivo' AS owner, name FROM github_user_repos('patrickdevivo') LIMIT 5
)
```
