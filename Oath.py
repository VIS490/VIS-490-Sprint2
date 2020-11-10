import pyrebase
from os.path import join, dirname
from dotenv import load_dotenv
import os
 
dotenv_path = join(dirname(__file__), 'firebase.env')
load_dotenv(dotenv_path)

class Oauth:

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
    def __init__(self):
        self.firebase = pyrebase.initialize_app(self.firebaseConfig)
        self.auth = self.firebase.auth()
    def login_user(self,email , password):
        try:
            login = self.auth.sign_in_with_email_and_password(email, password)
            return True
        except:
            return False
    def sign_up (self,email , password):
        try:
            user = self.auth.create_user_with_email_and_password(email, password)
            return True
        except:
            return False   
    