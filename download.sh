rsync -chavzP --stats rsync://165.227.37.255:12000/files/$1 ./decode
node sym.js $1