const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');

// Botones
const btnTodos = document.querySelector('.todos');
const btn1 = document.querySelector('[data-platillo="1"].btn');
const btn2 = document.querySelector('[data-platillo="2"].btn');
const btn3 = document.querySelector('[data-platillo="3"].btn');
const btn4 = document.querySelector('[data-platillo="4"].btn');

// Contenedor de dashboards
const contenedorPlatillos = document.querySelector('.Dashboard');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
    dashboards();
});

// =========================
// 🚀 Menú hamburguesa
// =========================
const eventos = () => {
    if (menu) menu.addEventListener('click', abrirMenu);
};

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
};

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if (document.querySelectorAll('.pantalla-completa').length > 0) return;

    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
};

const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = () => {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    };
};

// =========================
// 🚀 Lazy loading imágenes
// =========================
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

// 👇 Fix: las flechas de testimonio cargan directo
imagenes.forEach(imagen => {
    if (imagen.classList.contains('testimony__arrow')) {
        // 🚀 Las flechas cargan siempre
        imagen.src = imagen.dataset.src;
    } else {
        // 🚀 Las demás siguen en lazy
        observer.observe(imagen);
    }
});

// =========================
// 🚀 Filtros de dashboards
// =========================
const dashboards = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo.push(platillo));

    const d1 = platillosArreglo.filter(item => item.getAttribute('data-platillo') === '1');
    const d2 = platillosArreglo.filter(item => item.getAttribute('data-platillo') === '2');
    const d3 = platillosArreglo.filter(item => item.getAttribute('data-platillo') === '3');
    const d4 = platillosArreglo.filter(item => item.getAttribute('data-platillo') === '4');

    mostrarPlatillos(d1, d2, d3, d4, platillosArreglo);
};

const mostrarPlatillos = (d1, d2, d3, d4, todos) => {
    btn1.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        d1.forEach(d => contenedorPlatillos.appendChild(d));
    });

    btn2.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        d2.forEach(d => contenedorPlatillos.appendChild(d));
    });

    btn3.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        d3.forEach(d => contenedorPlatillos.appendChild(d));
    });

    btn4.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        d4.forEach(d => contenedorPlatillos.appendChild(d));
    });

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        todos.forEach(d => contenedorPlatillos.appendChild(d));
    });
};

const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};
