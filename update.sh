#!/usr/bin/env bash
mkdir -p docs/_data/

echo "Downloading files from S3..."
aws s3 sync s3://${AWS_S3_BUCKET}/done-it-again-analysis/ docs/_data/
