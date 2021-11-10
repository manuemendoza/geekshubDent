# GeeksHubDental

Nos encontramos en un proyecto de una clínica dental.

## ejecucion

Usamos metodos personalizado como npm [start](https://imagizer.imageshack.com/img924/5885/0t2QSw.png) para encender el servidor.

```
npm start
```

## Dependencias que usamos

``` 
"bcryptjs"
"dotenv"
"express"
"jsonwebtoken"
"moment"
"mysql2"
"sequelize"
```

## modelos
En base al enunciado del ejercicio se obta por crear 5 modelos diferentes creando 4 tablas apartir de ellos.

```
admin
appointment
client
index
token
```

## Rutas
Sobre las rutas al tener varios modelos , vamos a especificar en uno ya que son bastante parecidos.

en clientes para sus perspectivos login se debia verificar su email y su contraseña generando el debido token y pudiendo registrarlo durante 24h.

```
router.get('/:id', auth.checkAdminOrOwn, controller.getUser);
router.get('/', auth.checkClient, controller.getUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', auth.checkClient, controller.logoutUser);
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);
```


## License
[Amazon]