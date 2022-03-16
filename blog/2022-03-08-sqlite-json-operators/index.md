---
title: SQLite JSON Functions in MergeStat ⏩
authors: [patrickdevivo]
description: MergeStat is a SQL interface to data in git repositories, based on SQLite. As such, we can take advantage of the built-in JSON functions and (new) operators available in SQLite.
tags: [mergestat, github, git, sqlite, json]
---

[SQLite 3.38.0](https://sqlite.org/releaselog/3_38_0.html) (released 2022-02-22) added support for built-in JSON functions (no longer a compile-time option) and two new JSON operators, `->` and `->>`, similar to ones available in MySQL and PostgreSQL.

MergeStat is a SQL interface to data in git repositories, [based on SQLite](https://docs.mergestat.com/welcome/background).
As such, we can [now](https://github.com/mergestat/mergestat/releases/tag/v0.5.5) take advantage of these new operators in our queries, wherever JSON data is returned.

:::note
To install the MergeStat CLI via homebrew, run:
```
brew tap mergestat/mergestat
brew install mergestat
```
Or see [**other options**](https://docs.mergestat.com/getting-started-cli/installation)
:::

### package.json

An easy source of JSON to start with is the `package.json` file present in most JavaScript/TypeScript codebases.
Let's take a look at the one in the popular [**tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss/blob/master/package.json) repo.

```sql
SELECT contents->>'name', contents->>'license' FROM files WHERE path = 'package.json'
```

```
+-------------------+----------------------+
| CONTENTS->>'NAME' | CONTENTS->>'LICENSE' |
+-------------------+----------------------+
| tailwindcss       | MIT                  |
+-------------------+----------------------+
```

Here we use `contents->>'name'` and `contents->>'license'` to pull out the `name` and `license` fields from the `package.json` JSON file.


Let's take this up a level, and look at at the `name` and `license` fields for *all* repos in an org where a `package.json` file is present.
Sticking with `tailwindlabs` (and now adding a [`GITHUB_TOKEN`](https://docs.mergestat.com/reference/github-tables#authenticating) when we execute the following):

```sql
-- CTE (https://www.sqlite.org/lang_with.html)
-- to select all the package.json files from repos in the tailwindlabs GitHub org
WITH package_json_files AS (
    SELECT
        name,
        github_repo_file_content('tailwindlabs', repo.name, 'package.json') AS package_json
    FROM github_org_repos('tailwindlabs') repo
)
SELECT
    name as repo_name,
    package_json->>'name',
    package_json->>'license'
FROM package_json_files
WHERE package_json IS NOT NULL
```

:::note
This query may take some time to run, as it makes a fair number of GitHub API requests.
:::

```
+-----------------------------+-----------------------------+--------------------------+
| REPO_NAME                   | PACKAGE_JSON->>'NAME'       | PACKAGE_JSON->>'LICENSE' |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss                 | tailwindcss                 | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| webpack-starter             | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss.com             | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-plugin-examples | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-intellisense    | root                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-playground      | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-custom-forms    | @tailwindcss/custom-forms   | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-typography      | @tailwindcss/typography     | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| heroicons                   | heroicons                   | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwindui-vue              | @tailwindui/vue             | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| blog.tailwindcss.com        | tailwind-blog               | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindui-react            | @tailwindui/react           | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| heroicons.com               | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| play.tailwindcss.com        | play.tailwindcss.com        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| headlessui                  | headlessui                  | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwind-play-api           | NULL                        | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-aspect-ratio    | @tailwindcss/aspect-ratio   | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-forms           | @tailwindcss/forms          | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-line-clamp      | @tailwindcss/line-clamp     | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| tailwindcss-jit             | @tailwindcss/jit            | MIT                      |
+-----------------------------+-----------------------------+--------------------------+
| prettier-plugin-tailwindcss | prettier-plugin-tailwindcss | NULL                     |
+-----------------------------+-----------------------------+--------------------------+
```

We see that most repos with a `package.json` file also have a name, while some do not (`NULL`).
All the declared licences appear to be **MIT**.

#### Dependencies

Finally, let's take a look at all the *dependencies* declared in `package.json` files across (JavaScript/TypeScript) codebases in an org.
This time, let's try on the [`freeCodeCamp`](https://github.com/freeCodeCamp) GitHub org.

```sql
WITH package_json_files AS (
    SELECT
        name,
        github_repo_file_content('freeCodeCamp', repo.name, 'package.json') AS package_json
    FROM github_org_repos('freeCodeCamp') repo
    WHERE (primary_language = 'TypeScript' OR primary_language = 'JavaScript')
)
SELECT
    count(*),
    json_group_array(name) AS repo_names,
    dep.key
FROM package_json_files, json_each(package_json->'dependencies') dep
WHERE package_json IS NOT NULL
GROUP BY dep.key
ORDER BY count(*) DESC
```

This query will show **the most frequently used dependencies within a GitHub org** (as extracted from the `dependencies` JSON value of `package.json` files).
Here are the top 10 results from the above query, on `freeCodeCamp`:

1. **dotenv** (35)
2. **express** (31)
3. **body-parser** (26)
4. **react-dom** (16)
5. **react** (16)
6. **lodash** (16)
7. **cors** (14)
8. **mongoose** (12)
9. **chai** (12)
10. **passport** (11)

:::info Join our Slack

We've recently launched a [**community Slack**](https://join.slack.com/t/mergestatcommunity/shared_invite/zt-xvvtvcz9-w3JJVIdhLgEWrVrKKNXOYg) - feel free to stop in if you have questions or anything to share 🎉.

:::
