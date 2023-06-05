#! /bin/sh

export $(cat .env | xargs)

mkdir -p ./.remote/logs
scp -r $SSH_ADDR:~/.pm2/logs ./.remote/
