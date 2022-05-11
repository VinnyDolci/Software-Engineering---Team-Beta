from bottle import run, template, default_app
from bottle import get, post, route, hook
from bottle import debug
from bottle import request, response, redirect
from bottle import static_file


# http://localhost:8080/.... <route>

import os
import json
import random
import string
import time

usersIn = []

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

def createGame(gameID):
    session = load_session(request)
    username = session['username']
    bucks = session['betaBucks']
    os.makedirs('data/games', exist_ok=True)
    with open(f'data/games/{gameID}-users.txt', 'a+') as g:
        g.write('user0 ' + str(username))
    with open(f'data/games/{gameID}-bucks.txt', 'a+') as b:
        b.write('user0 ' + str(bucks))
    with open(f'data/games/{gameID}-gameInfo.txt', 'a+') as a:
        a.write('currentUser 0\npot 0')
    print('Game Created | ', gameID)
    session['currentUser'] = 0
    session['pot'] = 0
    session['playerIndex'] = 0
    save_session(session, response)

def joinGame(gameID):
    print('Joining Game........................................................')
    index = 0
    session = load_session(request)
    username = session['username']
    bucks = session['betaBucks']
    with open(f'data/games/{gameID}-users.txt', 'a+') as g:
        print('Users Opened')
        g.seek(0)
        readGame = g.read()
        if 'user0' in readGame:
            index += 1
        if 'user1' in readGame:
            index += 1
        if 'user2' in readGame:
            index += 1
        if 'user3' in readGame:
            index += 1
        g.write('\nuser' + str(index) + ' ' + str(username))
    index = 0
    with open(f'data/games/{gameID}-bucks.txt', 'a+') as b:
        print('Bucks Opened')
        b.seek(0)
        readBucks = b.read()
        if 'user0' in readBucks:
            index += 1
        if 'user1' in readBucks:
            index += 1
        if 'user2' in readBucks:
            index += 1
        if 'user3' in readBucks:
            index += 1
        b.write('\nuser' + str(index) + ' ' + str(bucks))
    with open(f'data/games/{gameID}-gameInfo.txt', 'a+') as a:
        a.seek(0)
        a.seek(12)
        session['currentUser'] = a.read(1)
        a.seek(18)
        session['pot'] = a.read(1)
    session['playerIndex'] = str(index)
    save_session(session, response)
    print('Game Joined : ', gameID)


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
def get_NewSession(gameID=None):
    session = load_session(request)
    save_session(session, response)
    return template('NewSession', message='')

@post('/NewSession')
def post_NewSession():
    session = load_session(request)
    gameID = request.forms['gameID']
    session['gameID'] = gameID
    save_session(session, response)
    createGame(gameID)
    time.sleep(.5)
    response.set_cookie('gameID',gameID)
    redirect('/diceRoll')

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

@post('/JoinSession')
def post_JoinSession():
    session = load_session(request)
    gameID = request.forms['gameID']
    session['gameID'] = gameID
    save_session(session, response)
    joinGame(gameID)
    time.sleep(.5)
    redirect('/diceRoll')


@get('/JoinSession')
def get_JoinSession():
    session = load_session(request)
    save_session(session, response)
    return template('JoinSession', message='')

@post('/updateValues')
def updateValues():
    session = load_session(request)
    gameID = session['gameID']

    #rawInfo = json.load(request.forms.get('data'))
    rawInfo = request.json

    user0Name = rawInfo['user0Name']
    user0Bucks = rawInfo['user0Bucks']
    user1Name = rawInfo['user1Name']
    user1Bucks = rawInfo['user1Bucks']
    user2Name = rawInfo['user2Name']
    user2Bucks = rawInfo['user2Bucks']
    user3Name = rawInfo['user3Name']
    user3Bucks = rawInfo['user3Bucks']
    user4Name = rawInfo['user4Name']
    user4Bucks = rawInfo['user4Bucks']

    currentUser = rawInfo['current']
    pot = rawInfo['sizeOfPot']

    print('--------------------------------------------------------------')
    print(currentUser)
    print(pot)
    print('--------------------------------------------------------------')

    session['user0Name'] = user0Name
    session['user0Bucks'] = user0Bucks
    session['user1Name'] = user1Name
    session['user1Bucks'] = user1Bucks
    session['user2Name'] = user2Name
    session['user2Bucks'] = user2Bucks
    session['user3Name'] = user3Name
    session['user3Bucks'] = user3Bucks
    session['user4Name'] = user4Name
    session['user4Bucks'] = user4Bucks
    session['currentUser'] = currentUser
    session['pot'] = pot


    with open(f'data/games/{gameID}-bucks.txt', 'w') as g:
        g.seek(0)
        #lines = g.readlines()

        if user1Bucks == "":
            lines = ["user0 " + str(user0Bucks)]
        elif user2Bucks == "":
            lines = ["user0 " + str(user0Bucks), "\nuser1 " + str(user1Bucks)]
        elif user3Bucks == "":
            lines = ["user0 " + str(user0Bucks), "\nuser1 " + str(user1Bucks), "\nuser2 " + str(user2Bucks)]
        elif user4Bucks == "":
            lines = ["user0 " + str(user0Bucks), "\nuser1 " + str(user1Bucks), "\nuser2 " + str(user2Bucks), "\nuser3 " + str(user3Bucks)]
        else:
            lines = ["user0 " + str(user0Bucks), "\nuser1 " + str(user1Bucks), "\nuser2 " + str(user2Bucks), "\nuser3 " + str(user3Bucks), "\nuser4 " + str(user4Bucks)]

        g.writelines(lines)

    with open(f'data/games/{gameID}-users.txt', 'w') as u:
        u.seek(0)
        if user1Name == "":
            userlines = ["user0 " + str(user0Name)]
        elif user2Name == "":
            userlines = ["user0 " + str(user0Name), "\nuser1 " + str(user1Name)]
        elif user3Name == "":
            userlines = ["user0 " + str(user0Name), "\nuser1 " + str(user1Name), "\nuser2 " + str(user2Name)]
        elif user4Name == "":
            userlines = ["user0 " + str(user0Name), "\nuser1 " + str(user1Name), "\nuser2 " + str(user2Name), "\nuser3 " + str(user3Name)]
        else:
            userlines = ["user0 " + str(user0Name), "\nuser1 " + str(user1Name), "\nuser2 " + str(user2Name), "\nuser3 " + str(user3Name), "\nuser4 " + str(user4Name)]

        u.writelines(userlines)

    with open(f'data/games/{gameID}-gameInfo.txt', 'w+') as a:
        a.seek(0)
        a.write("currentUser " + str(currentUser) + "\npot " + str(pot))

    # IDEA
    # Create a cookie for each user's betaBucks in the Get for /diceRoll
    # Modify those cookies in Javascript:  document.cookie = "username=Max Brown"
    # Access and use those cookies to rewrite the txt file in python: response.set_cookie('session_id',session_id)
    # The AJAX call then only needs to invoke this /updateValues function
    # This SHOULD work. but who knows.

    save_session(session, response)
    #return template('diceRoll', gameID=gameID, player0Name=user0Name, player1Name=user1Name, player2Name=user2Name, player3Name=user3Name, player4Name=user4Name, player0Bucks=user0Bucks, player1Bucks=user1Bucks, player2Bucks=user2Bucks, player3Bucks=user3Bucks, player4Bucks=user4Bucks,)
    return json.dumps({'status':200, 'success': True})

