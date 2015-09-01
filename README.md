#Quiz el juego de las preguntas
Ejercicio del curso de [Desarrollo de servicios en la nube con HTML5, Javascript y node.js](https://www.miriadax.net/web/javascript-node-js)

El resultado del ejercicio está desplegado en [heroku](https://quiz-pcollazos-2015.herokuapp.com)

##Build & development

Ejecuta `npm install` para instalarlo y `foreman start` para arrancarlo.

Es necesario tener instalado el [toolbelt](https://toolbelt.heroku.com/) de heroku para arrancarlo.
Si da problemas al ejecutar el comando `foreman` del `toolbelt`, es posible instalar un módulo de node que hace lo mismo. Es [Node Foreman](https://github.com/strongloop/node-foreman). Una vez instalado, en vez de usar `foreman start` usaremos `nf start`.

##Configuración de la base de datos en local

En local se crea el fichero .env, que también se agrega al .gitignore por lo que no está trackeado. Este es el contenido del fichero.env en local:

    DATABASE_URL=sqlite://:@:/
    DATABASE_STORAGE=quiz.sqlite

De esta forma se emula el entorno de heroku en local para sqlite.


