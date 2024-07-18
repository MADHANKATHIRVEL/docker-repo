#!/bin/bash
cd /var/www/html
rm -rf node_modules
npm install -f && npm install -g pm2
rm -rf .next
#npm run build
#cd /var/www/html && pm2 start 'npm run start'
#sudo pm2 restart 0
