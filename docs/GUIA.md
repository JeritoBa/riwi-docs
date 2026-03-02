# Simulacro Prueba Desempeño

Paso a paso

## 1. analizar el csv

entender que datos me estan dando, que entidades me estan dando, si hay datos repetidos etc...

## 2. realizar el diagrama entidad-relacion

- analizar que entidades hay y que atributos tienen (en lapiz y papel)
- entender las relaciones de cada entidad
- identificar tablas fuertes y debiles
- definir primary key y foreign key

### que es una foreign key?

es un campo que:
- apunta a la pk de otra tabla
- representa una relacion entre entidades

es la forma en que una tabla se conecta con otra

ejemplo: si puedo decir: "Un A pertenece a un B", entonces la tabla A debe tener una llave foranea (FK) de B

La foreign key va en la entidad que depende de la otra

regla universal: la FK va en el lado N

Si tengo una tabla cliente y una tabla pedidos, cada pedido debe relacionarse con un cliente. Un cliente tiene muchos pedidos, pero un pedido no puede tener muchos clientes

clientes: 

| nombre | apellido | id | dinero |
| :--- | :---: | :---: | ---:
| jero | gallego | 1 | 100000 |

pedidos:

| producto | monto_total | id_pedido | id_cliente |
| :--- | :---: | :---: | ---: |
| jabon | 4000 | 1 | 1 |

siendo id_cliente, la FK que apunta hacia la PK del cliente

¿ como se define en mysql ?

```

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

```

siendo references el atributo en si, y foreign key el nombre del atributo. en este caso, quiero una fk cliente_id que venga de la tabla clientes, del ID

## 3. formas de normalizacion

### 1FN

- Nada de listas en una celda
- Nada de campos multiples en una sola columna
- Atomicidad (Un valor debe ser lo mas pequeño posible)

### 2FN

Todos los atributos deben depender completamente de la clave primaria

Si tengo una tabla pedidos, que su primary key es el id de ese pedido, no puedo tener el nombre de un cliente que depende de el id del pedido. En ese caso, dicho atributo está mal ubicado.

### 3FN

No debe haber dependencias indirectas

cliente_id -> ciudad -> codigo_postal

El codigo postal depende de la ciudad, y la ciudad depende del cliente. Eso es dependencia transitiva

En dicho caso, se debe crear una tabla ciudad.

Si tengo esta tabla:

```
cliente_id
nombre
ciudad
codigo_postal
```

cliente_id determina ciudad
ciudad es la que determina codigo_postal

Esta forma de normalizacion explica que todos los atributo deben depender completamente de su primary key.

## 4. subir el csv a dbeaver

primero, creamos una tabla temporal donde llegan todos los datos crudos. dicha tabla se llama staging.

luego, importamos el csv en dbeaver

1. en panel de navegacion, click derecho a la tabla staging y seleccionar import data
2. elegir csv file como fuente y seleccionar archivo
3. mapear columnas
4. definir opciones: header si tu csv tiene encabezados, delimiter para saber cual es el delimitador de cada dato

luego, distribuimos los datos a las tablas normalizadas. Podemos usar comandos como distinct para eliminar duplicados

```
INSERT INTO clientes (nombre, email)
SELECT DISTINCT cliente_nombre, cliente_email
FROM staging_pedidos
```

o insertar pedidos con FK a cliente

```
INSERT INTO pedidos (id, fecha, cliente_id)
SELECT DISTINCT
    s.pedido_id,
    s.fecha,
    c.id
FROM staging_pedidos s
JOIN clientes c
    ON s.cliente_email = c.email
```

en caso de no recibir ids, utilizar auto_increment en mis tablas

## ejemplos de uso

### multer

config

```
// Configuración del storage (dónde se guardan los archivos)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // carpeta donde se guardan los archivos
  },
  filename: function (req, file, cb) {
    // Guarda el archivo con su nombre original
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware para parsear JSON si lo necesitas
app.use(express.json());
```

rutas

```
app.post('/upload-csv', upload.single('csvFile'), (req, res) => {
  // upload.single('csvFile') = nombre del campo en el formulario
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }

  console.log('Archivo subido:', req.file.path);
  res.send('Archivo subido correctamente!');
});
```

### mongodb

definir esquema

```
const clienteSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true }  // evita duplicados
});

const Cliente = mongoose.model('Cliente', clienteSchema);
```

insertar desde un csv

```
const fs = require('fs');
const csv = require('csv-parser');

fs.createReadStream('ordenes.csv')
  .pipe(csv())
  .on('data', async (row) => {
    try {
      // 1️⃣ Insertar cliente (si no existe)
      let cliente = await Cliente.findOne({ email: row.cliente_email });
      if (!cliente) {
        cliente = await Cliente.create({ nombre: row.cliente_nombre, email: row.cliente_email });
      }

      // 2️⃣ Insertar producto (si no existe)
      let producto = await Producto.findOne({ nombre: row.producto_nombre });
      if (!producto) {
        producto = await Producto.create({ nombre: row.producto_nombre, precio: parseFloat(row.precio) });
      }

      // 3️⃣ Insertar pedido o agregar producto a pedido existente
      let pedido = await Pedido.findOne({ fecha: row.fecha_pedido, cliente: cliente._id });
      if (!pedido) {
        pedido = await Pedido.create({ fecha: row.fecha_pedido, cliente: cliente._id, productos: [] });
      }

      // Agregar producto al pedido
      pedido.productos.push({ producto: producto._id, cantidad: parseInt(row.cantidad) });
      await pedido.save();

    } catch (err) {
      console.error(err);
    }
  })
  .on('end', () => {
    console.log('CSV procesado y base de datos actualizada');
  });
  ```

  conexion con mongodb
  ```
  const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pulse_core', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));
  ```

  siendo 

  127.0.0.1:27017 → dirección local de MongoDB.

pulse_core → nombre de tu base de datos. MongoDB la creará automáticamente al insertar el primer documento.

useNewUrlParser y useUnifiedTopology → opciones recomendadas para evitar warnings.