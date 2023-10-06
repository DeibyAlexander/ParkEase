# Nombre del Proyecto

### ParkEase

## Descripcion del Proyecto

ParkEase es un sistema administrativo de gestión de estacionamiento diseñado para hacer que la administración de estacionamientos sea más eficiente y conveniente tanto para los propietarios de estacionamientos como para los conductores. El sistema abarca desde la reserva de espacios hasta el registro de entradas y salidas de vehículos, la facturación y la generación de informes.

### Objetivos Generales

1. ##### Optimización de Espacios: 
    Maximizar la utilización de espacios de estacionamiento disponibles para garantizar una ocupación eficiente.

2. ##### Experiencia del Cliente: 
    Mejorar la experiencia del cliente al proporcionar una forma conveniente de gestionar reservaciones y acceder a espacios de estacionamiento.

3. ##### Eficiencia Operativa: 
    Utilizar eficientemente la gestion las operaciones de estacionamiento para reducir costos y aumentar la eficiencia en la gestión.

4. ##### Registro y Seguimiento: 
    Registrar las entradas y salidas de vehículos de manera precisa y generar un seguimiento del historial de estacionamiento.

### Objetivos Especificos

1. ##### Diseño de la Base de Datos: 
    Diseñar una base de datos eficiente para almacenar información de vehículos, tarifas, espacios, registros de entrada/salida, y más.

2. ##### Diseñar un Wireframe IU/UX:
    Diseñar un figma representativo para mostrar un plus de el diseño de la pagina al finalizar

3. ##### API de Reservas: 
    Desarrollar una API que permita a los usuarios reservar espacios de estacionamiento, gestionar sus reservas y recibir confirmaciones.

4. ##### Registro de Entradas/Salidas:
    Implementar un sistema de registro de entradas y salidas de vehículos con cálculo de tarifas.

### Beneficios Esperados

* Mayor utilización de espacios de estacionamiento.
* Experiencia mejorada para los usuarios.
* Reducción de costos operativos.
* Mayor precisión en la gestión de registros.


### Tecnologias a utlizar
Stack MERN:

* Node.js
* Mongodb
* Express.js
* React

#### Diagrama de base de datos

<img src="./img/Screenshot from 2023-10-04 07-17-56.png">

#### Figma (Wireframe UI/UX)

[Diseño en Figma](https://www.figma.com/file/ykBeEhqq7coENuwHoqnRzQ/Untitled?type=design&node-id=0%3A1&mode=design&t=Y5Y41Y8UWwa7ftb0-1)

##### Desktop
* ##### Wireframe UI
<img src="./img/Screenshot from 2023-10-04 22-32-43.png">

* ##### Wireframe UX
<img src="./img/Screenshot from 2023-10-04 22-33-12.png">

##### Dispositivo Movil
* ##### Wireframe UI
<img src="./img/Screenshot from 2023-10-04 22-32-59.png">

* ##### Wireframe UX
<img src="./img/Screenshot from 2023-10-04 22-33-23.png">

#### Documentacion API (Swagger)

[Documentacion de la API ParkEase](http://localhost:4466/api-docs/)

#### Backend

- Bajamos a la carpeta Backend

        cd Backend

- Instalamos las dependencias

        npm i

- Ahora inicializamos Servidor
        
        npm run start

Con esto pondremos a funcionar el backend y todas sus funcionalidades consumineto la base de datos de MongoDb y una vez completada la inicializacion abrimos otra terminal para ingresar al front

### Frontend.

Una vez creada la nueva terminar dejando abierta la terminal en la que iniciamos el Backend, seguimos:

- Bajamos a la carpeta Frontend en la nueva terminal y seguimos bajando hasta la carpeta parkease

        cd Frontend
        cd parkease

- Instalamos dependencias

        npm i

- Ahora inicializamos nuestra app

        npm start

