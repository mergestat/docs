---
sidebar_position: 5
---

# git_files

```sql
CREATE TABLE 
    git_files 
    ( 
        repo_id UUID NOT NULL, 
        path                 TEXT NOT NULL, 
        executable           BOOLEAN NOT NULL, 
        contents             TEXT, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        CONSTRAINT files_pkey PRIMARY KEY (repo_id, path), 
        CONSTRAINT files_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE git_files IS 'git files (content and paths) of a repo';
COMMENT ON COLUMN git_files.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_files.path IS 'path of the file';
COMMENT ON COLUMN git_files.executable IS 'boolean to determine if the file is an executable';
COMMENT ON COLUMN git_files.contents IS 'contents of the file';
COMMENT ON COLUMN git_files._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
