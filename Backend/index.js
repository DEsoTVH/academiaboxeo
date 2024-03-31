const express = require("express");
const { conectarDB, desconectarDB, client } = require("./db");
const { listarUsuarios } = require("./consultas");
const cors = require("cors");

const app = express();
const port = 3000;

// Habilitar CORS solo para ciertos orígenes
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Agrega los orígenes que necesites permitir
};

app.use(cors(corsOptions));

// Usar CORS middleware
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para obtener usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Endpoint login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Consulta para verificar las credenciales en la base de datos
    const query =
      "SELECT * FROM usuarios WHERE correo_electronico = $1 AND contrasena = $2";
    const result = await client.query(query, [email, password]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Iniciar el servidor
async function iniciarServidor() {
  // Conectar a la base de datos
  await conectarDB();

  // Escuchar en el puerto especificado
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

// Iniciar el servidor
iniciarServidor();
