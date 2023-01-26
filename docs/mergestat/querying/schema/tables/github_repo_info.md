---
sidebar_position: 11
description: Schema for the MergeStat github_repo_info table.
---

# github_repo_info

```sql
CREATE TABLE 
    github_repo_info 
    ( 
        repo_id UUID NOT NULL, 
        OWNER                       TEXT NOT NULL, 
        NAME                        TEXT NOT NULL, 
        created_at                  TIMESTAMP(6) WITH TIME ZONE, 
        default_branch_name         TEXT, 
        description                 TEXT, 
        disk_usage                  INTEGER, 
        fork_count                  INTEGER, 
        homepage_url                TEXT, 
        is_archived                 BOOLEAN, 
        is_disabled                 BOOLEAN, 
        is_mirror                   BOOLEAN, 
        is_private                  BOOLEAN, 
        total_issues_count          INTEGER, 
        latest_release_author       TEXT, 
        latest_release_created_at   TIMESTAMP(6) WITH TIME ZONE, 
        latest_release_name         TEXT, 
        latest_release_published_at TIMESTAMP(6) WITH TIME ZONE, 
        license_key                 TEXT, 
        license_name                TEXT, 
        license_nickname            TEXT, 
        open_graph_image_url        TEXT, 
        primary_language            TEXT, 
        pushed_at                   TIMESTAMP(6) WITH TIME ZONE, 
        releases_count              INTEGER, 
        stargazers_count            INTEGER, 
        updated_at                  TIMESTAMP(6) WITH TIME ZONE, 
        watchers_count              INTEGER, 
        _mergestat_synced_at        TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id), 
        CONSTRAINT github_repo_info_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT, 
    UNIQUE (OWNER, NAME) 
    );
COMMENT ON TABLE github_repo_info IS 'info/metadata of a GitHub repo';
COMMENT ON COLUMN github_repo_info.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_repo_info.owner IS 'the user or organization that owns the repo';
COMMENT ON COLUMN github_repo_info.name IS 'the name of the repo';
COMMENT ON COLUMN github_repo_info.created_at IS 'timestamp of when the repo was created';
COMMENT ON COLUMN github_repo_info.default_branch_name IS 'the name of the default branch for the repo';
COMMENT ON COLUMN github_repo_info.description IS 'the description for the repo';
COMMENT ON COLUMN github_repo_info.disk_usage IS 'the number of kilobytes on disk for the repo';
COMMENT ON COLUMN github_repo_info.fork_count IS 'number of forks associated to the repo';
COMMENT ON COLUMN github_repo_info.homepage_url IS 'the GitHub homepage URL for the repo';
COMMENT ON COLUMN github_repo_info.is_archived IS 'boolean to determine if the repo is archived';
COMMENT ON COLUMN github_repo_info.is_disabled IS 'boolean to determine if the repo is disabled';
COMMENT ON COLUMN github_repo_info.is_mirror IS 'boolean to determine if the repo is a mirror';
COMMENT ON COLUMN github_repo_info.is_private IS 'boolean to determine if the repo is private';
COMMENT ON COLUMN github_repo_info.total_issues_count IS 'number of issues associated to the repo';
COMMENT ON COLUMN github_repo_info.latest_release_author IS 'the author of the latest release in the repo';
COMMENT ON COLUMN github_repo_info.latest_release_created_at IS 'timestamp of the creation of the latest release in the repo';
COMMENT ON COLUMN github_repo_info.latest_release_name IS 'the name of the latest release in the repo';
COMMENT ON COLUMN github_repo_info.latest_release_published_at IS 'timestamp of the publishing of the latest release in the repo';
COMMENT ON COLUMN github_repo_info.license_key IS 'the license key for the repo';
COMMENT ON COLUMN github_repo_info.license_name IS 'the license name for the repo';
COMMENT ON COLUMN github_repo_info.license_nickname IS 'the license nickname for the repo';
COMMENT ON COLUMN github_repo_info.open_graph_image_url IS 'the URL for the image used to represent this repository in Open Graph data';
COMMENT ON COLUMN github_repo_info.primary_language IS 'the primary language for the repo';
COMMENT ON COLUMN github_repo_info.pushed_at IS 'timestamp of the latest push to the repo';
COMMENT ON COLUMN github_repo_info.releases_count IS 'number of releases associated to the repo';
COMMENT ON COLUMN github_repo_info.stargazers_count IS 'number of stargazers associated to the repo';
COMMENT ON COLUMN github_repo_info.updated_at IS 'timestamp of the latest update to the repo';
COMMENT ON COLUMN github_repo_info.watchers_count IS 'number of watchers associated to the repo';
COMMENT ON COLUMN github_repo_info._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
