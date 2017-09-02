let python = require('python-shell');

class PythonController {

  train(options) {
    return new Promise((resolve, reject) => {
      python.run('converter/train.py', options, (err, res) => {
        if (err)
          return reject(err);
        else 
          return resolve(res);
      });
    })
  }

  convert(options) {
    return new Promise((resolve, reject) => {
      python.run('converter/convert.py', options, (err, res) => {
        if (err)
          return reject(err);
        else 
          return resolve(null, res);
      });
    });
  }
}

module.exports = PythonController;