@get('/diceRoll')
def get_diceRoll(gameID=None):
    session = load_session(request)
    if 'gameID' in session:
        GID = session['gameID']
    else:
        GID = 'NO LIVE GAME'
    GID = session.get('gameID')

## User Name Connections
    user0Name = ''
    session['user0Name'] = user0Name
    user1Name = ''
    session['user1Name'] = user1Name
    user2Name = ''
    session['user2Name'] = user2Name
    user3Name = ''
    session['user3Name'] = user3Name
    user4Name=''
    session['user4Name'] = user4Name

    with open(f'data/games/{GID}-users.txt', 'r') as g:
        print('File Opened: ' + GID + '-users.txt')
        g.seek(0)
        lines = g.readlines()
        for line in lines:
            if 'user0' in line:
                user0Name = line.partition('user0 ')[2]
                session['user0Name'] = user0Name
            if 'user1' in line:
                user1Name = line.partition('user1 ')[2]
                session['user1Name'] = user1Name
            if 'user2' in line:
                user2Name = line.partition('user2 ')[2]
                session['user2Name'] = user2Name
            if 'user3' in line:
                user3Name = line.partition('user3 ')[2]
                session['user3Name'] = user3Name
            if 'user4' in line:
                user4Name = line.partition('user4 ')[2]
                session['user4Name'] = user4Name

## User Bucks Connections
    user0Bucks = ''
    session['user0Bucks'] = user0Bucks
    user1Bucks = ''
    session['user1Bucks'] = user1Bucks
    user2Bucks = ''
    session['user2Bucks'] = user2Bucks
    user3Bucks = ''
    session['user3Bucks'] = user3Bucks
    user4Bucks=''
    session['user4Bucks'] = user4Bucks

    with open(f'data/games/{GID}-bucks.txt', 'r') as g:
        print('File Opened: ' + GID + '-bucks.txt')
        g.seek(0)
        lines = g.readlines()
        for line in lines:
            if 'user0' in line:
                user0Bucks = line.partition('user0 ')[2]
                session['user0Bucks'] = user0Bucks
            if 'user1' in line:
                user1Bucks = line.partition('user1 ')[2]
                session['user1Bucks'] = user1Bucks
            if 'user2' in line:
                user2Bucks = line.partition('user2 ')[2]
                session['user2Bucks'] = user2Bucks
            if 'user3' in line:
                user3Bucks = line.partition('user3 ')[2]
                session['user3Bucks'] = user3Bucks
            if 'user4' in line:
                user4Bucks = line.partition('user4 ')[2]
                session['user4Bucks'] = user4Bucks

    #user0Name = "Vince"
    potAmount = session['pot']
    username = session['username']
    save_session(session, response)
    return template('diceRoll', gameID=GID, player0Name=user0Name, player1Name=user1Name, player2Name=user2Name, player3Name=user3Name, player4Name=user4Name, player0Bucks=user0Bucks, player1Bucks=user1Bucks, player2Bucks=user2Bucks, player3Bucks=user3Bucks, player4Bucks=user4Bucks, name=username, pot=potAmount)

@get('/info')
def get_info():
    session = load_session(request)
    save_session(session, response)
    return template('info', message='')

@route('./views/JS/<filepath:re:..*\.js>')
def js(filepath):
    return static_file(filepath, root='./views/JS/')

@route('../data/games/<filepath:re:..*\.txt>')
def textFile(filepath):
    return static_file(filepath, root='../data/games/')

@route('./images/<filepath:re:..*\.(jpg|png|gif|ico|svg)>')
def images(filepath):
    return static_file(filepath, root='./images/')

application = default_app()
#run(host='localhost', port=8068, reloader=True)
