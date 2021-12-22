import requests

headers = {
  #'Authorization': "Bot Nzk2Njg2MzYzNjA0NjgwNzU1.X_bh_g.6uKl_EPp5r5XZpSxCxPTIuA69aE"
  'Authorization': "Bearer vMAoIZbDfn8mRqgnthMvmPTdpJLnnZ"
}

headers_ = {
  'Content-Type': "application/x-www-form-urlencoded"
}

def exchange_code(co):
  r = requests.post(f"https://discord.com/api/v9/oauth2/token", data={'code': co, 'client_id': "796686363604680755", 'client_secret': "csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S", 'redirect_uri': "http://127.0.0.1:5500/Dashboard", 'grant_type': "authorization_code"})#, headers=headers_)
  r.raise_for_status()
  return r.content

def get_guild():
  r = requests.get(f"https://discord.com/api/v9/guilds/841330908560228412?client_id=796686363604680755&client_secret=csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S&grant_type=authorization_code", headers=headers)
  r.raise_for_status()
  return r.content

def get_guilds():
  r = requests.get(f"https://discord.com/api/v9/users/@me/guilds?client_id=796686363604680755&client_secret=csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S&grant_type=authorization_code", headers=headers)
  r.raise_for_status()
  return r.content

def get_user():
  r = requests.get(f"https://discord.com/api/v9/users/@me?code=7AUWDLVsBLZ6nedYevJNncblen0SUP&grant_type=authorization_code", headers=headers)
  r.raise_for_status()
  return r.content

#a = exchange_code("AAh8QkAjO9C2nFW2cnrm7emPad40Qc")
a = get_guilds()
#a = get_user()
f = open("discord.json", "wb")
f.write(a)
f.close()