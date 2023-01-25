---
sidebar_position: 14
---

# gosec_repo_scans

```sql
CREATE TABLE 
    gosec_repo_scans 
    ( 
        repo_id UUID NOT NULL, 
        issues JSONB NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id), 
        CONSTRAINT gosec_repo_scans_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE gosec_repo_scans IS 'Table of gosec repo scans';
COMMENT ON COLUMN gosec_repo_scans.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN gosec_repo_scans.issues IS 'JSON issues from gosec repo scan';
COMMENT ON COLUMN gosec_repo_scans._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
