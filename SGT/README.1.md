### Instructions

- use the dataDump.sql file and import it via phpmyadmin SQL tab.  copy and paste the SQL into there to recreate the DB
- copy the mysql_connect.php.config file to mysql_connect.php and put in the appropriate data for your local server.  probably user: root and password: root
- follow the instructions inside data.php (which will also include altering the files in the dataApi directory)

- alter the ajax calls in your SGT to point to data.php, and give it a query string parameter of "action" with a value equal to the values you are checking in the switch in data.php