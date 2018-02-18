#!/usr/bin/env python
import pika
import time

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()

channel.queue_declare(queue='hello')

while True:
    var = input("Please enter something: ")
    channel.basic_publish(exchange='',
                            routing_key='hello',
                            body=var)

connection.close()
