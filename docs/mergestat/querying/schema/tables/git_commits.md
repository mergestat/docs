---
sidebar_position: 4
description: Schema for the MergeStat git_commits table.
---

# git_commits

```sql
CREATE TABLE 
    git_commits 
    ( 
        repo_id UUID NOT NULL, 
        hash                 TEXT NOT NULL, 
        MESSAGE              TEXT NOT NULL, 
        author_name          TEXT NOT NULL, 
        author_email         TEXT NOT NULL, 
        author_when          TIMESTAMP(6) WITH TIME ZONE NOT NULL, 
        committer_name       TEXT NOT NULL, 
        committer_email      TEXT NOT NULL, 
        committer_when       TIMESTAMP(6) WITH TIME ZONE NOT NULL, 
        parents              INTEGER NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        CONSTRAINT commits_pkey PRIMARY KEY (repo_id, hash), 
        CONSTRAINT commits_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE git_commits IS 'git commit history of a repo';
COMMENT ON COLUMN git_commits.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_commits.hash IS 'hash of the commit';
COMMENT ON COLUMN git_commits.message IS 'message of the commit';
COMMENT ON COLUMN git_commits.author_name IS 'name of the author of the the modification';
COMMENT ON COLUMN git_commits.author_email IS 'email of the author of the modification';
COMMENT ON COLUMN git_commits.author_when IS 'timestamp of when the modifcation was authored';
COMMENT ON COLUMN git_commits.committer_name IS 'name of the author who committed the modification';
COMMENT ON COLUMN git_commits.committer_email IS 'email of the author who committed the modification';
COMMENT ON COLUMN git_commits.committer_when IS 'timestamp of when the commit was made';
COMMENT ON COLUMN git_commits.parents IS 'the number of parents of the commit';
COMMENT ON COLUMN git_commits._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
