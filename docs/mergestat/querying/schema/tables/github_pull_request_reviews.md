---
sidebar_position: 9
---

# github_pull_request_reviews

```sql
CREATE TABLE 
    github_pull_request_reviews 
    ( 
        repo_id UUID NOT NULL, 
        pr_number                     INTEGER NOT NULL, 
        id                            TEXT NOT NULL, 
        author_login                  TEXT, 
        author_url                    TEXT, 
        author_association            TEXT, 
        author_can_push_to_repository BOOLEAN, 
        body                          TEXT, 
        comment_count                 INTEGER, 
        created_at                    TIMESTAMP(6) WITH TIME ZONE, 
        created_via_email             BOOLEAN, 
        editor_login                  TEXT, 
        last_edited_at                TIMESTAMP(6) WITH TIME ZONE, 
        published_at                  TIMESTAMP(6) WITH TIME ZONE, 
        state                         TEXT, 
        submitted_at                  TIMESTAMP(6) WITH TIME ZONE, 
        updated_at                    TIMESTAMP(6) WITH TIME ZONE, 
        _mergestat_synced_at          TIMESTAMP(6) WITH TIME ZONE DEFAULT now() NOT NULL, 
        PRIMARY KEY (repo_id, id), 
        CONSTRAINT reviews_repo_id_fkey FOREIGN KEY (repo_id) REFERENCES "repos" ("id") ON 
DELETE 
    CASCADE 
ON 
UPDATE 
    RESTRICT 
    );
COMMENT ON TABLE github_pull_request_reviews IS 'reviews for all pull requests of a GitHub repo';
COMMENT ON COLUMN github_pull_request_reviews.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN github_pull_request_reviews.pr_number IS 'GitHub pull request number of the review';
COMMENT ON COLUMN github_pull_request_reviews.id IS 'GitHub id of the review';
COMMENT ON COLUMN github_pull_request_reviews.author_login IS 'login of the author of the review';
COMMENT ON COLUMN github_pull_request_reviews.author_url IS 'URL to the profile of the author of the review';
COMMENT ON COLUMN github_pull_request_reviews.author_association IS 'author association to the repo';
COMMENT ON COLUMN github_pull_request_reviews.author_can_push_to_repository IS 'boolean to determine if author can push to the repo';
COMMENT ON COLUMN github_pull_request_reviews.body IS 'body of the review';
COMMENT ON COLUMN github_pull_request_reviews.comment_count IS 'number of comments associated to the review';
COMMENT ON COLUMN github_pull_request_reviews.created_at IS 'timestamp of when the review was created';
COMMENT ON COLUMN github_pull_request_reviews.created_via_email IS 'boolean to determine if the review was created via email';
COMMENT ON COLUMN github_pull_request_reviews.editor_login IS 'login of the editor of the review';
COMMENT ON COLUMN github_pull_request_reviews.last_edited_at IS 'timestamp of when the review was last edited';
COMMENT ON COLUMN github_pull_request_reviews.published_at IS 'timestamp of when the review was published';
COMMENT ON COLUMN github_pull_request_reviews.state IS 'state of the review';
COMMENT ON COLUMN github_pull_request_reviews.submitted_at IS 'timestamp of when the review was submitted';
COMMENT ON COLUMN github_pull_request_reviews.updated_at IS 'timestamp of when the review was updated';
COMMENT ON COLUMN github_pull_request_reviews._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
