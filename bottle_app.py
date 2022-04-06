from bottle import run, template, default_app
from bottle import get, post, route
from bottle import debug
from bottle import request, response, redirect
from bottle import static_file

# http://localhost:8080/.... <route>

import os
import json
import random
import string

def random_id():
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choices(characters, k=16))

def new_session():
    session_id = random_id()
    session = { 'session_id':session_id }
    os.makedirs('data/sessions', exist_ok=True)
    with open(f'data/sessions/{session_id}.session', 'w') as f:
        json.dump(session, f)
    response.set_cookie('session_id',session_id)
    return session

def load_session(request):
    session_id = request.get_cookie('session_id', default=None)
    try:
        if session_id == None:
            raise Exception('No session id cookie found.')
        os.makedirs('data/sessions', exist_ok=True)
        with open(f'data/sessions/{session_id}.session', 'r') as f:
            session = json.load(f)
    except Exception as e:
        print('session error:', e)
        session = new_session()
    print('loaded session', session)
    return session

def save_session(session, response):
    session_id = session['session_id']
    os.makedirs('data/sessions', exist_ok=True)
    with open(f'data/sessions/{session_id}.session', 'w') as f:
        json.dump(session, f)
    response.set_cookie('session_id',session_id)
    print('saved session', session)

#######

@get('/')
@get('/index')
def get_hello(name=None):
    session = load_session(request)
    print('index loaded session',session)
    if 'username' in session:
        username = session['username']
    else:
        username = 'unknown user'
    username = session.get('username','unknown user')
    betaBucks = session.get('betaBucks','???')
    print('saving loaded session',session)
    save_session(session, response)
    return template('index', name=username, bucks=betaBucks)

@get('/login')
def get_login():
    session = load_session(request)
    save_session(session, response)
    return template('login', message='')

@post('/login')
def post_login():
    session = load_session(request)
    username = request.forms['username']
    betaBucks = request.forms['betaBucks']
    session['betaBucks'] = betaBucks
    session['username'] = username
    save_session(session, response)
    redirect('/index')

@get('/NewSession')
def get_NewSession():
    session = load_session(request)
    save_session(session, response)
    return template('NewSession', message='')\

@get('/About')
def get_About():
    session = load_session(request)
    save_session(session, response)
    return template('About', message='')

@get('/GameInstructions')
def get_GameInstructions():
    session = load_session(request)
    save_session(session, response)
    return template('GameInstructions', message='')

@get('/JoinSession')
def get_JoinSession():
    session = load_session(request)
    save_session(session, response)
    return template('JoinSession', message='')

@get('/diceRoll')
def get_diceRoll():
    session = load_session(request)
    save_session(session, response)
    return template('diceRoll', message='')

@get('/info')
def get_info():
    session = load_session(request)
    save_session(session, response)
    return template('info', message='')

@route('./JS/<path:path>')
def server_static(path):
    return static_file(path, root='./JS/')

application = default_app()
#run(host='localhost', port=8068, reloader=True)
