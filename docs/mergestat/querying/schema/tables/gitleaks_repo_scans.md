---
sidebar_position: 13
description: Schema for the MergeStat gitleaks_repo_scans table.
---

# gitleaks_repo_scans

```sql
CREATE TABLE gitleaks_repo_scans (
    repo_id uuid PRIMARY KEY,
    results jsonb NOT NULL
);
COMMENT ON TABLE gitleaks_repo_scans IS 'scan output of a Gitleaks repo scan';
COMMENT ON COLUMN gitleaks_repo_scans.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN gitleaks_repo_scans.results IS 'JSON output of a Gitleaks scan';
```
