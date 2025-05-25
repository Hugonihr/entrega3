const frutas = [
  { tipo: "fruta", nombre: "Kiwi", precio: 2500 },
  { tipo: "fruta", nombre: "Plátano", precio: 1800 },
  { tipo: "fruta", nombre: "Naranja", precio: 1500 },
  { tipo: "fruta", nombre: "Manzana", precio: 2000 },
  { tipo: "fruta", nombre: "Pera", precio: 2200 },
  { tipo: "fruta", nombre: "Uva", precio: 2800 },
  { tipo: "fruta", nombre: "Limón", precio: 1700 },
  { tipo: "fruta", nombre: "Melón", precio: 3000 },
  { tipo: "fruta", nombre: "Pera Asiática", precio: 3200 },
  { tipo: "fruta", nombre: "Pomelo", precio: 2100 },
  { tipo: "fruta", nombre: "Mandarina", precio: 1900 },
  { tipo: "fruta", nombre: "Arándano", precio: 3500 },
  { tipo: "fruta", nombre: "Frambuesa", precio: 4000 },
  { tipo: "fruta", nombre: "Mora", precio: 3700 },
  { tipo: "fruta", nombre: "Tuna", precio: 2600 },
];

const verduras = [
  { tipo: "verdura", nombre: "Espinaca", precio: 1200 },
  { tipo: "verdura", nombre: "Brócoli", precio: 1500 },
  { tipo: "verdura", nombre: "Zapallo", precio: 1000 },
  { tipo: "verdura", nombre: "Pimiento", precio: 2000 },
  { tipo: "verdura", nombre: "Tomate", precio: 1800 },
  { tipo: "verdura", nombre: "Lechuga", precio: 1300 },
  { tipo: "verdura", nombre: "Acelga", precio: 1400 },
  { tipo: "verdura", nombre: "Coliflor", precio: 1600 },
  { tipo: "verdura", nombre: "Espárrago", precio: 3000 },
  { tipo: "verdura", nombre: "Albahaca", precio: 1200 },
  { tipo: "verdura", nombre: "Ají", precio: 1700 },
  { tipo: "verdura", nombre: "Ajo", precio: 1900 },
  { tipo: "verdura", nombre: "Papa", precio: 1100 },
  { tipo: "verdura", nombre: "Betarraga", precio: 1600 },
  { tipo: "verdura", nombre: "Perejil", precio: 1000 },
];

const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const filtroTipo = document.getElementById("filtroTipo");

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function renderProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card card-small";
    const imagenRuta = `./imagenesfyv/${producto.nombre.toLowerCase()}.png`;
    tarjeta.innerHTML = `
      <img src="${imagenRuta}" alt="${
      producto.nombre
    }" style="width:100%; border-radius: 10px 10px 0 0;">
      <h3>${producto.nombre}</h3>
      <p>${producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}</p>
      <p>$${producto.precio} CLP/kg</p>
      <button data-nombre="${producto.nombre}" data-precio="${
      producto.precio
    }">Añadir al carrito</button>
    `;
    contenedor.appendChild(tarjeta);
  });
  agregarEventosBotones();
}

function mostrarTarjetaDestacada(producto) {
  contenedor.innerHTML = "";
  const tarjeta = document.createElement("div");
  tarjeta.className = "card card-small";
  tarjeta.style.border = "3px solid #f39c12";
  const imagenRuta = `./imagenesfyv/${producto.nombre.toLowerCase()}.png`;
  tarjeta.innerHTML = `
    <img src="${imagenRuta}" alt="${
    producto.nombre
  }" style="width:100%; border-radius: 10px 10px 0 0;">
    <h3>${producto.nombre}</h3>
    <p>${producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}</p>
    <p>$${producto.precio} CLP/kg</p>
    <button data-nombre="${producto.nombre}" data-precio="${
    producto.precio
  }">Añadir al carrito</button>
  `;
  contenedor.appendChild(tarjeta);
  agregarEventosBotones();
}

function filtrarYBuscar() {
  const texto = buscador.value.toLowerCase();
  const tipo = filtroTipo.value;

  const todosLosProductos = [...frutas, ...verduras];
  for (const producto of todosLosProductos) {
    if (producto.nombre.toLowerCase() === texto) {
      mostrarTarjetaDestacada(producto);
      return;
    }
  }

  const productosFiltrados = todosLosProductos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(texto);
    const coincideTipo = tipo === "todos" || p.tipo === tipo;
    return coincideNombre && coincideTipo;
  });
  renderProductos(productosFiltrados);
}

function agregarEventosBotones() {
  const botones = document.querySelectorAll("button[data-nombre]");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      const precio = Number(boton.dataset.precio);
      if (carrito[nombre]) {
        carrito[nombre].cantidad++;
      } else {
        carrito[nombre] = {
          nombre,
          precio,
          cantidad: 1,
        };
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
}

buscador.addEventListener("input", filtrarYBuscar);
filtroTipo.addEventListener("change", filtrarYBuscar);

renderProductos([...frutas, ...verduras]);
