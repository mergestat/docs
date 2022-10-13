---
sidebar_position: 4
---

# trivy_repo_vulnerabilities

```sql
CREATE VIEW 
    trivy_repo_vulnerabilities 
    ( 
        repo_id, 
        vulnerability, 
        target, 
        CLASS, 
        TYPE, 
        vulnerability_id, 
        vulnerability_pkg_name, 
        vulnerability_installed_version, 
        vulnerability_severity, 
        vulnerability_title, 
        vulnerability_description, 
        _mergestat_synced_at 
    ) 
    AS 
SELECT 
    trivy_repo_scans.repo_id,
    v.value                      AS vulnerability,
    (r.value ->> 'Target'::          TEXT) AS target,
    (r.value ->> 'Class'::           TEXT) AS CLASS,
    (r.value ->> 'Type'::            TEXT) AS TYPE,
    (v.value ->> 'VulnerabilityID':: TEXT) AS vulnerability_id,
    (v.value ->> 'PkgName'::         TEXT) AS vulnerability_pkg_name,
    (v.value ->> 'InstalledVersion'::TEXT) AS vulnerability_installed_version,
    (v.value ->> 'Severity'::        TEXT) AS vulnerability_severity,
    (v.value ->> 'Title'::           TEXT) AS vulnerability_title,
    (v.value ->> 'Description'::     TEXT) AS vulnerability_description,
    trivy_repo_scans._mergestat_synced_at
FROM 
    trivy_repo_scans,
    LATERAL jsonb_array_elements((trivy_repo_scans.results -> 'Results'::TEXT)) r(value),
    LATERAL jsonb_array_elements((r.value -> 'Vulnerabilities'::         TEXT)) v(value);
COMMENT ON VIEW trivy_repo_vulnerabilities IS 'view of Trivy repo scans vulnerabilities';
COMMENT ON COLUMN trivy_repo_vulnerabilities.repo_id IS 'foreign key for public.repos.id';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability IS 'vulnerability JSON results of Trivy scan';
COMMENT ON COLUMN trivy_repo_vulnerabilities.target IS 'vulnerability target';
COMMENT ON COLUMN trivy_repo_vulnerabilities.class IS 'vulnerability class';
COMMENT ON COLUMN trivy_repo_vulnerabilities.type IS 'vulnerability type';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_id IS 'vulnerability id';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_pkg_name IS 'vulnerability package name';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_installed_version IS 'vulnerability installed version';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_severity IS 'vulnerability severity';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_title IS 'vulnerability title';
COMMENT ON COLUMN trivy_repo_vulnerabilities.vulnerability_description IS 'vulnerability description';
COMMENT ON COLUMN trivy_repo_vulnerabilities._mergestat_synced_at IS 'timestamp when record was synced into the MergeStat database';
```
