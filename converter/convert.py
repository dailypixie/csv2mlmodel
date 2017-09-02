import coremltools
import sys
import os

import svmutil

# vars
ios_extension = '.mlmodel'
raw_extension = '.model'

cwd = os.getcwd()
filename = sys.argv[1].split('.')[0]

model = svmutil.svm_load_model('models/raw/' + filename + raw_extension)

# core ml model conversion
coreml_model = coremltools.converters.libsvm.convert(model, input_names=['x', 'y']);
coreml_model.save('models/' + filename + ios_extension);
