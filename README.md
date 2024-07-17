
# Network Web Mapper

This project provides a web-based interface for running various Nmap commands using Django for the backend and React for the frontend.

## Project Structure

```
Network-Web-Mapper/
│
├── nmapapp/
│   ├── migrations/
│   ├── static/
│   ├── templates/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── views.py
│   ├── urls.py
│   └── ...
│
├── nmapweb/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── ...
│
├── nmap-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── manage.py
├── requirements.txt
└── ...
```

## Requirements

### Backend (Django)
- Python 3.x
- Django 3.x or later
- dnspython
- Gunicorn (for production)
- django-cors-headers

### Frontend (React)
- Node.js
- npm

## Setting Up the Backend

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Django Settings**:
   Update `ALLOWED_HOSTS` in `nmapweb/settings.py`:
   ```python
   ALLOWED_HOSTS = ['your-ec2-public-ip', 'your-domain.com']
   ```

3. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Create a Superuser**:
   ```bash
   python manage.py createsuperuser
   ```

5. **Collect Static Files**:
   ```bash
   python manage.py collectstatic
   ```

6. **Run the Django Development Server**:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

## Setting Up the Frontend

1. **Navigate to the React Project Directory**:
   ```bash
   cd nmap-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the React App**:
   ```bash
   npm run build
   ```

4. **Move Build Files to Django Static Directory**:
   ```bash
   cp -r build/* /path/to/your/django/project/static/
   ```

## Configuring Apache2

1. **Install Required Packages**:
   ```bash
   sudo apt update
   sudo apt install apache2 libapache2-mod-wsgi-py3 -y
   ```

2. **Create an Apache Configuration File**:
   ```bash
   sudo nano /etc/apache2/sites-available/yourproject.conf
   ```

3. **Add the Following Configuration**:
   Replace `/path/to/your/django/project`, `your-ec2-public-ip`, and `your-domain.com` with your actual paths and domain/IP.

   ```apache
   <VirtualHost *:80>
       ServerAdmin webmaster@localhost
       ServerName your-ec2-public-ip
       ServerAlias your-domain.com

       DocumentRoot /path/to/your/django/project/static

       Alias /static /path/to/your/django/project/static
       <Directory /path/to/your/django/project/static>
           Require all granted
       </Directory>

       <Directory /path/to/your/django/project>
           <Files wsgi.py>
               Require all granted
           </Files>
       </Directory>

       WSGIDaemonProcess yourproject python-path=/path/to/your/django/project python-home=/path/to/your/django/project/venv
       WSGIProcessGroup yourproject
       WSGIScriptAlias / /path/to/your/django/project/nmapweb/wsgi.py

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

4. **Enable the New Site and Disable the Default Site**:
   ```bash
   sudo a2ensite yourproject.conf
   sudo a2dissite 000-default.conf
   sudo systemctl restart apache2
   ```

## Running the Application

1. **Start the Django Server**:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Access the Application**:
   Open a web browser and navigate to `http://your-ec2-public-ip` or `http://your-domain.com`.

## Troubleshooting

1. **Check Django Logs**:
   ```bash
   tail -f /path/to/your/django/project/logs/django.log
   ```

2. **Check Apache Logs**:
   ```bash
   tail -f /var/log/apache2/error.log
   ```

3. **Test API Endpoints**:
   Use `curl` or Postman to test the API endpoints manually:
   ```bash
   curl -X GET 'http://127.0.0.1:8000/nmapapp/run-command/?target=127.0.0.1&choice=Ping+Scan'
   ```

## Summary

This documentation provides a comprehensive guide to set up and deploy the Network Web Mapper project using Django and React on an EC2 instance with Apache2. By following these steps, you should be able to make your project publicly accessible and troubleshoot any issues that arise. If you have any further questions or encounter any problems, feel free to ask!
