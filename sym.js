const createSymlink = require('create-symlink');
const fs = require('fs');

function searchThrough(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, files) {
    if (err) {
      return console.error(error);
    }
    let i = 0;
    (function next() {
      let file = files[i++];
      if (!file) {
        return done(results);
      }
      file = dir + '/' + file;
      if (file.includes('node_modules')) {
        next();
        return;
      }
      fs.stat(file, function(err, stat) {
        if (err) {
          return console.error(err);
        }
        if (stat && stat.isDirectory()) {
          searchThrough(file, res => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

function link(files) {
  files.forEach(filePath => {
    if (filePath && filePath.includes('package.json')) {
      filePath = filePath.substring(0, filePath.indexOf('package.json'));
      const NODE_MODULES = `${__dirname}/node_modules`;
      console.log(`Creating symlink to ${NODE_MODULES} in each directory...`);
      createSymlink(NODE_MODULES, filePath + '/node_modules', { type: 'junction' })
        .catch(err => {
          if (err.code !== 'EEXIST') {
            console.error(err);
          }
        })
        .then(() => console.log('Done!'));
    }
  });
}

searchThrough('.', files => link(files));
