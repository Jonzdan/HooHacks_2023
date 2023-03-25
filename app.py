from flask import Flask, render_template , request , jsonify
from PIL import Image
import os , io , sys
from io import BytesIO
import numpy as np 
import cv2
import base64

app = Flask(__name__)

def Custom_OCR(full_path):
    return {"Salt":1.23,"Milk":2.33,"Tax:":0.66}

@app.route('/uploadImage' , methods=['POST'])
def uploadImage():

    # get request
    input_data = request.get_json()

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

    # make result
    if(len(records)>0):
        result = {  
                    'status':"True",
                    "file_name":file_name,
                    "records":records
                }
    else:
        result = {  
            'status':"False",
            "file_name":file_name
        }


    return result


if __name__ == '__main__':
    app.run(debug = False)