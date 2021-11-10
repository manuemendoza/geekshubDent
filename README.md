# GeeksHubDental

Nos encontramos en un proyecto de una clínica dental.

## ejecución

Usamos métodos personalizado como npm [start](https://imagizer.imageshack.com/img924/5885/0t2QSw.png) para encender el servidor.

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
En base al enunciado del ejercicio se obta por crear 5 modelos diferentes creando 4 tablas a partir de ellos.

```
admin
appointment
client
index
token
```

## Rutas
Sobre las rutas al tener varios modelos , vamos a especificar en uno ya que son bastante parecidos.

en clientes para sus perspectivos login se debía verificar su email y su contraseña generando el debido token y pudiendo registrarlo durante 24h.

```
router.get('/:id', auth.checkAdminOrOwn, controller.getUser);
router.get('/', auth.checkClient, controller.getUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', auth.checkClient, controller.logoutUser);
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);
```
## Funciones
Una de las funciones creadas mas importantes es crear el usuario 

como en el ejemplo indicado abajo seguimos estos pasos

1- requerimos los parámetros necesarios para la creación del model que serian nombre email password.

2- validamos la autentificación y crea un token a partir de su contraseña.

3- en caso de tener unos de los campos inexistentes tenemos try , catch con el campo faltante.
```

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.json({
            message: 'password is required'
        }, 400)
    } else {

        const clientData = req.body;

        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(req.body.password, salt);
        clientData.password = hash;

        try {
            const client = await Client.create(clientData);
            res.json({
                client
            }, 201);
        } catch (error) {
            console.error(error);
            if (error.message == "Validation error") { // @TODO: include mysql validation errors
                res.json({
                    message: error.original.message
                }, 400);
            } else {
                res.json({
                    message: error.message
                }, 500);
            }
        };
    };
}
```



## License
[MGS.sl]