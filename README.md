# 1CademyBots

# Setting up the environment
The first step is to fork this repo into your own and then 
pull it to your local computer using git pull https://github.com/yourname/1CademyBots

Create a python virtual environment in the same folder that git created called 1CademyBots


```
cd 1CademyBots
python -m venv env
emv\scripts\activate
pip install -r requirements.txt
```
This will install all necessary packages to run the bot

If you get an error creating a virtual environment, make sure that your installed python version
is greater than 3.7.X by running 
```
python -V
```

The other necessary file is MicrosoftAcademicAPIKey.py which must be created
and contain API_KEY = "YOUR_KEY" in order to connect to the Microsoft Research API
You can sign up for the api and get your private key here https://msr-apis.portal.azure-api.net

This .gitignore is cofigured for a Visual Studio environment so before creating any pull 
requests, please add any files created by your IDE to your local .gitignore so they are not
accidentally committed to the repository

# Working on Tasks
If you are going to work on a part of the bot, please assign yourself to that task in the 
1Cademy Team planner or create the task if it does not exist. The 1Plan is only being used for top level
tasks and all bug fixes and issues will be tracked through github. 

If you are not part of the team please email nfigue@umich.edu for an invite 

# Creating Pull Requests
Please make commits to your fork of the repo frequently and comment your code to some degree
so that other people working can follow your line of thinking. Please only commit to your repo and then
submit pull requests to the main repo to be approved by the project manager

If you have any questions please post in the Python Programming Team channel