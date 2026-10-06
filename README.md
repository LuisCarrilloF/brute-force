# Brute-force auditoría
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript" alt="JavaScript ES6+" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js 18+" />
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
</p>
Herramienta de prueba de seguridad para evaluar la resistencia de un flujo de autenticación en un entorno autorizado. Su propósito es ayudar a detectar debilidades de validación, protección contra ataques de fuerza bruta y comportamiento del sistema bajo intentos repetidos de acceso.  

> [!IMPORTANT]  
> Esta herramienta debe utilizarse únicamente en sistemas donde exista permiso explícito para realizar pruebas de seguridad. No está autorizada para su uso contra aplicaciones, servicios o sitios web sin consentimiento del propietario.

## Objetivo

Esta utilidad sirve como ejemplo para realizar una auditoría controlada del proceso de login y revisar si existen medidas de prevención insuficientes, como:

- ausencia de bloqueo por intentos fallidos
- falta de protección CSRF o mecanismos equivalentes
- validación débil de las credenciales
- comportamiento inseguro en la API o frontend

## Requisitos

- Node.js instalado
- acceso autorizado al sistema bajo prueba
- diccionario de pruebas local (`rockyou.txt` o uno equivalente)

## 1. Descargar el diccionario

Descarga un archivo de prueba para utilizarlo como conjunto de credenciales de referencia.

Windows (PowerShell):
```powershell
Invoke-WebRequest -Uri "https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt" -OutFile "rockyou.txt"
```

Linux/macOS:
```bash
curl -L -o rockyou.txt https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt
```

## 2. Instalar dependencias

Instala la dependencia necesaria para manejar variables de entorno:

```powershell
npm install dotenv
```

## 3. Configurar variables de entorno

Crea un archivo `.env` con la siguiente estructura:

```env
BASE_URL='http://direccion_del_front'
LOGIN_PATH='/path/login'
```

Ejemplo de valores esperados:

```env
BASE_URL='http://localhost:3000'
LOGIN_PATH='/api/auth/signin'
```

## 4. Ejecutar la prueba

Desde la carpeta del proyecto, ejecuta:

```bash
node test_fuerza_bruta.js
```

La herramienta intentará consultar la ruta de login configurada y registrar el comportamiento del sistema durante la prueba.

> [!NOTE]  
> Durante la ejecución, es útil observar las peticiones que llegan a la API o revisar la consola del frontend para confirmar cómo se está manejando la autenticación.

## 5. Consideraciones de seguridad

Si esta prueba revela una vulnerabilidad, se recomienda:

- implementar rate limiting en el endpoint de login
- bloquear cuentas tras múltiples intentos fallidos
- aplicar una política de contraseñas robusta
- usar tokens CSRF o mecanismos equivalentes
- registrar y monitorear eventos de acceso sospechoso

## Limitaciones

Este script es una herramienta básica de auditoría y no pretende reemplazar una validación profesional de seguridad. Además, algunos frameworks o sistemas implementan medidas de protección adicionales, como mecanismos anti-bot, throttling, CAPTCHAs o controles de sesión, que pueden limitar la efectividad de pruebas automatizadas.

## Aviso legal y ético

El uso de esta herramienta debe estar respaldado por una evaluación autorizada, con permiso explícito del propietario del sistema y en cumplimiento con la legislación aplicable. El objetivo es fortalecer la seguridad, no vulnerar sistemas ni comprometer datos de terceros.
Actualmente, este script no es efectivo contra el sistema `bitacora de servicios`. Ya se implementaron medidas de seguridad, por lo tanto, me es posible publicarlo en `github`.