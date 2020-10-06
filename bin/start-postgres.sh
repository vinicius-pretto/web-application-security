#!/bin/bash

docker run --rm \
  --name postgres-local \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=web_application_security \
  -d postgres