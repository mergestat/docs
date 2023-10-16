---
sidebar_position: 8
description: Schema for the MergeStat github_pull_request_commits table.
---

# github_pull_request_commits

```sql
CREATE TABLE 
    github_pull_request_commits 
    ( 
        repo_id UUID NOT NULL, 
        pr_number            INTEGER NOT NULL, 
        hash                 TEXT NOT NULL, 
        MESSAGE              TEXT, 
        author_name          TEXT, 
        author_email         TEXT, 
        author_when          TIMESTAMP(6) WITH TIME ZONE, 
        committer_name       TEXT, 
        committer_email      TEXT, 
        committer_when       TIMESTAMP(6) WITH TIME ZONE, 
        additions            INTEGER, 
        deletions            INTEGER, 
        changed_files        INTEGER, 
        url                  TEXT, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, pr_number, hash), 
        CONSTRAINT request_commits_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE github_pull_request_commits IS 'commits for all pull requests of a GitHub repo';
COMMENT ON COLUMN github_pull_request_commits.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_pull_request_commits.pr_number IS 'GitHub pull request number of the commit';
COMMENT ON COLUMN github_pull_request_commits.hash IS 'hash of the commit';
COMMENT ON COLUMN github_pull_request_commits.message IS 'message of the commit';
COMMENT ON COLUMN github_pull_request_commits.author_name IS 'name of the author of the the modification';
COMMENT ON COLUMN github_pull_request_commits.author_email IS 'email of the author of the modification';
COMMENT ON COLUMN github_pull_request_commits.author_when IS 'timestamp of when the modification was authored';
COMMENT ON COLUMN github_pull_request_commits.committer_name IS 'name of the author who committed the modification';
COMMENT ON COLUMN github_pull_request_commits.committer_email IS 'email of the author who committed the modification';
COMMENT ON COLUMN github_pull_request_commits.committer_when IS 'timestamp of when the commit was made';
COMMENT ON COLUMN github_pull_request_commits.additions IS 'the number of additions in the commit';
COMMENT ON COLUMN github_pull_request_commits.deletions IS 'the number of deletions in the commit';
COMMENT ON COLUMN github_pull_request_commits.changed_files IS 'the number of files changed/modified in the commit';
COMMENT ON COLUMN github_pull_request_commits.url IS 'GitHub URL of the commit';
COMMENT ON COLUMN github_pull_request_commits._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
