#!/bin/bash


#----------------------------------
# install the node server
#----------------------------------
cp /home/ubuntu/env/envBASEServer /home/ubuntu/BASE/IHP/server/.env

cd /home/ubuntu/BASE/IHP/server
npm install


#----------------------------------
# build the client app
#----------------------------------
cp /home/ubuntu/env/envBASEClient /home/ubuntu/BASE/IHP/client/.env

cd /home/ubuntu/BASE/IHP/client
npm install
quasar build

# copy bundle to the public directory
cp /home/ubuntu/BASE/IHP/client/dist/spa/* /home/ubuntu/BASE/IHP/server/public


#start Node server for social media apis
systemctl start nodejs


