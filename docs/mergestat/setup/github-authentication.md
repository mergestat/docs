---
description: Documentation for GitHub authentication requirements in MergeStat.
---
# GitHub Authentication

In order to:

1. Sync data from private GitHub repositories
2. Automatically import repos from a GitHub org
3. Run any sync that uses the GitHub API

You will need to authenticate your  GitHub **Git Source**.
Currently, the only supported authentication mechanism is with a classic [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (though we are working on alternatives).

![Create a GitHub PAT in GitHub](github-pat-scopes.jpg)

You may set the GitHub authentication on the detail view of a GitHub **Git Source**.

![Set a GitHub PAT for a Git Source](setting-github-pat.jpg)

## Sync Types

### Without a Github PAT

If you *do not* supply a GitHub PAT, the following sync types will work or not work, depending on if the repo is public or private:

|Sync Type           |Public Repo|Private Repo|
|--------------------|-----------|------------|
|[`git-blame`](https://github.com/mergestat/syncs/tree/main/syncs/git-blame)           |✅          |❌           |
|[`git-commits`](https://github.com/mergestat/syncs/tree/main/syncs/git-commits)         |✅          |❌           |
|[`git-commit-stats`](https://github.com/mergestat/syncs/tree/main/syncs/git-commit-stats)    |✅          |❌           |
|[`git-files`](https://github.com/mergestat/syncs/tree/main/syncs/git-files)           |✅          |❌           |
|[`git-refs`](https://github.com/mergestat/syncs/tree/main/syncs/git-refs)            |✅          |❌           |
|[`github-pull-request-commits`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-request-commits)   |❌          |❌           |
|[`github-pull-request-reviews`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-request-reviews)   |❌          |❌           |
|[`github-issues`](https://github.com/mergestat/syncs/tree/main/syncs/github-issues)  |❌          |❌           |
|[`github-repo-info`](https://github.com/mergestat/syncs/tree/main/syncs/github-repo-info)|❌          |❌           |
|[`github-pull-requests`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-requests)     |❌          |❌           |
|[`github-repo-stargazers`](https://github.com/mergestat/syncs/tree/main/syncs/github-repo-stargazers)   |❌          |❌           |
|[`scan-syft`](https://github.com/mergestat/syncs/tree/main/syncs/scan-syft)      |✅          |❌           |
|[`scan-trivy`](https://github.com/mergestat/syncs/tree/main/syncs/scan-trivy)     |✅          |❌           |
|[`scan-yelp-detect-secrets`](https://github.com/mergestat/syncs/tree/main/syncs/scan-yelp-detect-secrets)     |✅          |❌           |
|[`scan-gosec`](https://github.com/mergestat/syncs/tree/main/syncs/scan-gosec)     |✅          |❌           |
|[`scan-gitleaks`](https://github.com/mergestat/syncs/tree/main/syncs/scan-gitleaks)     |✅          |❌           |


### With a GitHub PAT

If you *do* supply a GitHub PAT, the following sync types will work with no scopes (✅) or with some required scopes (✴️):

|Sync Type           |Public Repo|Private Repo|Required Scopes for a Public Repo |Required Scopes for a Private Repo |
|--------------------|-----------|------------|-----------------------|----------------------------------|
|[`git-blame`](https://github.com/mergestat/syncs/tree/main/syncs/git-blame)           |✅          |✴️          |-                      |`repo`                              |
|[`git-commits`](https://github.com/mergestat/syncs/tree/main/syncs/git-commits)         |✅          |✴️          |-                      |`repo`                              |
|[`git-commit-stats`](https://github.com/mergestat/syncs/tree/main/syncs/git-commit-stats)    |✅          |✴️          |-                      |`repo`                              |
|[`git-files`](https://github.com/mergestat/syncs/tree/main/syncs/git-files)           |✅          |✴️          |-                      |`repo`                              |
|[`github-pull-request-commits`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-request-commits)   |✅          |✴️          |-                      |`repo`                              |
|[`github-pull-request-reviews`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-request-reviews)   |✅          |✴️          |-                      |`repo`                              |
|[`github-issues`](https://github.com/mergestat/syncs/tree/main/syncs/github-issues)  |✅          |✴️          |-                      |`repo`                              |
|[`github-repo-info`](https://github.com/mergestat/syncs/tree/main/syncs/github-repo-info)|✅          |✴️          |-                      |`repo`                              |
|[`github-pull-requests`](https://github.com/mergestat/syncs/tree/main/syncs/github-pull-requests)     |✅          |✴️          |-                      |`repo`                              |
|[`github-repo-stargazers`](https://github.com/mergestat/syncs/tree/main/syncs/github-repo-stargazers)   |✴️         |✴️          |`user:email` OR `read:user`|(`user:email` OR `read:user`) AND `repo`|
|[`git-refs`](https://github.com/mergestat/syncs/tree/main/syncs/git-refs)            |✅          |✴️          |-                      |`repo`                              |
|[`scan-syft`](https://github.com/mergestat/syncs/tree/main/syncs/scan-syft)      |✅          |✴️          |-                      |`repo`                              |
|[`scan-trivy`](https://github.com/mergestat/syncs/tree/main/syncs/scan-trivy)     |✅          |✴️          |-                      |`repo`                              |


## Repo Auto Imports

Learn more about repo auto imports [here](repo-auto-imports).

|                    |No GitHub PAT|With GitHub PAT|Required Scopes        |
|--------------------|-------------|---------------|-----------------------|
|Org                 |✅            |✴️             |read:org               |
|User                |✅            |✅              |-                      |
