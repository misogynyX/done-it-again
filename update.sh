#!/usr/bin/env bash
poetry install
python cli.py tag
python cli.py stats

