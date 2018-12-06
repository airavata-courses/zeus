# import random
# from kazoo import client as kz_client
#
# my_client = kz_client.KazooClient(hosts='127.0.0.1:2181')
#
#
# def my_listener(state):
#     if state == kz_client.KazooState.CONNECTED:
#         print("Client connected !")
#
#
# my_client.add_listener(my_listener)
# my_client.start(timeout=5)
#
#
# homepath="/zeus"
# nodepath="/python"
# if (my_client.exists(homepath+nodepath) is None):
#     my_client.create(homepath+nodepath)
#
# port="4001"
#
# s="/python:"+port
# buffer="localhost:"+port
# b=buffer.encode('utf-8')
# if (my_client.exists(homepath+nodepath+s) is None):
#     my_client.create(homepath+nodepath+s,b)
# #
#
# # # Print the version of a node and its data
# data, stat = my_client.get(homepath+nodepath+s)
# print(" data: %s" % (data.decode("utf-8")))
# #
# # # List the children
# children = my_client.get_children(homepath+nodepath)
# length=len(children)
# print("There are %s children with names %s" % (len(children), children))
#
# ##LoadBalancer
# randomno=random.randint(0,length-1)
# print(children[randomno])
# data1, stat = my_client.get(homepath+nodepath+'/'+children[randomno])
# print(" data1: %s" % (data1.decode("utf-8")))
#
#
