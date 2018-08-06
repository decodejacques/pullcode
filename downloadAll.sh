rsync -chazP --stats rsync://165.227.37.255:12000/files/ ./decode | sed 's%/[^/]*$%/%' | uniq -u
node sym.js