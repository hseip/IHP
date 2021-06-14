#!/bin/bash


#----------------------------------
# install the node server
#----------------------------------
cp /home/ubuntu/env/envBASEServer /home/ubuntu/BASE/server/.env

cd /home/ubuntu/BASE/server
npm install

if [ ! -d "$public" ]; then
  # Control will enter here if $public doesn't exist.
  mkdir public
fi


#----------------------------------
# build the client app
#----------------------------------
cp /home/ubuntu/env/envBASEClient /home/ubuntu/BASE/client/.env

cd /home/ubuntu/BASE/client
npm install
quasar build

#start Node server for social media apis
systemctl start nodejs


