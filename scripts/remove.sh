#! /bin/sh

export $(cat .env | xargs)

ssh $SSH_ADDR 'pm2 delete solaredge'