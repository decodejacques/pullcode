const createSymlink = require('create-symlink');
var fs = require('fs');

var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      if (file.includes('node_modules')) { next(); return }
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
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
};

function proc(lst) {
  lst.forEach(path => {
    if (path.includes('package.json')) {
  
      path = path.substring(0, path.indexOf('package.json'));
      console.log(path);
      createSymlink(__dirname + '/node_modules', path + '/node_modules', { type: 'junction' }).then(() => {
         // Created a junction point (Windows only)
       });
    }
  })
}

walk('.', (a, lst) => proc(lst))
// createSymlink('../../nodecache/node_modules', '../testing-node-cache/node_modules', {type: 'junction'}).then(() => {
//     // Created a junction point (Windows only)
//   });