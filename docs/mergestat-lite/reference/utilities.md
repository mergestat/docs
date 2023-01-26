---
sidebar_position: 3
description: Documentation for various utilities in mergestat-lite.
---

# Utilities

## grep

A table-valued function that searches text by line for a string match.
Meant to behave somewhat similarly to the `grep` command line tool.
The search term is a [regular expression](https://pkg.go.dev/regexp/syntax).

| Column      | Type     |
|-------------|----------|
| line_no     | INT      |
| line        | TEXT     |

```sql
SELECT * FROM grep(<contents>, <search-term>, <before>, <after>)
SELECT * FROM grep(<contents>, <search-term>) -- before and after default to 0
```

Params:
  1. `contents` - text to search in
  2. `search-term` - search term (regular expression)

## `str_split`

A table-valued function that splits string contents into rows based on a delimiter (default `\n`)

| Column      | Type     |
|-------------|----------|
| line_no     | INT      |
| line        | TEXT     |

```sql
SELECT * FROM str_split(<contents>, <delimiter>)
SELECT * FROM str_split(<contents>) -- splits on new lines
```

Params:
  1. `contents` - text to split
  2. `delimiter` - delimiter to split on

## JSON

The [SQLite JSON1 extension](https://www.sqlite.org/json1.html) is included for working with JSON data.

## `toml_to_json`

Scalar function that converts `toml` to `json`.

```SQL
SELECT toml_to_json('[some-toml]')

-- +-----------------------------+
-- | TOML_TO_JSON('[SOME-TOML]') |
-- +-----------------------------+
-- | {"some-toml":{}}            |
-- +-----------------------------+
```

## `xml_to_json`

Scalar function that converts `xml` to `json`.

```SQL
SELECT xml_to_json('<some-xml>hello</some-xml>')

-- +-------------------------------------------+
-- | XML_TO_JSON('<SOME-XML>HELLO</SOME-XML>') |
-- +-------------------------------------------+
-- | {"some-xml":"hello"}                      |
-- +-------------------------------------------+
```

## `yaml_to_json` and `yml_to_json`

Scalar function that converts `yaml` to `json`.

```SQL
SELECT yaml_to_json('hello: world')

-- +------------------------------+
-- | YAML_TO_JSON('HELLO: WORLD') |
-- +------------------------------+
-- | {"hello":"world"}            |
-- +------------------------------+
```

## `go_mod_to_json`

Scalar function that parses a `go.mod` file and returns a JSON representation of it.

```SQL
SELECT go_mod_to_json('<contents-of-go.mod-file>')
```

## `str_split`

Helper for splitting strings on some separator.

```sql
SELECT str_split('hello,world', ',', 0)

-- +----------------------------------+
-- | STR_SPLIT('HELLO,WORLD', ',', 0) |
-- +----------------------------------+
-- | hello                            |
-- +----------------------------------+
```

```sql
SELECT str_split('hello,world', ',', 1)

-- +----------------------------------+
-- | STR_SPLIT('HELLO,WORLD', ',', 1) |
-- +----------------------------------+
-- | world                            |
-- +----------------------------------+
```

## Enry Functions

Functions from the [`enry` project](https://github.com/go-enry/go-enry) are also available as SQL scalar functions

### `enry_detect_language`

Supply a file path and some source code to detect the language.

```sql
SELECT enry_detect_language('some/path/to/file.go', '<contents of file>')
```

### `enry_is_binary`

Given a blob, determine if it's a binary file or not (returns 1 or 0).

```sql
SELECT enry_is_binary('<contents of file>')
```

### `enry_is_configuration`

Detect whether a file path is to a configuration file (returns 1 or 0).

```sql
SELECT enry_is_configuration('some/path/to/file/config.json')
```

### `enry_is_documentation`

Detect whether a file path is to a documentation file (returns 1 or 0).

```sql
SELECT enry_is_documentation('some/path/to/file/README.md')
```

### `enry_is_dot_file`

Detect whether a file path is to a dot file (returns 1 or 0).

```sql
SELECT enry_is_dot_file('some/path/to/file/.gitignore')
```

### `enry_is_generated`

Detect whether a file path is generated (returns 1 or 0).

```sql
SELECT enry_is_generated('some/path/to/file/generated.go', '<contents of file>')
```

### `enry_is_image`

Detect whether a file path is to an image (returns 1 or 0).

```sql
SELECT enry_is_image('some/path/to/file/image.png')
```

### `enry_is_test`

Detect whether a file path is to a test file (returns 1 or 0).

```sql
SELECT enry_is_test('some/path/to/file/image.png')
```

### `enry_is_vendor`

Detect whether a file path is to a vendored file (returns 1 or 0).

```sql
SELECT enry_is_vendor('vendor/file.go')
```
