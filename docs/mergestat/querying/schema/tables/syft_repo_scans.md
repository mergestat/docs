---
sidebar_position: 13
---

# syft_repo_scans

```sql
CREATE TABLE 
    syft_repo_scans 
    ( 
        repo_id UUID NOT NULL, 
        results JSONB NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id) 
    );
COMMENT ON TABLE syft_repo_scans IS 'Syft repo scans';
COMMENT ON COLUMN syft_repo_scans.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN syft_repo_scans.results IS 'JSON results from Syft repo scan';
COMMENT ON COLUMN syft_repo_scans._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
