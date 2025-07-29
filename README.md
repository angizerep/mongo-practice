# Proyecto Mongo-Practice

Este pequeńo proyecto implementa una aplicación web básica para gestionar usuarios mediante un CRUD incompleto (Crear, Leer, Actualizar, falta Eliminar) utilizando **Node.js**, **Express** y **MongoDB** con **Mongoose**.

## ¿Qué hace el proyecto?

1. **Servidor API**: Express define rutas REST bajo `/users` para manejar las operaciones CRUD.
2. **Conexión a base de datos**: Se conecta a una base de datos MongoDB usando Mongoose (`config/db.js`).
3. **Modelo de datos**: `models/User.js` define el esquema del documento Usuario en Mongo:
   - `name`: String
   - `email`: String (único)
   - `age`: Number
   - `fechaRegistro`: Date (generada automáticamente)
4. **Controladores** (`controllers/userController.js`): Funciones que interactúan con el modelo Mongoose para:
   - Obtener todos los usuarios
   - Obtener un usuario por ID
   - Crear un nuevo usuario
   - Actualizar un usuario existente
5. **Rutas** (`routes/userRoutes.js`): Enlaza los endpoints con los controladores correspondientes.
6. **Interfaz de usuario** (`public/index.html`, `public/js/main.js`): Formulario y tabla para visualizar y manipular usuarios desde el navegador, usando `fetch()` y DOM.

## Arquitectura y estructura implementada

```
mongo-practice/
├── config/
│   └── db.js             # Conexión Mongoose a MongoDB
├── controllers/
│   └── userController.js # Lógica CRUD con Mongoose
├── models/
│   └── User.js           # Esquema de Usuario
├── routes/
│   └── userRoutes.js     # Endpoints REST (/users)
├── public/
│   ├── index.html        # Interfaz: formulario + tabla
│   └── js/
│       └── main.js       # Lógica cliente
│   └── css/
│       └── style.js      # Hoja de estilos
├── .env                  # URI de conexión a MongoDB
└── index.js              # Express
```

## ¿Qué aprendiste sobre MongoDB y Mongoose?

- **MongoDB** es una base de datos NoSQL que ofrece esquemas flexibles y escalabilidad horizontal.
- **Mongoose** simplifica la interacción con MongoDB:
  - Define esquemas y validaciones.
  - Proporciona métodos estáticos y de instancia para CRUD.
  - Maneja conversión automática de tipos (p. ej. `ObjectId`, `Date`).
- Pude practicar:
  - Conexión y manejo de errores de base de datos.
  - Definición de modelos y middleware en Mongoose.
  - Consultas asíncronas con `async/await`.

## ¿Por qué MongoDB es una buena opción en ciertos proyectos?

1. **Esquema flexible**: Ideal cuando los datos pueden cambiar de forma o crecer con atributos nuevos sin migraciones complejas.
2. **Rendimiento**: Lecturas/escrituras rápidas para conjuntos de datos grandes.
3. **JSON nativo**: Permite una unión natural con aplicaciones JavaScript/Node.js.
4. **Comunidad y ecosistema**: Amplio soporte de herramientas y servicios en la nube.

## Retos enfrentados y soluciones

1. Configurar conexión Mongoose: Revisar URI en la web de Atlas, habilitar opciones de conexión en `db.js`.
2. Manejo de errores en controladores: Envolver lógica en `try/catch`, enviar `res.status(500).json(...)`.
3. Actualizar DOM tras operaciones CRUD: Lo más complicado fue actualizar los datos y tablas en pantalla, para ello se "re-renderiza" la tabla consultando la API después de cada acción.
4. Validaciones de datos: Definir validaciones en el esquema Mongoose y en el cliente JS.

## Rutas REST disponibles (`/users`)

El archivo `userRoutes.js` está definido así:

```js
router.get('/', userCtrl.getAll);      // Obtener todos
router.post('/', userCtrl.create);     // Crear nuevo
router.get('/:id', userCtrl.getOne);   // Obtener uno por ID
router.put('/:id', userCtrl.update);   // Actualizar uno por ID
```

---

### 1. Obtener todos los usuarios

| Método | Endpoint                      | Body | Respuesta esperada |
| ------ | ----------------------------- | ---- | ------------------ |
| GET    | `http://localhost:3000/users` |  NO  | Lista de usuarios  |

**Ejemplo en Postman**:

- Método: `GET`
- URL: `http://localhost:3000/users`
- No requiere cuerpo (`Body` vacío)
- Respuesta:

```json
[
  {
    "_id": "64eea244abc123...",
    "name": "Ángeles",
    "email": "angeles@example.com",
    "age": 27,
    "fechaRegistro": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 2. Crear nuevo usuario

| Método | Endpoint                      | Body (JSON) requerido |
| ------ | ----------------------------- | --------------------- |
| POST   | `http://localhost:3000/users` |  Obligatorio          |

**JSON para crear**:

```json
{
  "name": "Ángeles Pérez",
  "email": "angeles@example.com",
  "age": 28
}
```

**Respuesta esperada**:

```json
{
  "_id": "64eea244abc123...",
  "name": "Ángeles Pérez",
  "email": "angeles@example.com",
  "age": 28,
  "fechaRegistro": "2024-01-01T00:00:00.000Z",
  "__v": 0
}
```

---

### 3. Obtener usuario por ID

| Método | Endpoint                          | Parámetro         | Body |
| ------ | --------------------------------- | ----------------- | ---- |
| GET    | `http://localhost:3000/users/:id` | `:id` del usuario | No   |

**Ejemplo**:

- URL: `http://localhost:3000/users/64eea244abc123...`

**Respuesta esperada**:

```json
{
  "_id": "64eea244abc123...",
  "name": "Ángeles Pérez",
  "email": "angeles@example.com",
  "age": 28,
  "fechaRegistro": "2024-01-01T00:00:00.000Z"
}
```

---

### 4. Actualizar usuario por ID

| Método | Endpoint                          | Parámetro         | Body (JSON) requerido |
| ------ | --------------------------------- | ----------------- | --------------------- |
| PUT    | `http://localhost:3000/users/:id` | `:id` del usuario |  Obligatorio          |

**JSON para actualizar**:

```json
{
  "name": "Angie Pérez",
  "email": "angie@example.com",
  "age": 29
}
```

**Respuesta esperada** (objeto actualizado):

```json
{
  "_id": "64eea244abc123...",
  "name": "Angie Pérez",
  "email": "angie@example.com",
  "age": 29,
  "fechaRegistro": "2024-01-01T00:00:00.000Z"
}
```
