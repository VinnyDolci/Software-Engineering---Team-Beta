import os 
import json
import random
import string
from bottle import request, response

def random_id():
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choices(characters, k=12))

x = random_id()

print(x)