Steps Involved:

1. Getting the server to run on a specific port
   import express and cors to index.js

2. Creata initial table
   Connect to postgres and create tables based on database.sql file

3. Connect database and server
   Enter information about databse and credentials on the db.js file
   Go back to index.js and require all the pool information

4. Build routes with postgres queries
   On index.js - build routes for each of the different functionalities the system is going to have
   I'm also using postman to send and verify my requests
   Define the correct sql queries for each of those functionalities

-- EXECUTION --
To view the backend's execution:

1. Setup Postman account
2. TO Enter input,
   Set POST - http://localhost:5000/fruits and enter value as an array in the following format,
   [
   {
   "COUNTRY":"MX",
   "COMMODITY":"mango",
   "FIXED_OVERHEAD":"32.00",
   "VARIABLE_COST":"1.24"
   },
   {
   "COUNTRY":"BR",
   "COMMODITY":"mango",
   "FIXED_OVERHEAD":"20.00",
   "VARIABLE_COST":"1.42"
   }
   ]

3. To view the trading options,
   Set POST - http://localhost:5000/trades and enter value as an array in the following format,
   {
   "COMMODITY":"mango",
   "PRICE":53,
   "TONS":405
   },
