#!/usr/bin/env bash
mkdir -p data/

echo "Downloading files from S3..."
PREFIX="https://misogynyx.s3.ap-northeast-2.amazonaws.com/done-it-again-analysis"
curl -s "${PREFIX}/articles.csv" -o data/articles.csv
curl -s "${PREFIX}/stats.csv" -o data/stats.csv
curl -s "${PREFIX}/stats_daily.csv" -o data/stats_daily.csv
curl -s "${PREFIX}/stats_worst_cps.csv" -o data/stats_worst_cps.csv
curl -s "${PREFIX}/stats_best_cps.csv" -o data/stats_best_cps.csv
curl -s "${PREFIX}/stats_freq_tags.csv" -o data/stats_freq_tags.csv
