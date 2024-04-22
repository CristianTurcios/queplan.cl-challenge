# QuePlan.cl Challenge

## Introduccion

A ustedes les ha tocado programar consumo de API REST, donde el Front solicita al Back datos y este a la vez solicita datos a la base de datos. En este desafío vamos a hacer el camino contrario, donde un evento en la base de datos manda esta información al back y este a la vez a Angular.

La idea es que crees una tabla de nombre “my_friends” en Postgres con las siguientes columnas:

**id, name, gender** Y lo llenes con algunos datos de ejemplo, entre estos tiene que existir el nombre **Sebastián.**

1) Al ejecutar el siguiente comando desde la base de datos PostgreSQL **UPDATE _my_friend SET name = ‘Raúl’_
WHERE _name = ‘Sebastián’_;** u otro cambio, se emite un evento a Nest.js que escucha este cambio.

2) Nest.js transmite este evento en tiempo real a Angular (una opción es usar Socket.io, pero se aceptar otras que cumplan el mismo objetivo)

3) Angular muestra la columna modificada (en tiempo real), su valor anterior, el valor nuevo y el nombre de la tabla

4) Utilizar Sequelize (Solo para el modelado de datos, Sequelize no es vital para la escucha de los eventos de la BD).

5) Utilizar Angular Material para el front (maquetar de forma libre la estructura estética para mostrar el mensaje).

6) Viene bien que el código esté organizado e implementado bajo una arquitectura o patrón de diseño. Justificar.

## Tecnologias

- TypeScript
- ExpressJs
- NodeJS
- TypeORM
- PostgreSQL
- NestJS
- pg
- nestjs-paginate
- swagger
- Angular
- JavaScript
- dotEnv
- Server Side Events

## Requisitos

- Se necesita crear una base de datos en postgress, puede ser una base de datos gratuita de heroku y ejecutar el siguiente script (dentro de la base de datos):

> CREATE OR REPLACE FUNCTION public.notify_friends_update() RETURNS

> TRIGGER AS \$$ DECLARE BEGIN PERFORM pg_notify(

> CAST('friends_update_notification' AS TEXT), ROW_TO_JSON(NEW)::TEXT);

> RETURN NEW; END; $$ LANGUAGE plpgsql;

    -- notify for update operations  
    CREATE TRIGGER trigger_friends_update  
    AFTER UPDATE ON public.my_friends  
    FOR EACH ROW EXECUTE PROCEDURE public.notify_friends_update();  
      
    -- notify for insert operations  
    create trigger trigger_friends_insert  
    after insert on public.my_friends  
    for each row execute procedure public.notify_friends_update();

Esto creara un trigger en nuestra base de datos postgress, el cual nuestro BE en nodejs estara escuchando y se comunicara con el FE a traves de Server Side events y este actualizara los datos en la vista.

## Arquitectura

### La solucion de este challenge esta dividido en 3 diferentes proyectos

- Un proyecto para el FE el cual desplegara la lista de amigos que un usuario puede tener, el Front-End esta desarrollado con Angular y Angular Material como libreria de estilos.

- Un proyecto de API construido con nestjs que representara todas las operacion CRUD refente a la tabla my_friends.

- Un proyecto de microservicios hecho con NodeJS y Express que se enfocara unicamente en escuchar cambios los triggers de la base de datos, es un proyecto totalmente aislado de los demas y se encargara de escuchar y enviar mensajes a los escuchas a traves de server side events.

## Pre-Requisitos

- Al momento de ejecutar la aplicacion se necesita crear un archivo `.env` con algunas variables. Estas variables se necesitan agregar en los proyectos de `microservice` y `api` respectivamente. A manera de ejemplo se ha dejado un archivo llamado `example.env` que puede ser utilizado de referencia para crear el archivo `.env`

    POSTGRES_HOST=<POSTGRES_HOST>
    POSTGRES_PORT=5432
    POSTGRES_USER=<POSTGRES_USER>
    POSTGRES_PASSWORD=<POSTGRES_PASSWORD>
    POSTGRES_DB=<POSTGRES_DB>

## Como ejecutar los proyectos

- Para ejecutar el proyectos se ocupa una version de nodejs reciente, al menos la version 18.18.0

- Ve al root folder de `microservice`  `api` y `front-end` y ejecuta npm ci en la carpeta raiz de cada uno de los proyectos.

- Los comandos para ejecutar cada proyectos son:

### API Folder
  
`npm run start:dev`
  
### Microservice

`node index.js`

### Front-End

`ng serve`

## Documentacion API

Al momento de ejecutar nuestra api en el puerto que definamos en el archivo `.env` podremos ver la documentacion de la api, la documentacion se creo con swagger y podremos acceder a ella a traves de esta ruta: `localhost:<your-api-port>/api-docs`

## Unit test

Cada proyecto contiene unit test funcionales los cuales nos permiten probar nuestro codigo. Para ejecutar los unit test puedes hacerlo desde estos comandos:

### Api

#### Ejecutar unit test

`npm run test`

#### Ejecutar unit test con el coverage habilitado

`npm run test:cov`

##### Ejecutar unit test en watch mode

`npm run test:watch`

### Front-End

#### Ejecutar unit test

`ng test`

#### Ejecutar unit test con el coverage habilitado

`ng test --code-coverage`
