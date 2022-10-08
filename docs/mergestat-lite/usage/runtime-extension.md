---
sidebar_position: 3
---

# SQLite Runtime Extension

MergeStat Lite can also be used as a SQLite [run-time loadable extension](https://www.sqlite.org/loadext.html).
This is a powerful way to use MergeStat in any environment that supports SQLite and run-time extensions, including **many programming languages**.

## Usage

You'll need to have access to `libmergestat.so`, the shared object file that is the run-time loadable extension.
You can find it as part of our [published releases](https://github.com/mergestat/mergestat/releases/), or if you're building from source, it will be located at `.build/libmergestat.so`.

### SQLite Shell `sqlite3`

The SQLite [shell](https://sqlite.org/cli.html) allows you to load an extension with the `.load` command.

```
sqlite> .load .build/libmergestat.so
sqlite> select count(*) from commits('https://github.com/mergestat/mergestat');
749
```

### Node.js

[`node-sqlite3`](https://github.com/mapbox/node-sqlite3) supports loading an extension.

```javascript
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

// load the extension from a local path
db.loadExtension('libmergestat.so', (err) => {
    if (err) {
        console.error(err)
        return
    }

    db.each("SELECT * FROM commits('https://github.com/mergestat/mergestat')", (err, row) => {
        console.log(row);
        /* 
        prints out all commits looking like:
        {
            hash: 'a4562d2d5a35536771745b0aa19d705eb47234e7',
            message: 'initial commit :tada:\n',
            author_name: 'Patrick DeVivo',
            author_email: 'patrick.devivo@gmail.com',
            author_when: '2020-07-03T15:59:58-04:00',
            committer_name: 'Patrick DeVivo',
            committer_email: 'patrick.devivo@gmail.com',
            committer_when: '2020-07-03T15:59:58-04:00',
            parents: 0
        }
        */
    })
})

db.close();
```

### Python

```python
import sqlite3

con = sqlite3.connect(":memory:")

con.enable_load_extension(True)
con.execute(f"select load_extension('./libmergestat')")
con.enable_load_extension(False)

for row in con.cursor().execute("SELECT * FROM commits('https://github.com/mergestat/mergestat')"):
    print(row)
```

