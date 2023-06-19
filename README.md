# DogsProject
### Contribution Guidelines
This project is a platform dedicated to dogs, where you can search for dogs based on specific criteria and create new dogs. 
### How to start
npm install \
npm start \
To get started, you will need an MSSQL server for your application. The configuration parameters, such as server address and port, should be written in the config file. Additionally, it is necessary to create a .env file where you can specify the username and password for the database user.
### Routes
###### Create new dog
Method: POST \
URL: `http://localhost:8001/dog` \
BODY: {"name":"Dog","color":"brown","tail_length": 77, "weight": 26 }  \
Must be: unique name, tail_length and weight > 0

######  View all dogs
Method: GET \
URL: `http://localhost:8001/dogs?attribute=weight&order=desc&pageNumber=2` 

