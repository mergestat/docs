---
sidebar_position: 12
description: Schema for the MergeStat github_stargazers table.
---

# github_stargazers

```sql
CREATE TABLE 
    github_stargazers 
    ( 
        repo_id UUID NOT NULL, 
        LOGIN                TEXT NOT NULL, 
        email                TEXT, 
        NAME                 TEXT, 
        bio                  TEXT, 
        company              TEXT, 
        avatar_url           TEXT, 
        created_at           TIMESTAMP(6) WITH TIME ZONE, 
        updated_at           TIMESTAMP(6) WITH TIME ZONE, 
        twitter              TEXT, 
        website              TEXT, 
        LOCATION             TEXT, 
        starred_at           TIMESTAMP(6) WITH TIME ZONE, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, LOGIN), 
        CONSTRAINT github_stargazers_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") 
        ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE github_stargazers IS 'stargazers of a GitHub repo';
COMMENT ON COLUMN github_stargazers.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_stargazers.login IS 'login of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.email IS 'email of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.name IS 'name of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.bio IS 'public profile bio of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.company IS 'company of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.avatar_url IS 'URL to the avatar of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.created_at IS 'timestamp of when the user was created who starred the repo';
COMMENT ON COLUMN github_stargazers.updated_at IS 'timestamp of the latest update to the user who starred the repo';
COMMENT ON COLUMN github_stargazers.twitter IS 'twitter of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.website IS 'website of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.location IS 'location of the user who starred the repo';
COMMENT ON COLUMN github_stargazers.starred_at IS 'timestamp the user starred the repo';
COMMENT ON COLUMN github_stargazers._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
