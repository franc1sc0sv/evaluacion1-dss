#🚀 Documentación del Proyecto: Despliegue de una Aplicación con Laravel, React, Nginx y Kubernetes.

Este proyecto consiste en una aplicación web con un backend en **Laravel**, un frontend en **React**, un servidor **Nginx** como proxy inverso, y una base de datos **PostgreSQL**. Todo el sistema se despliega en un clúster de Kubernetes, utilizando balanceo de carga y escalado horizontal para garantizar alta disponibilidad y escalabilidad.

📌 ## Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

1. **Docker**: Para crear y ejecutar contenedores
   - [Instalar Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: Para gestionar múltiples contenedores
   - Viene incluido con Docker Desktop en Windows/Mac. En Linux, instálalo por separado
3. **Minikube**: Para crear un clúster local de Kubernetes
   - [Instalar Minikube](https://minikube.sigs.k8s.io/docs/start/)
4. **kubectl**: Para interactuar con el clúster de Kubernetes
   - [Instalar kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
5. **Node.js** (opcional): Para desarrollar el frontend en React
6. **PHP** (opcional): Para desarrollar el backend en Laravel


📂## Estructura del Proyecto

```
proyecto/
├── k8s/                           # Configuraciones de Kubernetes
│   ├── backend-deployment.yml     # Deployment del backend
│   ├── backend-pvc.yml            # Volumen persistente backend
│   ├── backend-service.yml        # Servicio del backend
│   ├── configmap.yml              # Variables de configuración
│   ├── db-deployment.yml          # Deployment de PostgreSQL
│   ├── db-pvc.yml                 # Volumen persistente DB
│   ├── db-service.yml             # Servicio de la base de datos
│   ├── frontend-deployment.yml    # Deployment del frontend
│   ├── frontend-service.yml       # Servicio del frontend
│   ├── hpa-backend.yml            # Autoescalado backend
│   ├── hpa-frontend.yml           # Autoescalado frontend
│   ├── nginx-config.yml           # Configuración de Nginx
│   ├── nginx-deployment.yml       # Deployment de Nginx
│   └── nginx-service.yml          # Servicio de Nginx
│
├── laravel-api-rest/       # Backend Laravel
│   ├── app/                # Lógica de la aplicación
│   ├── config/             # Configuraciones
│   ├── database/           # Migraciones y seeders
│   ├── routes/             # Definición de rutas API
│   ├── tests/              # Tests unitarios y de integración
│   └── Dockerfile.dev      # Dockerfile para desarrollo
│
├── nginx/                # Configuración de Nginx
│   └── default.dev.conf  # Configuración para desarrollo
│
├── react-client/        # Frontend React
│   ├── src/             # Código fuente
│   ├── public/          # Archivos estáticos
│   └── Dockerfile.dev # Dockerfile para desarrollo
│
├── .env                # Variables de entorno
├── .env.example        # Plantilla de variables de entorno
└── docker-compose.yml  # Configuración de Docker Compose
```

🐳## 1. Construir y Levantar los Contenedores con Docker Compose.

Antes de desplegar en Kubernetes, es recomendable probar la aplicación localmente usando Docker Compose.

🔧 ### 1.1 Archivo Docker Compose

Crea un archivo `docker-compose.yml`:

```yaml
version: "3.8"

networks:
  laravel_network:
    driver: bridge

services:
  backend:
    build:
      context: ./laravel-api-rest
      dockerfile: Dockerfile.dev
    container_name: laravel_backend
    volumes:
      - ./laravel-api-rest:/var/www
    depends_on:
      - db
    env_file:
      - .env
    networks:
      - laravel_network
    entrypoint: ['/bin/sh', '-c']
    command:
      - |
        composer install
        php artisan migrate
        php artisan serve --host=0.0.0.0 --port=8000

  frontend:
    build:
      context: ./react-client
      dockerfile: Dockerfile.dev
    container_name: react_frontend
    restart: always
    env_file:
      - .env
    volumes:
      - ./react-client:/app
      - /app/node_modules
    command: ["yarn", "dev", "--host"]
    depends_on:
      - backend
    networks:
      - laravel_network

  nginx:
    image: nginx:latest
    container_name: nginx_server
    restart: always
    ports:
      - "8080:80"
    volumes:
      - ./nginx/default.dev.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - backend
      - frontend
    networks:
      - laravel_network

  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_DB: ${DB_DATABASE}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - laravel_network

volumes:
  pgdata:
```

🚀### 1.2 Construir y Levantar los Contenedores

1. **Crear archivo `.env`**

   Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias, este archivo se
    encuentra en el proyecto con el nombre `.env.example` que es una plantilla, cambia el nombre a `.env`.

    El siguiente solo es un ejemplo, en el archivo `.env.example` encontrarás todas las variables de entorno que deberás copiar.

   ```env
   DB_DATABASE=laravel_db
   DB_USERNAME=laravel_user
   DB_PASSWORD=laravel_password
   ```

2. **Construir y levantar los contenedores**

   ```bash
   docker-compose up --build
   ```

3. **Verificar que los contenedores estén en ejecución**

   ```bash
   docker ps
   ```

4. **Acceder a la aplicación**
   - Abre tu navegador y visita `http://localhost:8080`
   - Verifica que el frontend y el backend estén funcionando correctamente

☸️## 2. Despliegue en Kubernetes

Una vez que hayas probado la aplicación localmente con Docker Compose, puedes desplegarla en Kubernetes.

📦### 2.1 Construir las Imágenes en Minikube

1. **Conectar al Docker daemon de Minikube**

   ```bash
   minikube docker-env | Invoke-Expression
   ```

2. **Construir las imágenes**

   Backend:
   ```bash
   docker build -t laravel-backend:latest -f laravel-api-rest/Dockerfile.dev .
   ```

   Frontend:
   ```bash
   docker build -t react-frontend:latest -f react-client/Dockerfile.dev .
   ```

### 2.2 Aplicar los Archivos de Kubernetes

1. **Aplicar las configuraciones de Kubernetes**

   ```bash
   kubectl apply -f db-deployment.yml
   kubectl apply -f backend-deployment.yml
   kubectl apply -f frontend-deployment.yml
   kubectl apply -f nginx-deployment.yml
   kubectl apply -f backend-service.yml
   kubectl apply -f frontend-service.yml
   kubectl apply -f nginx-service.yml
   kubectl apply -f hpa-backend.yml
   kubectl apply -f hpa-frontend.yml
   ```

2. **Verificar el estado del clúster**

   ```bash
   kubectl get pods
   kubectl get services
   kubectl get hpa
   ```

3. **Acceder a la aplicación**

   Obtener la URL del servicio de Nginx:
   ```bash
   minikube service nginx-service --url
   ```



⚖️## 3. Balanceo de Carga y Escalado Horizontal

🔀 ### 3.1 Balanceo de Carga

El balanceo de carga en Kubernetes se maneja a través de **Nginx**, que distribuye el tráfico entre las distintas réplicas de los pods. Kubernetes usa un **Service** de tipo `LoadBalancer` o `ClusterIP`, dependiendo del entorno, para gestionar el tráfico entrante y garantizar que las peticiones sean redirigidas correctamente a los pods disponibles.

**Pasos clave:**
- El tráfico llega al servicio `nginx-service`, que actúa como el punto de entrada a la aplicación.
- `nginx-service` redirige las solicitudes al backend y frontend, distribuyéndolas equitativamente entre las réplicas disponibles.
- Kubernetes usa un algoritmo de round-robin o least connections para distribuir las peticiones eficientemente.

📈### 3.2 Escalado Horizontal

El escalado horizontal se gestiona con el **Horizontal Pod Autoscaler (HPA)**, que ajusta automáticamente el número de pods en función del consumo de CPU y memoria.

**Configuración del HPA:**
```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```
**Comandos para verificar el escalado:**
```bash
kubectl get hpa
kubectl describe hpa backend-hpa
```
Este sistema garantiza que la aplicación pueda manejar grandes volúmenes de tráfico sin tiempos de inactividad.



🎯## 4. Conclusión

Este proyecto demuestra cómo desplegar una aplicación con Laravel, React, Nginx y PostgreSQL en un entorno de Kubernetes, utilizando balanceo de carga y escalado horizontal para garantizar alta disponibilidad y escalabilidad. La documentación proporcionada cubre todos los aspectos necesarios para replicar el proyecto y entender su funcionamiento.
