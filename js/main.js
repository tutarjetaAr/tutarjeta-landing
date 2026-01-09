// 1. LOGICA DEL MENU QUE APARECE AL SCROLLEAR
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    // Si baja más de 400px (aprox pasando el hero), mostrar nav
    if (window.scrollY > 400) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// 2. LOGICA DEL TOGGLE DE PLANES (ESTANDAR / PREMIUM)
function cambiarPlan(plan) {
    // Actualizar atributo data-plan en el celular
    document.getElementById('pantalla-demo').setAttribute('data-plan', plan);
    
    // Actualizar botones activos
    let botones = document.querySelectorAll('.btn-plan');
    botones.forEach(btn => btn.classList.remove('active'));
    // Truco simple: agregar active al botón que se clickeó
    event.target.classList.add('active');
}

/// 3. LOGICA PARA CAMBIAR DE MODELO Y MOSTRAR DEMO EN VIVO
function cargarDemo(modeloId) {
    // a. Seleccionamos la sección contenedora del demo
    const demoSection = document.getElementById('live-demo');
    
    // b. Si está oculta (primera vez), la mostramos
    if (demoSection.style.display === 'none') {
        demoSection.style.display = 'block';
    }

    // c. Ocultamos todos los contenidos internos del celular
    let demos = document.querySelectorAll('.demo-content');
    demos.forEach(d => d.style.display = 'none');

    // d. Mostramos solo el seleccionado (ej. "demo-xv-mellis")
    let seleccionado = document.getElementById('demo-' + modeloId);
    if(seleccionado) {
        seleccionado.style.display = 'block';
        
        // e. Actualizamos el título de la sección (Opcional, para feedback visual)
        // (Aquí podrías usar un switch o un objeto para mapear IDs a nombres bonitos)
        document.getElementById('demo-title').innerText = "Viendo modelo: " + modeloId.replace('-', ' ').toUpperCase();

        // f. Scroll suave automático hacia la sección del demo para que el usuario vea que apareció
        demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}