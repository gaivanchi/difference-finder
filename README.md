### Hexlet tests and linter status:
[![Actions Status](https://github.com/gaivanchi/difference-finder/workflows/hexlet-check/badge.svg)](https://github.com/gaivanchi/difference-finder/actions)
[![Actions Status](https://github.com/gaivanchi/difference-finder/actions/workflows/github-check.yml/badge.svg)](https://github.com/gaivanchi/difference-finder/actions/workflows/github-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/492b7a99fd241be05f6b/maintainability)](https://codeclimate.com/github/gaivanchi/difference-finder/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/492b7a99fd241be05f6b/test_coverage)](https://codeclimate.com/github/gaivanchi/difference-finder/test_coverage)

## Description
Difference Finder is a program that determines the difference between two data structures. Utility Features:

&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Support for different input formats: JSON, YAML (YML)  
&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;Output in plain text, stylish (default), and JSON format

## Setup
```sh
make install
```

## Start
```sh
gendiff --format stylish path/to/file1.json another/path/file2.json
gendiff -f plain file1.yml file2.json
gendiff file1.json file2.yaml --format json
```

## Demo
#### Compare flat JSON files:
[![asciicast](https://asciinema.org/a/QBC7umYB53UOvpodO0lZjkJbt.svg)](https://asciinema.org/a/QBC7umYB53UOvpodO0lZjkJbt)

#### Compare flat YAML files:
[![asciicast](https://asciinema.org/a/FIi8qQj7q0MIQ1KZh2DPt92ZF.svg)](https://asciinema.org/a/FIi8qQj7q0MIQ1KZh2DPt92ZF)

#### Compare nested files ("stylish" format):
[![asciicast](https://asciinema.org/a/pc4zYB0IXeYIK3cJOGl3km14z.svg)](https://asciinema.org/a/pc4zYB0IXeYIK3cJOGl3km14z)

#### Compare nested files ("plain" format):
[![asciicast](https://asciinema.org/a/Gnyi47AaxFrEmBcbzbvRY2kmV.svg)](https://asciinema.org/a/Gnyi47AaxFrEmBcbzbvRY2kmV)

#### Compare nested files ("json" format):
[![asciicast](https://asciinema.org/a/06GPxiGNJzfJyop1YCbHUOxuR.svg)](https://asciinema.org/a/06GPxiGNJzfJyop1YCbHUOxuR)
