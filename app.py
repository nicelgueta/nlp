from flask import Flask,jsonify,request
import json
import pandas as pd
import time

app = Flask(__name__)

@app.route('/getd')
def getd():
    filepath = r'C:\Users\Nelg\Documents\test emails\testemails.csv'
    df = pd.read_csv(filepath)
    retJson = df.T.to_dict().values()
    r = [item for item in retJson]
    time.sleep(3)
    return jsonify(r)


@app.route('/getcsvjson',methods=['GET','POST'])
def getcsvjson():
    fil = request.files['csvFile']
    df = pd.read_csv(fil,encoding='latin_1')
    df = df.where((pd.notnull(df)), None)
    print(df)
    retJson = df.T.to_dict().values()
    r = [item for item in retJson]
    r = json.dumps(r)
    return jsonify(r)

app.run(debug=True)
