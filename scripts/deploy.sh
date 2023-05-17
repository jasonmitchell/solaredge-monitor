#! /bin/sh

export $(cat .env | xargs)

scp .build/index.js $SSH_ADDR:/usr/local/solaredge/
ssh $SSH_ADDR 'pm2 delete solaredge'
ssh $SSH_ADDR "API_KEY=$API_KEY SITE_ID=$SITE_ID pm2 start /usr/local/solaredge/index.js --name solaredge --time --update-env --cwd /usr/local/solaredge/"

