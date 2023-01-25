---
sidebar_position: 17
---

# yelp_detect_secrets_repo_scans

```sql
CREATE TABLE yelp_detect_secrets_repo_scans (
    repo_id uuid PRIMARY KEY,
    results jsonb NOT NULL
);
COMMENT ON TABLE yelp_detect_secrets_repo_scans IS 'scan output of a Yelp detect-secrets repo scan';
COMMENT ON COLUMN yelp_detect_secrets_repo_scans.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN yelp_detect_secrets_repo_scans.results IS 'JSON output of a Yelp detect-secrets scan';
```
