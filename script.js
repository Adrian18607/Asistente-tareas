async function enviarPregunta() {
  const nivel = document.getElementById("nivel").value;
  const tipo = document.getElementById("tipo").value;
  const pregunta = document.getElementById("pregunta").value;
  document.getElementById("respuesta").innerText = "Pensando...";

  const response = await fetch("/preguntar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nivel, tipo, pregunta })
  });

  const data = await response.json();
  document.getElementById("respuesta").innerText = data.respuesta;
}
