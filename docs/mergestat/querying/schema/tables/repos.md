---
sidebar_position: 1
---

# repos

```sql
CREATE TABLE 
    repos 
    ( 
        id UUID DEFAULT gen_random_uuid() NOT NULL, 
        repo       TEXT NOT NULL, 
        ref        TEXT, 
        is_github  BOOLEAN, 
        created_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        settings JSONB DEFAULT jsonb_build_object() NOT NULL, 
        tags JSONB DEFAULT jsonb_build_array() NOT NULL, 
        repo_import_id UUID, 
        PRIMARY KEY (id), 
        CONSTRAINT repos_repo_import_id_fkey FOREIGN KEY (repo_import_id) REFERENCES 
        "postgres"."mergestat"."repo_imports" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE repos IS 'git repositories to track';
COMMENT ON COLUMN repos.id IS 'MergeStat identifier for the repo';
COMMENT ON COLUMN repos.repo IS 'URL for the repo';
COMMENT ON COLUMN repos.ref IS 'ref for the repo';
COMMENT ON COLUMN repos.is_github IS 'boolean to determine if the repo is in GitHub';
COMMENT ON COLUMN repos.created_at IS 'timestamp of when the MergeStat repo entry was created';
COMMENT ON COLUMN repos.settings IS 'JSON settings for the repo';
COMMENT ON COLUMN repos.tags IS 'array of tags for the repo for topics in GitHub as well as tags added in MergeStat';
COMMENT ON COLUMN repos.repo_import_id IS 'foreign key for mergestat.repo_imports.id';
```
