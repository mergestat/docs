---
sidebar_position: 16
description: Schema for the MergeStat trivy_repo_scans table.
---

# trivy_repo_scans

```sql
CREATE TABLE 
    trivy_repo_scans 
    ( 
        repo_id UUID NOT NULL, 
        results JSONB NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id), 
        CONSTRAINT trivy_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE trivy_repo_scans IS 'Trivy repo scans';
COMMENT ON COLUMN trivy_repo_scans.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN trivy_repo_scans.results IS 'JSON results from Trivy repo scan';
COMMENT ON COLUMN trivy_repo_scans._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
