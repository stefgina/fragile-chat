import socket
import threading
import sys
import argparse


parser = argparse.ArgumentParser(description='Script to save a string')
parser.add_argument('-i', '--ip', help='the target ip adress', default='192.168.1.3')
args = parser.parse_args()


peerB_ip = args.input_string


############ crypto encoding stuff for later

# from cryptography.hazmat.primitives.asymmetric import dh
# from cryptography.hazmat.primitives import serialization


# def diffie_hellman():
#     # Generate Diffie-Hellman parameters
#     params = dh.generate_parameters(generator=2, key_size=2048)
#     private_key = params.generate_private_key()

#     # Serialize and send public key
#     public_key = private_key.public_key().public_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PublicFormat.SubjectPublicKeyInfo
#     )
#     return private_key, public_key


def get_ip_of_system():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address

def receive_messages(client_socket):
    while True:
        try:
            message = client_socket.recv(1024).decode()
            if message:
                print("\nPeer B:", message)
        except:
            print("\nError receiving messages.")
            break

def send_messages(client_socket):
    while True:
        try:
            message = input()
            if message:
                client_socket.send(message.encode())
        except KeyboardInterrupt:
            print("\nClosing the connection...")
            client_socket.close()
            sys.exit()


def server():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Bind the socket to a specific IP address and port
    host = get_ip_of_system()  # Example: 'localhost' or '0.0.0.0' for all interfaces
    port = 8000
    sock.bind((host, port))

    # Start listening for incoming connections
    sock.listen(1)  # Adjust the backlog value as per your needs

    print("Peer A listening on {}:{}".format(host, port))

    # Accept incoming connection
    client_socket, client_address = sock.accept()
    print("Peer B connected from:", client_address)

    # Start receiving and sending messages in separate threads
    receive_thread = threading.Thread(target=receive_messages, args=(client_socket,))
    receive_thread.start()

    # # Enable non-blocking I/O for user input
    # sys.stdin.reconfigure(blocking=False)

    # Send messages
    send_messages(client_socket)

def client():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Bind the socket to a specific IP address and port
    host = peerB_ip  # Example: 'localhost' or '0.0.0.0' for all interfaces
    port = 8000
    # Connect to peer A
    sock.connect((host, port))

    # Start receiving and sending messages in separate threads
    receive_thread = threading.Thread(target=receive_messages, args=(sock,))
    receive_thread.start()

    # # Enable non-blocking I/O for user input
    # sys.stdin.reconfigure(blocking=False)

    # Send messages
    send_messages(sock)




server_thread = threading.Thread(target=server)
client_thread = threading.Thread(target=client)

server_thread.start()
client_thread.start()