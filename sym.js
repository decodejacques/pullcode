const createSymlink = require('create-symlink');
const fs = require('fs');

const NODE_MODULES = `${__dirname}\\node_modules`;

function searchThrough(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.error(err);
      return;
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
  console.log(`Creating symlink to ${NODE_MODULES} in each directory...`);
  files.forEach(filePath => {
    if (filePath && filePath.includes('package.json')) {
      filePath = filePath.substring(0, filePath.indexOf('package.json'));
      if (fs.existsSync(filePath + '/node_modules')) {
        return;
      }
      createSymlink(NODE_MODULES, filePath + '/node_modules', { type: 'junction' }).catch(err => {
        if (err.code !== 'EEXIST') {
          console.error(err);
        }
      });
    }
  });
  console.log('Done!');
}
searchThrough('./decode/' + process.argv[2], files => link(files));
