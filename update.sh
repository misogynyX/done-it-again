#!/usr/bin/env bash
mkdir -p data

recent_files=`aws s3 ls ${AWS_S3_BUCKET}/news/ | awk '{print $4}' | sort | tail -n 180`
while IFS= read -r line; do
  if [ ! -f data/${line} ]; then
    aws s3 cp s3://${AWS_S3_BUCKET}/news/${line} data/
  fi
done <<< "${recent_files}"

gunzip -kf data/*.csv.gz
python cli.py tag_and_stats
