import socket

def reverse_dns_lookup(ip_address):
    try:
        hostname, aliaslist, ipaddrlist = socket.gethostbyaddr(ip_address)
        return hostname
    except socket.herror:
        return "Unable to perform reverse DNS lookup"

ip_address = input("Enter an IP address: ")
result = reverse_dns_lookup(ip_address)

print(f"The reverse DNS lookup for {ip_address} is: {result}")