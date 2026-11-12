
let carrito = [];

function agregar(nombre, precio) {
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach((producto, indice) => {
        total += producto.precio;

        lista.innerHTML += `
            <p>
                ${producto.nombre} - $${producto.precio.toFixed(2)}
                <button onclick="eliminar(${indice})">
                    Quitar
                </button>
            </p>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2);

    document.getElementById("contador").textContent =
        carrito.length;
}

function eliminar(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function verCarrito() {
    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });
}

function hacerPedido() {
    if (carrito.length === 0) {
        alert("Primero agrega productos al carrito.");
        return;
    }

    let mensaje = "Hola, quiero realizar este pedido:%0A";
    let total = 0;

    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre}: $${producto.precio.toFixed(2)}%0A`;
        total += producto.precio;
    });

    mensaje += `%0ATotal: $${total.toFixed(2)}`;
    mensaje += "%0A¿Me pueden ayudar con mi pedido?";

    // REEMPLAZA este número por el WhatsApp
    // del negocio, incluyendo código de país.
    let telefono = "503XXXXXXXX";

    window.open(
        "https://wa.me/" + telefono + "?text=" + mensaje,
        "_blank"
    );
}

const WHATSAPP = "503XXXXXXXX";

const productos = [
    {id:1,nombre:"Pupusas revueltas",precio:3,emoji:"🫓",categoria:"Comida"},
    {id:2,nombre:"Cóctel de camarón",precio:5.50,emoji:"🍤",categoria:"Comida"},
    {id:3,nombre:"Fresco natural",precio:1.25,emoji:"🥤",categoria:"Bebidas"},
    {id:4,nombre:"Artesanías",precio:4,emoji:"🧺",categoria:"Artesanías"},
    {id:5,nombre:"Empanadas",precio:2,emoji:"🥟",categoria:"Comida"},
    {id:6,nombre:"Jugo natural",precio:1.75,emoji:"🧃",categoria:"Bebidas"}
];

let carrito = [];
let categoriaActual = "Todos";

function mostrarProductos() {
    const busqueda = document.getElementById("buscar").value.toLowerCase();

    const filtrados = productos.filter(p =>
        (categoriaActual === "Todos" || p.categoria === categoriaActual) &&
        p.nombre.toLowerCase().includes(busqueda)
    );

    document.getElementById("productos-lista").innerHTML =
        filtrados.map(p => `
            <div class="producto">
                <div class="producto-imagen">${p.emoji}</div>
                <h3>${p.nombre}</h3>
                <div class="precio">$${p.precio.toFixed(2)}</div>
                <button onclick="agregar(${p.id})">Agregar al carrito</button>
            </div>
        `).join("") || "<p>No hay productos.</p>";
}

function filtrar(categoria) {
    categoriaActual = categoria;
    mostrarProductos();
}

function agregar(id) {
    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({...productos.find(p => p.id === id), cantidad:1});
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    let total = 0;
    let cantidad = 0;

    document.getElementById("lista-carrito").innerHTML =
        carrito.map((p,i) => {
            total += p.precio * p.cantidad;
            cantidad += p.cantidad;

            return `<p>${p.nombre} x${p.cantidad}
            - $${(p.precio*p.cantidad).toFixed(2)}
            <button onclick="eliminar(${i})">Quitar</button></p>`;
        }).join("") || "<p>Tu carrito está vacío.</p>";

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("contador").textContent = cantidad;
}

function eliminar(i) {
    carrito[i].cantidad--;
    if (carrito[i].cantidad <= 0) carrito.splice(i,1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function verCarrito() {
    document.getElementById("carrito").scrollIntoView({behavior:"smooth"});
}

document.getElementById("buscar").addEventListener("input", mostrarProductos);

document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    if (carrito.length === 0) {
        alert("Agrega productos al carrito.");
        return;
    }

    if (!/^503\d{8}$/.test(WHATSAPP)) {
        alert("Configura el WhatsApp del negocio en app.js.");
        return;
    }

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    let mensaje = `Hola, soy ${nombre}. Teléfono: ${telefono}. Dirección: ${direccion}.\nMi pedido:\n`;
    let total = 0;

    carrito.forEach(p => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        mensaje += `${p.nombre} x${p.cantidad}: $${subtotal.toFixed(2)}\n`;
    });

    mensaje += `Total: $${total.toFixed(2)}`;

    window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
});

mostrarProductos();
actualizarCarrito();
