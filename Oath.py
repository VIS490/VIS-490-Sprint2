import pyrebase
from os.path import join, dirname
from dotenv import load_dotenv
import os
 
dotenv_path = join(dirname(__file__), 'firebase.env')
load_dotenv(dotenv_path)
 
firebaseConfig  = {
    "apiKey": os.getenv("apiKey"),
    "authDomain": os.getenv("authDomain"),
    "databaseURL": os.getenv( "databaseURL"),
    "projectId": os.getenv("projectId"),
    "storageBucket": os.getenv("storageBucket"),
    "messagingSenderId": os.getenv("messagingSenderId"),
    "appId": os.getenv("appId"),
    "measurementId": os.getenv("measurementId"),
  }
 
firebase = pyrebase.initialize_app(firebaseConfig)
 
auth = firebase.auth()
 
 
email = input("Please Enter Your Email Address : \n")
password =input("enter in password: \n")


def login_user(email , password):
    try:
        login = auth.sign_in_with_email_and_password(email, password)
        print(login)
        print("success")
    except:
        print("error")
def sign_up (email , password):
    try:
        user = auth.create_user_with_email_and_password(email, password)
        print("Success .... ")
    except:
        print("error")      

    
 

login_user(email,password)
# sign_up(email,password)