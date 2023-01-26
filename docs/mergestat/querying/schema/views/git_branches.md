---
sidebar_position: 1
description: Schema for the MergeStat git_branches view.
---

# git_branches

```sql
CREATE VIEW 
    git_branches 
    ( 
        repo_id, 
        full_name, 
        hash, 
        NAME, 
        REMOTE, 
        target, 
        TYPE, 
        tag_commit_hash, 
        _mergestat_synced_at 
    ) 
    AS 
SELECT 
    git_refs.repo_id,
    git_refs.full_name,
    git_refs.hash,
    git_refs.name,
    git_refs.remote,
    git_refs.target,
    git_refs.type,
    git_refs.tag_commit_hash,
    git_refs._mergestat_synced_at
FROM 
    git_refs
WHERE 
    ( 
        git_refs.type = 'branch'::TEXT);
COMMENT ON VIEW git_branches IS 'view of git refs of type branch of a repo';
COMMENT ON COLUMN git_branches.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_branches.hash IS 'hash of the commit for refs that are not of type tag';
COMMENT ON COLUMN git_branches.name IS 'name of the ref';
COMMENT ON COLUMN git_branches.remote IS 'remote of the ref';
COMMENT ON COLUMN git_branches.target IS 'target of the ref';
COMMENT ON COLUMN git_branches.type IS 'type of the ref';
COMMENT ON COLUMN git_branches.tag_commit_hash IS 'hash of the commit for refs that are of type tag';
COMMENT ON COLUMN git_branches._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
