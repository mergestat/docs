---
sidebar_position: 3
---

# syft_repo_artifacts

```sql
CREATE VIEW 
    syft_repo_artifacts 
    ( 
        repo_id, 
        artifact, 
        id, 
        NAME, 
        VERSION, 
        TYPE, 
        found_by, 
        locations, 
        licenses, 
        language, 
        cpes, 
        purl 
    ) 
    AS 
SELECT 
    syft_repo_scans.repo_id,
    a.value                  AS artifact,
    (a.value ->> 'id'::       TEXT) AS id,
    (a.value ->> 'name'::     TEXT) AS NAME,
    (a.value ->> 'version'::  TEXT) AS VERSION,
    (a.value ->> 'type'::     TEXT) AS TYPE,
    (a.value ->> 'foundBy'::  TEXT) AS found_by,
    (a.value ->> 'locations'::TEXT) AS locations,
    (a.value ->> 'licenses':: TEXT) AS licenses,
    (a.value ->> 'language':: TEXT) AS language,
    (a.value ->> 'cpes'::     TEXT) AS cpes,
    (a.value ->> 'purl'::     TEXT) AS purl
FROM 
    syft_repo_scans,
    LATERAL jsonb_array_elements((syft_repo_scans.results -> 'artifacts'::TEXT)) a(value);
COMMENT ON VIEW syft_repo_artifacts IS 'view of Syft repo scans artifacts';
COMMENT ON COLUMN syft_repo_artifacts.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN syft_repo_artifacts.artifact IS 'artifact JSON results from Syft repo scan';
COMMENT ON COLUMN syft_repo_artifacts.id IS 'artifact id';
COMMENT ON COLUMN syft_repo_artifacts.name IS 'artifact name';
COMMENT ON COLUMN syft_repo_artifacts.version IS 'artifact version';
COMMENT ON COLUMN syft_repo_artifacts.type IS 'artifact type';
COMMENT ON COLUMN syft_repo_artifacts.found_by IS 'artifact found_by';
COMMENT ON COLUMN syft_repo_artifacts.locations IS 'artifact locations';
COMMENT ON COLUMN syft_repo_artifacts.licenses IS 'artifact licenses';
COMMENT ON COLUMN syft_repo_artifacts.language IS 'artifact language';
COMMENT ON COLUMN syft_repo_artifacts.cpes IS 'artifact cpes';
COMMENT ON COLUMN syft_repo_artifacts.purl IS 'artifact purl';
```
