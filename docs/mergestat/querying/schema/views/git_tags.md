---
sidebar_position: 2
description: Schema for the MergeStat git_tags view.
---

# git_tags

```sql
CREATE VIEW 
    git_tags 
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
        git_refs.type = 'tag'::TEXT);
COMMENT ON VIEW git_tags IS 'view of git refs of type tag of a repo';
COMMENT ON COLUMN git_tags.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_tags.hash IS 'hash of the ref that are of type tag';
COMMENT ON COLUMN git_tags.name IS 'name of the ref';
COMMENT ON COLUMN git_tags.remote IS 'remote of the ref';
COMMENT ON COLUMN git_tags.target IS 'target of the ref';
COMMENT ON COLUMN git_tags.type IS 'type of the ref';
COMMENT ON COLUMN git_tags.tag_commit_hash IS 'hash of the commit for refs that are of type tag';
COMMENT ON COLUMN git_tags._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
