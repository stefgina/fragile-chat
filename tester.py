import socket

def get_ip_of_system():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address


print(get_ip_of_system())