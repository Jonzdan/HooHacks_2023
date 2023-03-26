from flask import Flask, render_template , request , jsonify
from PIL import Image
import os , io , sys
import pymongo
import json
import re
import config as cfg
from datetime import datetime,date, timedelta
from pymongo import MongoClient
from io import BytesIO
import numpy as np 
import cv2
import base64
import pytesseract
import re

app = Flask(__name__)

pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
cluster = MongoClient(cfg.configurations['MongoClient'])
db=cluster[cfg.configurations['db']]
collection = db[cfg.configurations['collection']]


def letterify(input):
  l2=[]
  for idx,i in enumerate(input):
    if i.isalpha()==True or i.isspace()==True:
      l2.append(i)
  return ''.join(l2)


def Custom_OCR(full_path):
    img = cv2.imread(full_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)

    # Preprocessing the text starts    
    list1 = [l.split(' ') for l in text.splitlines()]

    #gets purchased items of the bill
    items={}
    for li in list1:
        if re.search("^\d+\.",li[-1])!=None and re.search("[a-z A-Z]",li[0])!= None:
            items[' '.join(li[0:-1])] = float(li[-1])


    removal_list=[]
    add_to = {}
    for key,v in items.items():
        if all(chr.isalpha() or chr.isspace() for chr in key)==False:
            add_to[letterify(key)]=v
            removal_list.append(key)
        if "SUBTOTAL" in key or "CASH" in key:
            removal_list.append(key)


    items.update(add_to)
    for keys in removal_list:
        del items[keys]

    return items
    #return {"Salt":1.23,"Milk":2.33,"Tax:":0.66}


@app.route('/uploadImage' , methods=['POST'])
def uploadImage():

    # get request
    input_data = request.get_json()
    #print(input_data['image'], file=sys.stderr)
    #print(input_data['image_name'], file=sys.stderr)
    # get data from request
    try:
        file = Image.open(BytesIO(base64.b64decode(input_data['image']))) ## byte file
        file_name = input_data['image_name']
        full_path = "Backend/Uploaded_Images/"+file_name
        
    except:
        result = {"error": "There is an error in sending data to the API endpoint."}
        return result
    
    # save file now
    try:
        file.save(full_path)
    except:
        result = {"error": "There is an error in saving the file."}
        return result

    # pass file to OCR
    
    records = Custom_OCR(full_path)
    #print(records, full_path, file=sys.stderr)

    # make result
    if(len(records)>0):
        result = {  
                    'status':"True",
                    "file_name":file_name,
                    "result":records
                }
    else:
        result = {  
            'status':"False",
            "file_name":file_name
        }


    return result


@app.route('/uploadData' , methods=['POST'])
def uploadData():
    # get request
    input_data = request.get_json()

    # get data from request
    try:
        document = input_data['result']
    except:
        result = {"error": "There is an error in sending data to the API endpoint."}
        return result
    
    # get date and time.
    now = datetime.now()
    date = now.strftime("%y-%m-%d")
    time = now.strftime("%H:%M:%S")

    # Add into database        
    try:
        post={"data":document,"date":date, "time":time}    
        collection.insert_one(post)

        result = {  
            'status':"True"
                }
    except: 
        result = {  
            'status':"False"
                }
    
    return result


@app.route('/getData' , methods=['POST'])
def getData():
    # get request
    input_data = request.get_json()
    # get data from request
    try:
        range = input_data['range']
        if range in ['Today','This Week','This Year']:
            pass
        else:
            result = {"error": "Date range is not valid."}
            return result

    except:
        result = {"error": "There is an error in sending data to the API endpoint."}
        return result

    if(range=='Today'):
        now = datetime.now()
        range = now.strftime("%y-%m-%d")
        db_result = collection.find({"date":range})

    elif(range=='This Week'):
        today = date.today()
        start = today - timedelta(days=today.weekday())        
        end = start + timedelta(days=6)
        start = str(start)[2:]
        end = str(end)[2:]
        db_result = collection.find({"date": {"$gte": start, "$lte": end}})        

    else:
        today = date.today()
        year=str(today.year)
        year = re.compile(year[2:]+".*", re.IGNORECASE)        
        db_result = collection.find({"date": year})
    
    result=[]
    for x in db_result:
        temp={}
        if('data' in x):
            temp['data']=x['data']
        if('date' in x):
            temp['date']=x['date']
        if('time' in x):
            temp['time']=x['time']        
        result.append(temp)

    if len(result)>0:
        return result
    else:
        result = {"status": "No Data Found."}
        return result

@app.route('/getChartData' , methods=['POST'])
def getChartData():
    # get request
    input_data = request.get_json()
 
    # get data from request
    try:
        range = input_data['range']
        if range in ['Today','This Week','This Year']:
            pass
        else:
            result = {"error": "Date range is not valid."}
            return result

    except:
        result = {"error": "There is an error in sending data to the API endpoint."}
        return result

    if(range=='Today'):
        now = datetime.now()
        range = now.strftime("%y-%m-%d")
        db_result = collection.find({"date":range})

    elif(range=='This Week'):
        today = date.today()
        start = today - timedelta(days=today.weekday())        
        end = start + timedelta(days=6)
        start = str(start)[2:]
        end = str(end)[2:]
        db_result = collection.find({"date": {"$gte": start, "$lte": end}})        

    else:
        today = date.today()
        year=str(today.year)
        year = re.compile(year[2:]+".*", re.IGNORECASE)        
        db_result = collection.find({"date": year})
    
    result={}
    for x in db_result:
        if('data' in x):
            for i in x['data']:
                if i.lower()!='total':
                    if i not in result:
                        result[i]=float(x['data'][i])
                    else:
                        result[i]+=float(x['data'][i])

    if len(result)>0:
        return result
    else:
        result = {"status": "No Data Found."}
        return result
    
if __name__ == '__main__':
    app.run(debug = True)
