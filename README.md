# GdI, gestion de inmovilizado

Aplicación para la gestión del inmovilizado de la empresa. Back end en nodejs y front end en Agular. Base de datos en MongoDB.
Proyecto final del bootcamp en Javascript de Hack a Bos.

En él, el usuario una vez registrado, podrá crear bienes y empleados de la empresa.

Los bienes tienen un control de amortización lo que no vale para comprobar el envejecimiento de los bienes.

También se puede asignar los bienes a un empleado concreto de la empresa para tener un mayor control.

Los empleados está clasificados en función de su puesto. Contable, administrador, técnico...

Paso para la instalación de la aplicación:

1- Descargar el proyecto de Github.

2. Crear un archivi .env en la carpeta back-end con los siguientes datos:

#
SERVER

HTTP_SERVER_DOMAIN=

PORT=


BBDD

MONGODB=


JWT TOKEN

AUTH_JWT_SECRET=


SENGRID

SENDGRID_API_KEY=


Expieration TOKEN

AUTH_ACCESS_TOKEN_TTL=

2- Arrancar mongodb en la carpeta back-end.

3- Arrancar en la carpeta back-end el node con npm start.

4- Arrancar en la carpeta front-end/angular-gdi.
 
