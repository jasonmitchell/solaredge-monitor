#! /bin/sh

export $(cat .env | xargs)
node .build/index.js

