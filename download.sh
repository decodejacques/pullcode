if [ ! -f ta-name.txt ]; then
    echo "your ta-name.txt file should contain your name in one word"
    exit 1
fi

if [ ! -f key.json ]; then
    echo "You need the key.json file. Get it from jacques or another TA"
    exit 1
fi

username_d=`cat ta-name.txt`
nodejs log.js $username_d $1
rsync -chazP --stats rsync://165.227.37.255:12000/files/$1 ./decode/ | sed 's%/[^/]*$%/%' | grep $1 | uniq -u
node sym.js $1