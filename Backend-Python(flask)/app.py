import os,time
import pandas as pd
from flask import Flask, render_template,request,jsonify
from timeit import default_timer as timer
import json,requests
from flask_cors import CORS,cross_origin
from collections import Counter
import pandas as pd
import numpy as np 
import pickle
import pyodbc
import torch
from torch import nn
import torch.nn.functional as F
from torchvision import datasets, transforms
from PIL import Image



#Network Architecture  
# Build a feed-forward network
model = nn.Sequential(nn.Linear(784, 128),
                      nn.ReLU(),
                      nn.Linear(128, 64),
                      nn.ReLU(),
                      nn.Linear(64, 10),
                      nn.LogSoftmax(dim=1)) 



app = Flask(__name__)
CORS(app)
# Cross Origin Server
CORS(app, resources={r"/*": {"origins": "*"}}) 


#loading ML models
state_dict = torch.load("./Model/MINST.pth")
model.load_state_dict(state_dict)
#list of allowed File
ALLOWED_EXTENSIONS = set(['csv', 'pdf', 'json', 'txt', 'jpeg', 'gif','py','CSV','jpg'])

UPLOAD_FOLDER = os.path.basename('uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def load_json():
	path  = './inspect-request.json'
	json_data = json.load(open(path))
	return json_data

def application(environ, start_response):
  if environ['REQUEST_METHOD'] == 'OPTIONS':
    start_response(
      '200 OK',
      [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        ('Access-Control-Allow-Methods', 'POST'),
      ]
    )
    return ''

def image_to_data(image):
    image_data = np.array(image) / 255
    image_data = image_data.reshape((1, 28, 28))
    image_data = torch.from_numpy(image_data)
    image_data = image_data.float()
    return image_data

def post_request_DLP(data):
	url = "https://dlp.googleapis.com/v2/projects/dlp-service/content:inspect"
	headers = {'Content-type': 'application/json','Authorization':'Bearer ya29.c.El9WBgyhBTkiQ4ftVQ1a0Hp1TZxKBtCQ6yov5U5pT5z1xqbvbaf4X4YRQDF_PTCUqWROK2Bz5XHjPUn3aTweSlcaIcMDus5W85HaSwGUl400-8sla7ZmHIanT3NwZBkUew'}
	r = requests.post(url, data=json.dumps(data), headers=headers)
	return r.json()

def retrive_infoTypes(findings):
	infoTypes=[]
	for value in findings:
		infoTypes.append(value['infoType']['name'])
	return infoTypes

def clean_infoTypes(infoTypes):
	infoType = pd.Series(infoTypes)
	return infoType.value_counts()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
def predict_file(file):
	df_result = pd.DataFrame()
	df = pd.read_csv(file)
	x_counts = ser_countvect.transform(df['Data'])
	predicted_results = ser_prec.predict(x_counts)
	df_result['Data']=df['Data']
	df_result['prediction']=pd.Series(predicted_results).values
	return (df_result.reset_index().to_json(orient='records'))

def predict_image(file):
	#file = (open(file, 'r'))
	data = image_to_data(file)
	img = data.view(1, 784)
	with torch.no_grad():
		logps = model(img)
	ps = torch.exp(logps)
	ps = ps.numpy()
	ps = ps.tolist()
	app.logger.info(ps)
	return ps

def data_mask(df):
	if (df['PII-Mobile_number']== 'PII-Person_name'):
		return "Bob"
	elif(df['PII-Mobile_number']== 'PII-Identification_num') :
		return "0000000000"
	elif(df['PII-Mobile_number']== 'PII-Email') :
		return "abcxyz@pqr.com"
	elif(df['PII-Mobile_number']== 'PII-Mobile_number') :
		return "000-999-1234"
	elif(df['PII-Mobile_number']== 'PII-SSN') :
		return "111-11-1111"
	elif(df['PII-Mobile_number']== 'PII-password') :
		return "password"
	elif(df['PII-Mobile_number']== ' PII-credit_card') :
		return "4444444411112222"
	elif(df['PII-Mobile_number']== ' PII-City') :
		return "qprst"
	elif(df['PII-Mobile_number']== ' PII-State') :
		return "wakanda"
	elif(df['PII-Mobile_number']== ' PII-zip_code') :
		return "98765"


@app.route('/')
def index():
	return jsonify(results='Helloworld')

@app.route('/datatag',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def datatag():
	if request.method=='POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			image = Image.open(file)
			df = predict_image(image)
			app.logger.info(df)
			# return (df)
			return jsonify(
                [
                {'sucess': df[0]
                }
                ])
		else:
			return jsonify(
                [
                {'Error':'file not supported'

                }
                ])
	else:
		return jsonify(
                [
                {'Error':'method not supported'

                }
                ])

@app.route('/datamask',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def datamask():
	if request.method=='POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			df = pd.read_csv(file)
			df['masked'] = df.apply(data_mask,axis=1)
			df = df.reset_index().to_json(orient='records')
			app.logger.info(df)
			app.logger.info("The size of the file is {}".format((file.content_type)))
			return (df)
			# return jsonify(
            #     [
            #     {'sucess': file.filename
            #     }
            #     ])
		else:
			return jsonify(
                [
                {'Error':'file not supported'

                }
                ])
	else:
		return jsonify(
                [
                {'Error':'method not supported'

                }
                ])

@app.route('/retrieve')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def retrieve():
	cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
	cursor = cnxn.cursor()
	cursor.execute("select * from dbo.processed_file")
	reports = cursor.fetchall()
	result = []
	for row in reports:
		result.append([x for x in row])
	return jsonify(result)
@app.route('/artificial_data_gen',methods=['POST','GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def artificial_data():
	cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
	cursor = cnxn.cursor()
	table_values = cursor.execute('select * from dbo.artificial_data')
	reports = cursor.fetchall()
	result = []
	for row in reports:
		result.append([x for x in row])
	return jsonify(result)



@app.route('/predict',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def predict():
	result=request.get_json()
	#print("The result value is {}".format(result['privacydata']))
	#data = load_json()
	#data['item']['value']=result['privacydata']
	try:
		privacydata = result['privacydata']
		privacydata = privacydata.split()
		x_count = ser_countvect.transform(privacydata)
		result = ser_prec.predict(x_count)

		app.logger.info(result)
		return jsonify(
                [
                {'infotypes':result

                }
                ])
	except:
		print("No infoTypes found ")
		return jsonify(error='No findinds found')

@app.route('/json_data',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def api_call():
	result=request.get_json()
	#print("The result value is {}".format(result['privacydata']))
	data = load_json()
	data['item']['value']=result['privacydata']
	try:
		result = post_request_DLP(data)
		with open('data.json', 'w') as outfile:
			json.dump(result, outfile)
		infoTypes = retrive_infoTypes(result['result']['findings'])
		infoType = clean_infoTypes(infoTypes)
		print(infoType)
		return jsonify(infoType.to_json())
	except:
		print("No infoTypes found ")
		return jsonify(error='No findinds found')

@app.route('/file_upload',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def file_upload():
	result=request.get_json()
	data = load_json()
	str1 = 'My Name is steve jobs and can be reachable at 806-853-1430'
	data['item']['value']=str1
	try:
		result = post_request_DLP(data)
		with open('data.json', 'w') as outfile:
			json.dump(result, outfile)
		infoTypes = retrive_infoTypes(result['result']['findings'])
		infoType = clean_infoTypes(infoTypes)
		print(infoType)
		return jsonify(infoType.to_json())
	except:
		print("No infoTypes found ")
		return jsonify(error='No findinds found')
@app.route('/json_file',methods=['GET','POST'])
def send_json():
	data = load_json()
	return jsonify(data)

@app.route('/visualize',methods=['GET','POST'])
def visualize():
	R = requests.get('http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22')
	return jsonify(R.json())

@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.debug = True
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
