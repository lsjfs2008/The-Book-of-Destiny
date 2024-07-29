#!/usr/bin/python3
 

import mysql.connector
 
# 打开数据库连接
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="iq860226@)@$",
    database='game')
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
 
# 使用 execute()  方法执行 SQL 查询 
cursor.execute("SELECT * FROM player;")
 
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchall()
 
print ("Database version : %s " % data)
 
# 关闭数据库连接
db.close()