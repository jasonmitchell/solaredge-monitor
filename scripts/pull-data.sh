#! /bin/sh

export $(cat .env | xargs)

mkdir -p ./.remote/data
scp -r $SSH_ADDR:/usr/local/solaredge/data ./.remote/
