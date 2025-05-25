const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCompra = document.getElementById("total-compra");

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function renderCarrito() {
  contenedorCarrito.innerHTML = "";
  let total = 0;

  Object.values(carrito).forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const tarjeta = document.createElement("div");
    tarjeta.className = "card card-small";
    const imagenRuta = `./imagenesfyv/${producto.nombre.toLowerCase()}.png`;

    tarjeta.innerHTML = `
      <img src="${imagenRuta}" alt="${producto.nombre}" style="width:100%; border-radius: 10px 10px 0 0;">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio} CLP/kg</p>
      <p>${producto.cantidad} kg</p>
      <p>Total: $${subtotal} CLP</p>
      <div class="controles">
        <button class="btn-menos" data-nombre="${producto.nombre}">-</button>
        <button class="btn-mas" data-nombre="${producto.nombre}">+</button>
      </div>
    `;

    contenedorCarrito.appendChild(tarjeta);
  });

  totalCompra.textContent = `Total: $${total} CLP`;
  agregarEventosControles();
  mostrarBotonesFinales();
}

function agregarEventosControles() {
  document.querySelectorAll(".btn-mas").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      carrito[nombre].cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });
  });

  document.querySelectorAll(".btn-menos").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      carrito[nombre].cantidad--;
      if (carrito[nombre].cantidad <= 0) {
        delete carrito[nombre];
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });
  });
}

function mostrarBotonesFinales() {
  if (Object.keys(carrito).length === 0) return;

  const contenedorBotones = document.createElement("div");
  contenedorBotones.className = "controles";
  contenedorBotones.style.marginTop = "30px";
  contenedorBotones.innerHTML = `
    <button id="vaciar-carrito">Vaciar Carrito</button>
    <button id="finalizar-compra">Finalizar Compra</button>
  `;
  totalCompra.insertAdjacentElement("afterend", contenedorBotones);

  document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = {};
    localStorage.removeItem("carrito");
    renderCarrito();
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    carrito = {};
    localStorage.removeItem("carrito");
    contenedorCarrito.innerHTML = "<p>¡Gracias por su compra!</p>";
    totalCompra.textContent = "";
  });
}

renderCarrito();
