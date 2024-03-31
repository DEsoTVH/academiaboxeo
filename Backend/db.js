const { Client } = require("pg");

// Configura la conexión a la base de datos local
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "academia_futbol",
  allowExitOnIdle: true,
  port: 5432,
});

async function conectarDB() {
  try {
    // Conéctate a la base de datos
    await client.connect();
    console.log("Conexión a la base de datos establecida.");
  } catch (err) {
    console.error("Error en la conexión a la base de datos:", err);
  }
}

async function desconectarDB() {
  try {
    // Cierra la conexión a la base de datos
    await client.end();
    console.log("Conexión a la base de datos cerrada.");
  } catch (err) {
    console.error("Error al cerrar la conexión a la base de datos:", err);
  }
}

module.exports = { conectarDB, desconectarDB, client };
