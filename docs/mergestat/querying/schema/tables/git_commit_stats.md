---
sidebar_position: 3
---

# git_commit_stats

```sql
CREATE TABLE 
    git_commit_stats 
    ( 
        repo_id UUID NOT NULL, 
        commit_hash          TEXT NOT NULL, 
        file_path            TEXT NOT NULL, 
        additions            INTEGER NOT NULL, 
        deletions            INTEGER NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        old_file_mode        TEXT DEFAULT 'unknown'::TEXT NOT NULL, 
        new_file_mode        TEXT DEFAULT 'unknown'::TEXT NOT NULL, 
        CONSTRAINT commit_stats_pkey PRIMARY KEY (repo_id, file_path, commit_hash, new_file_mode), 
        CONSTRAINT commit_stats_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE git_commit_stats IS 'git commit stats of a repo';
COMMENT ON COLUMN git_commit_stats.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN git_commit_stats.commit_hash IS 'hash of the commit';
COMMENT ON COLUMN git_commit_stats.file_path IS 'path of the file the modification was made in';
COMMENT ON COLUMN git_commit_stats.additions IS 'the number of additions in this path of the commit';
COMMENT ON COLUMN git_commit_stats.deletions IS 'the number of deletions in this path of the commit';
COMMENT ON COLUMN git_commit_stats._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
COMMENT ON COLUMN git_commit_stats.old_file_mode IS 'old file mode derived from git mode. possible values (unknown, none, regular_file, symbolic_link, git_link)';
COMMENT ON COLUMN git_commit_stats.new_file_mode IS 'new file mode derived from git mode. possible values (unknown, none, regular_file, symbolic_link, git_link)';
```
