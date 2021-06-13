#!/bin/bash


#----------------------------------
# install the node server
#----------------------------------
cd /home/ubuntu/BASE/server
npm install

# cp /home/ubuntu/server/.env /var/www/node/.env

#start Node server for social media apis
# systemctl start nodejs


#----------------------------------
# build the client app
#----------------------------------

cd /var/www/client
npm install
quasar build

