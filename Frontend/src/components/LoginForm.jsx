import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data); // Manejar la respuesta del servidor
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginForm;
