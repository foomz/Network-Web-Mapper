import ipaddress
from django.shortcuts import render
from django.http import JsonResponse
import subprocess
import dns.resolver
import dns.reversename

def run_nmap_command(command):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        return str(e)
    
def dns_lookup(target):
    try:
        resolver = dns.resolver.Resolver()
        answers = resolver.resolve(target, 'A')
        return "\n".join([str(rdata) for rdata in answers])
    except Exception as e:
        return str(e)

def reverse_lookup(ip):
    try:
        # Validate IP address
        ipaddress.ip_address(ip)
        
        addr = dns.reversename.from_address(ip)
        reversed_dns = dns.resolver.resolve(addr, 'PTR')
        return "\n".join([str(rdata) for rdata in reversed_dns])
    except ValueError:
        return "Invalid IP address"
    except Exception as e:
        return str(e)

def run_command_view(request):
    if request.method == 'GET':
        target = request.GET.get('target')
        choice = request.GET.get('choice')
        
        if not target or not choice:
            return JsonResponse({'error': 'Invalid target or choice'}, status=400)
        
        if choice == 'Ping Scan':
            output = run_nmap_command(f"nmap -sP {target}")
        elif choice == 'Port Scan':
            output = run_nmap_command(f"nmap -p 1-5000 {target}")
        elif choice == 'OS Detection and Service Version Detection':
            output = run_nmap_command(f"nmap -A {target}")
        elif choice == 'Scan SMB Vuln':
            output = run_nmap_command(f"nmap -p445 --script smb-vuln-* {target}")
        elif choice == 'DNS Lookup':
            output = dns_lookup(target)
        elif choice == 'Reverse Lookup':
            output = reverse_lookup(target)
        else:
            output = 'Invalid choice'
        
        return JsonResponse({'output': output})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)