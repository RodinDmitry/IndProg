#!/usr/bin/env python
import pika
import postgresql
import time

time.sleep(20)
connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()
db = postgresql.open('pq://docker:docker@database:5432/docker')
db.execute("DROP TABLE IF EXISTS messages;")
db.execute("CREATE TABLE messages (id SERIAL PRIMARY KEY, msg CHAR(256));")
ins = db.prepare("INSERT INTO messages (msg) VALUES ($1)")
print("ok")

channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    ins(str(body))

channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

channel.start_consuming()
