#!/bin/bash

DB_SAMPLE_FILE=./db/data.json.sample
DB_FILE=./db/data.json

if test -f "$DB_FILE"; then
  echo "$DB_FILE already exists. New data will be stored there."
else
  cp "$DB_SAMPLE_FILE" "$DB_FILE"
fi
