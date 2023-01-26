---
sidebar_position: 1
description: Documentation on how to install mergestat-lite for local, CLI use.
---

# Installation

## Homebrew

Currently, `homebrew` is one of the easier installation paths for the CLI.

```
brew tap mergestat/mergestat
brew install mergestat
```

## Docker

Use our [official image](https://hub.docker.com/r/mergestat/mergestat) on Docker Hub.

```bash
docker run -v "${PWD}:/repo" mergestat/mergestat "select count(*) from commits"
```

:::note

Here we pass the `-v` flag to mount a host path into the container at `/repo`. This is where `mergestat` will look for a default git repository, if none is specific in the query itself.

:::


## Pre-Built Binaries

The [latest releases](https://github.com/mergestat/mergestat-lite/releases) should have pre-built binaries for Mac and Linux.
You can download and add the `mergestat` binary somewhere on your `$PATH` to use.
`libmergestat.so` is also available to be loaded as a [SQLite run-time extension](/mergestat-lite/usage/runtime-extension).

## Go

[`libgit2`](https://libgit2.org/) is a build dependency (used via [`git2go`](https://github.com/libgit2/git2go)) and must be available on your system for linking.

The following (long 😬) `go install` commands can be used to install a binary via the go toolchain.

On Mac:
```
CGO_CFLAGS=-DUSE_LIBSQLITE3 CGO_LDFLAGS=-Wl,-undefined,dynamic_lookup go install -tags="sqlite_vtable,vtable,sqlite_json1,static,system_libgit2" github.com/mergestat/mergestat@latest
```

On Linux:
```
CGO_CFLAGS=-DUSE_LIBSQLITE3 CGO_LDFLAGS=-Wl,--unresolved-symbols=ignore-in-object-files go install -tags="sqlite_vtable,vtable,sqlite_json1,static,system_libgit2" github.com/mergestat/mergestat@latest
```

See the [`Makefile`](https://github.com/mergestat/mergestat-lite/blob/main/Makefile) for more context.
Checking out this repository and running `make` in the root will produce two files in the `.build` directory:

  1. `mergestat` - the CLI binary (which can then be moved into your `$PATH` for use)
  2. `libmergestat.so` - a shared object file [SQLite extension](https://www.sqlite.org/loadext.html) that can be used by SQLite directly
