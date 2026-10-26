
export const estudiantes = [
  { id: 1, nombre: 'Ana', edad: 20 },
  { id: 2, nombre: 'Juan', edad: 22 },
  { id: 3, nombre: 'María', edad: 21 },
];


export function buscarEstudiantePorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const estudiante = estudiantes.find((e) => e.id === id);

      if (estudiante) {
        resolve(estudiante);
      } else {
        reject(new Error(`No existe un estudiante con el ID ${id}.`));
      }
    }, 500);
  });
}


const salida = document.getElementById('salida');
const formulario = document.getElementById('formulario');
const inputId = document.getElementById('inputId');


function mostrar(texto, esError = false) {
  console.log(texto);
  const p = document.createElement('p');
  p.textContent = texto;
  p.className = esError ? 'resultado error' : 'resultado ok';
  salida.prepend(p);
}

function consultar(id) {
  mostrar(`Búsqueda del estudiante con ID ${id}`);
  buscarEstudiantePorId(id)
    .then((est) => mostrar(`Nombre: ${est.nombre}, Edad: ${est.edad}`))
    .catch((err) => mostrar(`Error: ${err.message}`, true));
}


formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Number(inputId.value);
  if (!Number.isInteger(id)) return;
  consultar(id);
  inputId.select();
});

document.getElementById('btnEjemplos').addEventListener('click', () => {
  [2, 1, 3].forEach((id) => consultar(id));
});

document.getElementById('btnLimpiar').addEventListener('click', () => {
  salida.replaceChildren();
});
