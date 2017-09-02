import sys
import os
import csv
import svmutil

# vars
raw_extension = '.model'

cwd = os.getcwd()
path = cwd + '/data/' + sys.argv[1]

filename = sys.argv[1].split('.')[0]

labels = []
values = []

# data reader
trainingData = open(path, "r")  

trainingDataReader = csv.reader(trainingData, delimiter=' ', quotechar='|')

for row in trainingDataReader:
  row = map(int, row)
  labels.append(row.pop())
  values.append(row)

# problem definition
problem = svmutil.svm_problem(labels, values)

# param
param = svmutil.svm_parameter()
param.kernel_type = svmutil.EPSILON_SVR
# param.C = 10

# model training
model = svmutil.svm_train(problem, param)

svmutil.svm_save_model('models/raw/' + filename + raw_extension, model)
