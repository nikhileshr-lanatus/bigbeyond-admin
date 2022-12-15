# cd /home/ubuntu/server
# npm start
# pm2 start npm --name "covidapp" -- start
# pm2 startup 

sudo su -

sudo pm2 stop all

cd /root/BigBeyond/big-beyond-admin-v1

sudo pm2 serve build 3001 --spa

sudo pm2 restart all

sudo pm2 save


