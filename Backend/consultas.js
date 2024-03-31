const { client } = require("./db");

async function listarUsuarios() {
  try {
    // Ejecuta la consulta
    const res = await client.query("SELECT * FROM usuarios;");
    // Retorna los resultados
    return res.rows;
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    return [];
  }
}

module.exports = { listarUsuarios };
