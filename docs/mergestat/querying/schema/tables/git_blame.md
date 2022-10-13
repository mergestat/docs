---
sidebar_position: 2
---

# git_blame

```sql
CREATE TABLE 
    git_blame 
    ( 
        repo_id UUID NOT NULL, 
        author_email         TEXT, 
        author_name          TEXT, 
        author_when          TIMESTAMP(6) WITH TIME ZONE, 
        commit_hash          TEXT, 
        line_no              INTEGER NOT NULL, 
        line                 TEXT, 
        path                 TEXT NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, path, line_no), 
        CONSTRAINT git_blame_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE git_blame IS 'git blame of all lines in all files of a repo';
COMMENT ON COLUMN git_blame.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_blame.author_email IS 'email of the author who modified the line';
COMMENT ON COLUMN git_blame.author_name IS 'name of the author who modified the line';
COMMENT ON COLUMN git_blame.commit_hash IS 'hash of the commit the modification was made in';
COMMENT ON COLUMN git_blame.line_no IS 'line number of the modification';
COMMENT ON COLUMN git_blame.path IS 'path of the file the modification was made in';
COMMENT ON COLUMN git_blame._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
