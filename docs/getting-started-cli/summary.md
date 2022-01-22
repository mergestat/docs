---
sidebar_position: 3
---

# Summary Command

Running `mergestat summary` in a repository will output basic git metrics, including a table of metrics broken out by author.
For example, here's what output for the following command may look like:

```bash
mergestat summary --repo "https://github.com/mergestat/mergestat"
```

```
Commits                 796
Non-Merge Commits       625
Files                   163
Unique Authors          13
First Commit            2 years ago (2020-07-03)
Latest Commit           5 hours ago (2020-07-03)


Author                  Commits   Commit %   Files Δ   Additions   Deletions   First Commit                Latest Commit
Patrick DeVivo          488       61.31%     321       325,916     47,747      2 years ago (2020-07-03)    5 hours ago (2022-01-22)
vialeon                 244       30.65%     79        9,898       3,975       2 years ago (2020-07-07)    3 months ago (2021-11-06)
Riyaz Ali               26        3.27%      92        251,453     6,928       a year ago (2021-03-26)     6 months ago (2021-07-15)
Vialeon                 16        2.01%      40        2,796       538         2 years ago (2020-07-08)    a year ago (2021-02-24)
Derrick Newberry        7         0.88%      24        2,781       146         6 months ago (2021-08-02)   16 days ago (2022-01-06)
Malyaka-Imran           3         0.38%      12        980         17          6 months ago (2021-07-25)   6 months ago (2021-08-03)
dnewberr                2         0.25%      3         378         47          11 days ago (2022-01-11)    9 days ago (2022-01-13)
vaibhavnshah            2         0.25%      25        506         12          6 months ago (2021-07-26)   6 months ago (2021-07-27)
Brice Jaglin            1         0.13%      1         2           2           a year ago (2020-11-24)     a year ago (2020-11-24)
Dirk Loss               1         0.13%      1         2           2           2 years ago (2020-07-22)    2 years ago (2020-07-22)
Ferdinando Santacroce   1         0.13%      1         2           2           a year ago (2020-09-07)     a year ago (2020-09-07)
Lex Herbert             1         0.13%      1         1           1           a year ago (2021-03-12)     a year ago (2021-03-12)
Michiel Kalkman         1         0.13%      2         40          0           2 years ago (2020-07-06)    2 years ago (2020-07-06)
```

:::info

Note the use of the `--repo` flag, which sets the default repository (to either a local path on disk, or a remote repository).
If not provided, the current directory will be used (if it's a git repo).

:::