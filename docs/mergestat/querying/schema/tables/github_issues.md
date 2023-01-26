---
sidebar_position: 7
description: Schema for the MergeStat github_issues table.
---

# github_issues

```sql
CREATE TABLE 
    github_issues 
    ( 
        repo_id UUID NOT NULL, 
        author_login          TEXT, 
        body                  TEXT, 
        closed                BOOLEAN, 
        closed_at             TIMESTAMP(6) WITH TIME ZONE, 
        comment_count         INTEGER, 
        created_at            TIMESTAMP(6) WITH TIME ZONE, 
        created_via_email     BOOLEAN, 
        database_id           INTEGER NOT NULL, 
        editor_login          TEXT, 
        includes_created_edit BOOLEAN, 
        label_count           INTEGER, 
        last_edited_at        TIMESTAMP(6) WITH TIME ZONE, 
        locked                BOOLEAN, 
        milestone_count       INTEGER, 
        number                INTEGER NOT NULL, 
        participant_count     INTEGER, 
        published_at          TIMESTAMP(6) WITH TIME ZONE, 
        reaction_count        INTEGER, 
        state                 TEXT, 
        title                 TEXT, 
        updated_at            TIMESTAMP(6) WITH TIME ZONE, 
        url                   TEXT, 
        labels JSONB DEFAULT jsonb_build_array() NOT NULL, 
        _mergestat_synced_at TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, database_id), 
        CONSTRAINT github_issues_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE github_issues IS 'issues of a GitHub repo';
COMMENT ON COLUMN github_issues.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_issues.author_login IS 'login of the author of the issue';
COMMENT ON COLUMN github_issues.body IS 'body of the issue';
COMMENT ON COLUMN github_issues.closed IS 'boolean to determine if the issue is closed';
COMMENT ON COLUMN github_issues.closed_at IS 'timestamp of when the issue was closed';
COMMENT ON COLUMN github_issues.created_via_email IS 'boolean to determine if the issue was created via email';
COMMENT ON COLUMN github_issues.database_id IS 'GitHub database_id of the issue';
COMMENT ON COLUMN github_issues.editor_login IS 'login of the editor of the issue';
COMMENT ON COLUMN github_issues.includes_created_edit IS 'boolean to determine if the issue was edited and includes an edit with the creation data';
COMMENT ON COLUMN github_issues.label_count IS 'number of labels associated to the issue';
COMMENT ON COLUMN github_issues.last_edited_at IS 'timestamp when the issue was edited';
COMMENT ON COLUMN github_issues.locked IS 'boolean to determine if the issue is locked';
COMMENT ON COLUMN github_issues.milestone_count IS 'number of milestones associated to the issue';
COMMENT ON COLUMN github_issues.number IS 'GitHub number for the issue';
COMMENT ON COLUMN github_issues.participant_count IS 'number of participants associated to the issue';
COMMENT ON COLUMN github_issues.published_at IS 'timestamp when the issue was published';
COMMENT ON COLUMN github_issues.reaction_count IS 'number of reactions associated to the issue';
COMMENT ON COLUMN github_issues.state IS 'state of the issue';
COMMENT ON COLUMN github_issues.title IS 'title of the issue';
COMMENT ON COLUMN github_issues.updated_at IS 'timestamp when the issue was updated';
COMMENT ON COLUMN github_issues.url IS 'GitHub URL of the issue';
COMMENT ON COLUMN github_issues.labels IS 'labels associated to the issue';
COMMENT ON COLUMN github_issues._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
