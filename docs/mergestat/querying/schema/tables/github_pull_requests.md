---
sidebar_position: 10
description: Schema for the MergeStat github_pull_requests table.
---

# github_pull_requests

```sql
CREATE TABLE 
    github_pull_requests 
    ( 
        repo_id UUID NOT NULL, 
        additions             INTEGER, 
        author_login          TEXT, 
        author_association    TEXT, 
        author_avatar_url     TEXT, 
        author_name           TEXT, 
        base_ref_oid          TEXT, 
        base_ref_name         TEXT, 
        base_repository_name  TEXT, 
        body                  TEXT, 
        changed_files         INTEGER, 
        closed                BOOLEAN, 
        closed_at             TIMESTAMP(6) WITH TIME ZONE, 
        comment_count         INTEGER, 
        commit_count          INTEGER, 
        created_at            TIMESTAMP(6) WITH TIME ZONE, 
        created_via_email     BOOLEAN, 
        database_id           INTEGER NOT NULL, 
        deletions             INTEGER, 
        editor_login          TEXT, 
        head_ref_name         TEXT, 
        head_ref_oid          TEXT, 
        head_repository_name  TEXT, 
        is_draft              BOOLEAN, 
        label_count           INTEGER, 
        last_edited_at        TIMESTAMP(6) WITH TIME ZONE, 
        locked                BOOLEAN, 
        maintainer_can_modify BOOLEAN, 
        mergeable             TEXT, 
        merged                BOOLEAN, 
        merged_at             TIMESTAMP(6) WITH TIME ZONE, 
        merged_by             TEXT, 
                              NUMBER INTEGER, 
        participant_count     INTEGER, 
        published_at          TIMESTAMP(6) WITH TIME ZONE, 
        review_decision       TEXT, 
        state                 TEXT, 
        title                 TEXT, 
        updated_at            TIMESTAMP(6) WITH TIME ZONE, 
        url                   TEXT, 
        labels JSONB DEFAULT jsonb_build_array() NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, database_id), 
        CONSTRAINT github_pull_requests_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id" 
        ) ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE github_pull_requests IS 'pull requests of a GitHub repo';
COMMENT ON COLUMN github_pull_requests.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_pull_requests.additions IS 'the number of additions in the pull request';
COMMENT ON COLUMN github_pull_requests.author_login IS 'login of the author of the pull request';
COMMENT ON COLUMN github_pull_requests.author_association IS 'author association to the repo';
COMMENT ON COLUMN github_pull_requests.author_avatar_url IS 'URL to the avatar of the author of the pull request';
COMMENT ON COLUMN github_pull_requests.author_name IS 'name of the author of the pull request';
COMMENT ON COLUMN github_pull_requests.base_ref_oid IS 'the base ref object id associated with the pull request';
COMMENT ON COLUMN github_pull_requests.base_ref_name IS 'the name of base ref associated with the pull request';
COMMENT ON COLUMN github_pull_requests.base_repository_name IS 'the name of the base repo for the pull request';
COMMENT ON COLUMN github_pull_requests.body IS 'body of the pull request';
COMMENT ON COLUMN github_pull_requests.changed_files IS 'the number of files changed/modified in the pull request';
COMMENT ON COLUMN github_pull_requests.closed IS 'boolean to determine if the pull request is closed';
COMMENT ON COLUMN github_pull_requests.closed_at IS 'timestamp of when the pull request was closed';
COMMENT ON COLUMN github_pull_requests.comment_count IS 'the number of comments in the pull request';
COMMENT ON COLUMN github_pull_requests.created_at IS 'timestamp of when the pull request was created';
COMMENT ON COLUMN github_pull_requests.created_via_email IS 'boolean to determine if the pull request was created via email';
COMMENT ON COLUMN github_pull_requests.database_id IS 'GitHub database_id of the pull request';
COMMENT ON COLUMN github_pull_requests.deletions IS 'the number of deletions in the pull request';
COMMENT ON COLUMN github_pull_requests.editor_login IS 'login of the editor of the pull request';
COMMENT ON COLUMN github_pull_requests.head_ref_name IS 'the name of head ref associated with the pull request';
COMMENT ON COLUMN github_pull_requests.head_ref_oid IS 'the head ref object id associated with the pull request';
COMMENT ON COLUMN github_pull_requests.head_repository_name IS 'the name of the head repo for the pull request';
COMMENT ON COLUMN github_pull_requests.is_draft IS 'boolean to determine if the pull request is a draft';
COMMENT ON COLUMN github_pull_requests.label_count IS 'number of labels associated to the pull request';
COMMENT ON COLUMN github_pull_requests.last_edited_at IS 'timestamp of when the pull request was last edited';
COMMENT ON COLUMN github_pull_requests.locked IS 'boolean to determine if the pull request is locked';
COMMENT ON COLUMN github_pull_requests.maintainer_can_modify IS 'boolean to determine if a maintainer can modify the pull request';
COMMENT ON COLUMN github_pull_requests.mergeable IS 'mergeable state of the pull request';
COMMENT ON COLUMN github_pull_requests.merged IS 'boolean to determine if the pull request is merged';
COMMENT ON COLUMN github_pull_requests.merged_at IS 'timestamp of when the pull request was merged';
COMMENT ON COLUMN github_pull_requests.merged_by IS 'actor who merged the pull request';
COMMENT ON COLUMN github_pull_requests.number IS 'GitHub number of the pull request';
COMMENT ON COLUMN github_pull_requests.participant_count IS 'number of participants associated to the pull request';
COMMENT ON COLUMN github_pull_requests.published_at IS 'timestamp of when the pull request was published';
COMMENT ON COLUMN github_pull_requests.review_decision IS 'review decision of the pull request';
COMMENT ON COLUMN github_pull_requests.state IS 'state of the pull request';
COMMENT ON COLUMN github_pull_requests.title IS 'title of the pull request';
COMMENT ON COLUMN github_pull_requests.updated_at IS 'timestamp of when the pull request was updated';
COMMENT ON COLUMN github_pull_requests.url IS 'GitHub URL of the pull request';
COMMENT ON COLUMN github_pull_requests.labels IS 'labels associated to the pull request';
COMMENT ON COLUMN github_pull_requests._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
