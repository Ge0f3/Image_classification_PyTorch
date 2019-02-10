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
# TensorFlow and tf.keras
import tensorflow as tf
import keras
from keras.models import load_model
from PIL import Image



#Network Architecture  
# Build a feed-forward network
# model = nn.Sequential(nn.Linear(784, 128),
#                       nn.ReLU(),
#                       nn.Linear(128, 64),
#                       nn.ReLU(),
#                       nn.Linear(64, 10),
#                       nn.LogSoftmax(dim=1)) 



app = Flask(__name__)
CORS(app)
# Cross Origin Server
CORS(app, resources={r"/*": {"origins": "*"}}) 


#loading ML models
model = load_model("./Model/MNSIT_Digit.h5")
model._make_predict_function()
graph = tf.get_default_graph()
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

# def image_to_data(image):
#     image_data = np.array(image) / 255
#     image_data = image_data.reshape((1, 28, 28))
#     image_data = torch.from_numpy(image_data)
#     image_data = image_data.float()
#     return image_data

def image_to_data(image):
	image_data = image.reshape((1, 28, 28))
	app.logger.info("The shape of the image is {}".format(image_data.shape))
	prediction = model.predict(image_data)
	return np.argmax(prediction)



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


# def predict_image(file):
# 	#file = (open(file, 'r'))
# 	data = image_to_data(file)
# 	img = data.view(1, 784)
# 	with torch.no_grad():
# 		logps = model(img)
# 	ps = torch.exp(logps)
# 	ps = ps.numpy()
# 	ps = ps.tolist()
# 	app.logger.info(ps)
# 	return ps



@app.route('/')
def index():
	return jsonify(results='Helloworld')

@app.route('/datatag',methods=['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def datatag():
	if request.method=='POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			image = np.array((Image.open(file)))/255
			result = image_to_data(image)
			result = result.item()
			app.logger.info("The prediction is {}".format(result))
			# return (df)
			return jsonify(
                [
                {'sucess': result
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

@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.debug = True
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
