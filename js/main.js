// 1. SCROLL NAVBAR
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    // Si baja más de 400px, mostrar nav
    if (window.scrollY > 400) navbar.classList.add('visible');
    else navbar.classList.remove('visible');
});

// 2. FILTRAR MODELOS (Categorías)
function filterModels(categoria, botonClickeado) {
    // Actualizar botones visualmente
    const botones = document.querySelectorAll('.category-tabs button');
    botones.forEach(btn => btn.classList.remove('active'));
    botonClickeado.classList.add('active');

    // Filtrar tarjetas
    const modelos = document.querySelectorAll('.model-card');
    modelos.forEach(modelo => {
        const categoriaModelo = modelo.getAttribute('data-category');
        if (categoria === 'todos' || categoriaModelo === categoria) {
            modelo.style.display = 'block';
        } else {
            modelo.style.display = 'none';
        }
    });

    // Ocultar demo al cambiar de categoría para evitar confusiones
    document.getElementById('live-demo').style.display = 'none';
}

// 3. CARGAR DEMO EXTERNA
function cargarDemoExterna(urlSitio, nombreModelo) {
    const demoSection = document.getElementById('live-demo');
    const iframe = document.getElementById('iframe-demo');
    const titulo = document.getElementById('demo-title');

    // Mostrar sección
    demoSection.style.display = 'block';

    // Cargar URL en el Iframe
    iframe.src = urlSitio;
    
    // Feedback visual
    titulo.innerText = "Viendo: " + nombreModelo;

    // Scroll suave hacia el celular
    demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 4. ENVIAR MENSAJE AL SITIO EXTERNO (PostMessage)
function enviarMensajeIframe(plan) {
    const iframe = document.getElementById('iframe-demo');
    
    // Cambiar estilo botones landing
    // Nota: Agregamos una validación por si 'event' no está definido al llamarlo directo
    if (typeof event !== 'undefined' && event.target) {
        const botones = document.querySelectorAll('.btn-plan');
        botones.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // PREPARAMOS LOS DATOS
    const datosMensaje = { 
        tipo: 'cambioPlan', 
        plan: plan 
    };

    // SI ES PREMIUM, AGREGAMOS LA PERSONALIZACIÓN "FAKE"
    if (plan === 'premium') {
        datosMensaje.invitado = "Familia Invitada"; // El nombre que quieras mostrar
        datosMensaje.pases = "2"; 
    }

    // ENVIAR
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(datosMensaje, '*');
    }
}