#!/bin/bash

docker run --rm \
  --name mongodb-local \
  -p 27017:27017 \
  -d mongo