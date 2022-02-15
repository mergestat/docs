---
sidebar_position: 3
image: ./summarize-commits-example.png
---

# Summarize Commits

Running `mergestat summarize commits` in a repository will output a git stats summary, including a table of metrics broken out by author.
For example, here's what output of the following command may look like:

```bash
mergestat summarize commits --repo "https://github.com/mergestat/mergestat"
```

```
Commits             822
Non-Merge Commits   645
Files Δ             370
Unique Authors      10
First Commit        2 years ago (2020-07-03)
Latest Commit       a day ago (2022-02-14)


Author                  Commits   Commit %   Files Δ   Additions   Deletions   First Commit                Latest Commit
Patrick DeVivo          514       62.53%     331       328,455     48,322      2 years ago (2020-07-03)    a day ago (2022-02-14)
Derrick Newberry        272       33.09%     108       15,853      4,706       2 years ago (2020-07-07)    a month ago (2022-01-13)
Riyaz Ali               26        3.16%      92        251,453     6,928       a year ago (2021-03-26)     8 months ago (2021-07-15)
Malyaka-Imran           3         0.36%      12        980         17          7 months ago (2021-07-25)   7 months ago (2021-08-03)
vaibhavnshah            2         0.24%      25        506         12          7 months ago (2021-07-26)   7 months ago (2021-07-27)
Brice Jaglin            1         0.12%      1         2           2           a year ago (2020-11-24)     a year ago (2020-11-24)
Dirk Loss               1         0.12%      1         2           2           2 years ago (2020-07-22)    2 years ago (2020-07-22)
Ferdinando Santacroce   1         0.12%      1         2           2           2 years ago (2020-09-07)    2 years ago (2020-09-07)
Lex Herbert             1         0.12%      1         1           1           a year ago (2021-03-12)     a year ago (2021-03-12)
Michiel Kalkman         1         0.12%      2         40          0           2 years ago (2020-07-06)    2 years ago (2020-07-06)
```

:::info

Note the use of the `--repo` flag, which sets the default repository (to either a local path on disk, or a remote repository).
If not provided, the current directory will be used (if it's a git repo).

:::

### Filtering Files

The first argument to `mergestat summarize commits` will be interpreted as a file path pattern.
This will limit the query to **only commits that modify files matching the pattern**.
For instance:

```bash
# Only show stats for commits that modify markdown files
mergestat summarize commits %.md --repo "https://github.com/mergestat/mergestat"
```

Will only show a summary of commits that modified files with a `.md` extension (typically Markdown files).
Similarly:

```bash
# Only show stats for commits that modified cmd/root.go
mergestat summarize commits cmd/root.go --repo "https://github.com/mergestat/mergestat"
```

Will only look at commits that modify a specific file.

### Filtering With Time Ranges

You may pass the `--start` and `--end` flags to provide a time range to bound commits to.
This allows you to look at stats for various periods throughout the history of a repo.
The expected format is `YYYY-MM-DD`, but SQLite *[date modifiers](https://www.sqlite.org/lang_datefunc.html)* may also be passed, instead of an exact date.
This allows you to easily express **relative date ranges**, such as `--start "-6 months"` (only include commits authored within the last 6 months).

```bash
# Only show stats for commits authored in the last 30 days
mergestat summarize commits --start "-30 days" --repo "https://github.com/mergestat/mergestat"
```

```bash
# Only show stats for commits authored in the 30 day period, starting 60 days ago
mergestat summarize commits --start "-60 days" --end "-30 days" --repo "https://github.com/mergestat/mergestat"
```

```bash
# Only show stats for commits authored this year
mergestat summarize commits --start "start of year" --repo "https://github.com/mergestat/mergestat"
```

![Screenshot of Output](summarize-commits-example.png)

:::info

You may pass the `--json` flag to output results as `json`, which is useful for script consumption.

:::
