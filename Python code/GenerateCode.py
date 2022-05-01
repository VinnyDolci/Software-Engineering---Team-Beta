import json
import os
import random
import string
import sys

from bottle import request, response

def random_id():
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choices(characters, k=12))

x = random_id()

def test_random_id(y):
    assert len(y) == 12
    assert y.isalnum()

test_random_id(x)

print(x)