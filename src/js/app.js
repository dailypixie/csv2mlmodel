Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  success: function(file, result) {
    let filename = file.name.split('.')[0] + '.mlmodel';
    let blob64 = btoa(result);
    let blob = new Blob([blob64]);
    saveAs(blob, filename);
  }
};
