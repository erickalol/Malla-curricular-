const materias = {
  "1": [
    { nombre: "Taller de Diseño I", requiere: [] },
    { nombre: "Teoría I", requiere: [] },
    { nombre: "Historia I", requiere: [] },
    { nombre: "Expresión Oral y Escrita", requiere: [] },
    { nombre: "Dibujo I", requiere: [] },
    { nombre: "Geometría Descriptiva", requiere: [] },
    { nombre: "Computación Básica", requiere: [] },
    { nombre: "Teoría y Manejo del Color", requiere: [] },
  ],
  "2": [
    { nombre: "Taller de Diseño II", requiere: ["Taller de Diseño I"] },
    { nombre: "Historia II", requiere: ["Historia I"] },
    { nombre: "Teoría y Metodología I", requiere: ["Teoría I"] },
    { nombre: "Teoría y Comunicación I", requiere: ["Expresión Oral y Escrita"] },
    { nombre: "Gráfica Computacional I", requiere: ["Computación Básica"] },
    { nombre: "Dibujo Artístico", requiere: ["Dibujo I"] },
    { nombre: "Fotografía", requiere: ["Teoría y Manejo del Color"] },
    { nombre: "Tecnología para el Diseño I", requiere: ["Computación Básica"] },
  ],
  "3":
    [
  { nombre: "Taller de Diseño III", requiere: ["Taller de Diseño II", "Geometría Descriptiva"] },
  { nombre: "Teoría y Metodología II", requiere: ["Teoría y Metodología I"] },
  { nombre: "Teoría y Comunicación II", requiere: ["Teoría y Comunicación I"] },
  { nombre: "Publicidad y Marketing", requiere: ["Fotografía"] },
  { nombre: "Diseño y Medio Ambiente", requiere: ["Historia II"] },
  { nombre: "Gráfica Computacional II", requiere: ["Gráfica Computacional I"] },
  { nombre: "Tecnología para el Diseño II", requiere: ["Tecnología para el Diseño I"] }
    ],
  "4": [
    { nombre: "Taller de Diseño IV", requiere: ["Taller de Diseño III"] },
    { nombre: "Teoría y Metodología III", requiere: ["Teoría y Metodología II"] },
    { nombre: "Teoría y Comunicación III", requiere: ["Teoría y Comunicación II"] },
    { nombre: "Psicología del Mensaje Visual", requiere: ["Teoría y Comunicación II"] },
    { nombre: "Gestión de Proyectos", requiere: ["Publicidad y Marketing"] },
    { nombre: "Tipografía", requiere: ["Taller de Diseño III"] }
  ],
  "5": [
    {
      nombre: "Taller de Diseño V",
      requiere: [
        "Taller de Diseño IV",
        "Teoría y Metodología III",
        "Teoría y Comunicación III",
        "Psicología del Mensaje Visual",
        "Gestión de Proyectos",
        "Tipografía"
      ]
    }
  ]
};

let materiasAprobadas = [];

function guardarEstado() {
  localStorage.setItem('materiasAprobadas', JSON.stringify(materiasAprobadas));
}

function cargarEstado() {
  const data = localStorage.getItem('materiasAprobadas');
  if (data) materiasAprobadas = JSON.parse(data);
}

function estaHabilitada(materia) {
  return (materia.requiere.length === 0 || materia.requiere.every(req => materiasAprobadas.includes(req)));
}

function renderNivel(nivel) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";
  materias[nivel].forEach(mat => {
    const div = document.createElement("div");
    const esAprobada = materiasAprobadas.includes(mat.nombre);
    const habilitada = estaHabilitada(mat);

    div.className = "card";
    if (!habilitada && !esAprobada) div.classList.add("locked");
    if (esAprobada) div.classList.add("aprobada");

    div.innerHTML = `<strong>${mat.nombre}</strong>` +
      (mat.requiere.length ? `<div class="requiere">Requiere: ${mat.requiere.join(", ")}</div>` : "");

    div.onclick = () => {
      if (!habilitada && !esAprobada) return;
      if (esAprobada) {
        materiasAprobadas = materiasAprobadas.filter(m => m !== mat.nombre);
      } else {
        materiasAprobadas.push(mat.nombre);
      }
      guardarEstado();
      renderNivel(nivel);
    };

    contenedor.appendChild(div);
  });

  document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  document.getElementById(`btn${nivel}`).classList.add("active");
}

function crearNav() {
  const nav = document.getElementById("nav");
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.id = `btn${i}`;
    btn.innerText = `Nivel ${i}`;
    btn.onclick = () => renderNivel(i.toString());
    nav.appendChild(btn);
  }
}

cargarEstado();
crearNav();
renderNivel("1");
