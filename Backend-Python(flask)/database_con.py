import pyodbc
server = 'udapilot.database.windows.net'
#server = 'mydbgeo.database.windows.net'
database = 'uda_pilot'
username = 'geoffrey'
password = 'Ge0f3!94'
driver= '{ODBC Driver 13 for SQL Server}'
cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
print("Connection successfull")

cursor = cnxn.cursor()
cursor.execute("select * from dbo.processed_file")
reports = cursor.fetchall()
print((reports))
# row = cursor.fetchone()
# while row:
#     print (str(row[0]) + " " + str(row[1]))
#     row = cursor.fetchone()

# import pymysql
# #configuring Mysql
# db=pymysql
# db = pymysql.connect("mydbgeo.database.windows.net","mydb-works","Ge0f3!94","mydb" )