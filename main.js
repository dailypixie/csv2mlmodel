let express = require('express');
let morgan = require('morgan');
let fileup = require('express-fileupload');

let path = require('path');
let fs = require('fs');

let PythonController = require('./PythonController.js');
let app = express();

let dataPath = path.resolve(__dirname, 'data');
let modelPath = path.resolve(__dirname, 'models');



try {
  fs.mkdirSync(dataPath);
} catch(err) {
  console.log(err);
}

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(fileup({}));

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  var filepath = path.resolve(dataPath, req.files.file.name);
  fs.writeFile(filepath, req.files.file.data, async (err) => {
    let py = new PythonController();
    if(err)
      return res.send(500);
    else {
      try {
        await py.train({
          mode: 'text',
          args: [req.files.file.name]
        })
        await py.convert({
          mode: 'text',
          args: [req.files.file.name]
        });
      } catch(err) {
        return res.end(500);
      }
      let filename = req.files.file.name.split('.')[0] + '.mlmodel';
      filename = path.resolve(__dirname + '/models', filename);
      res.download(filename);
    }
  });
});

app.post('/train/:filename', (req, res) => {
  let filename = req.params.filename + '.csv';
  let py = new PythonController();

  let options = {
    mode: 'text',
    args: [filename]
  };

  // first train
  py.train(options)
    .then((result) => res.end())
    .catch((err) => res.status(500).end());
})

app.post('/convert/:filename', (req, res) => {
  let filename = req.params.filename + '.model';
  let py = new PythonController();

  let options = {
    mode: 'text',
    args: [filename]
  };

  py.convert(options).then((result) => {
    let modelName = filename.split('.')[0] + '.mlmodel';
    let modelFile = path.resolve(modelPath, modelName);
    res.download(modelFile);
  }).catch((err) => res.status(500).end());;
});


app.get('/download/:filename', (req, res) => {
  let filename = req.params.filename + '.mlmodel';
  filename = path.resolve(__dirname + '/models', filename);
  if (fs.existsSync(filename))
    res.download(filename);
  else
    res.send(404);
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening to port: ' + port);
