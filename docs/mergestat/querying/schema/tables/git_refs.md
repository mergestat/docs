---
sidebar_position: 6
description: Schema for the MergeStat git_refs table.
---

# git_refs

```sql
CREATE TABLE 
    git_refs 
    ( 
        repo_id UUID NOT NULL, 
        full_name            TEXT NOT NULL, 
        hash                 TEXT, 
        NAME                 TEXT, 
        REMOTE               TEXT, 
        target               TEXT, 
        TYPE                 TEXT, 
        tag_commit_hash      TEXT, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, full_name), 
        CONSTRAINT refs_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE git_refs IS 'git refs of a repo';
COMMENT ON COLUMN git_refs.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_refs.hash IS 'hash of the commit for refs that are not of type tag';
COMMENT ON COLUMN git_refs.name IS 'name of the ref';
COMMENT ON COLUMN git_refs.remote IS 'remote of the ref';
COMMENT ON COLUMN git_refs.target IS 'target of the ref';
COMMENT ON COLUMN git_refs.type IS 'type of the ref';
COMMENT ON COLUMN git_refs.tag_commit_hash IS 'hash of the commit for refs that are of type tag';
COMMENT ON COLUMN git_refs._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
