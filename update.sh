#!/usr/bin/env bash
gunzip -kf news/docs/data/*.csv.gz
poetry install
python cli.py tag
python cli.py stats

