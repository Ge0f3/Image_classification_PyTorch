
# UDA_PILOT BACK END SERVICE


# Deploying the app With Docker
Assume you have [Docker](https://www.docker.com/) Installed.

First fork or clone this repo:

usign `git clone https://github.com/Ge0f3/UDA_PILOT.git`

After cloning the repository go inside the project folder:

`cd UDA_PILOT/udp-flask`

Build docker using  `docker build -t backend:latest .` After deploy the app using `docker run -d -p 5000:5000 backend`

In your browser navigate to: `http://localhost:5000`(or whatever port you have mention in the docker build) to see the app up and running 

# Working without docker
I highly recommend the use of docker as it is far simpler to get started than to run all of the following manually.

**To Deploy Without Docker**

Assume you have [Python](https://github.com/python)installed.
- Navigate inside the directory
- Install pip dependencies: `pip install -r requirements.txt`
- Run `python app.py` to see the app up and running (will watch files and restart server on port 5000 on change)
# Built With
- [Scikit](http://scikit-learn.org/stable/index.html) - scikit-learn is a Python framework for machine learning
- [Flask](http://flask.pocoo.org/) - Flask is a microframework for Python

