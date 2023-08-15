
// Espera a que se cargue el contenido de la página antes de agregar el listener
document.addEventListener("DOMContentLoaded", function () {

  // Seleccionar el botón
  var menuBtn = document.querySelector(".menu-icon");
  // Seleccionar la lista de navegacion
  var menu = document.querySelector(".navigation ul");
  // Agregar el listener para el evento clic
  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  // Seleccionar todos los enlaces de navegación que apuntan a anclas
  const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
  //Seleccionar boton flecha-arriba flotante
  const BtnFlechaArriba = document.querySelector('#btn-flecha-arriba');
  // Función para el desplazamiento suave
  function scrollToSection(event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerHeight = document.querySelector('.header').offsetHeight + 20; /*este +20 se lo agrego para dejarle mas espacio arriba*/
    const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scroll({
      top: offset,
      behavior: 'smooth'
    });
  }
  // Agregar evento click a cada enlace de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });

  BtnFlechaArriba.addEventListener('click', scrollToSection);

  // "Traducir" pagina al ingles
  const botonEsEn = document.getElementById('btn-es-en');
  botonEsEn.addEventListener("click", function () {
    let url = window.location.href;
    let filename = url.substring(url.lastIndexOf('/') + 1);
    if (filename === 'index.html') {
      window.location.href = 'english.html';
    } else {
      window.location.href = 'index.html';
    }
  });

  //---------------------- Dark Mode -------------------------
  // Obtener el botón y los elementos que deseas modificar
  const botonClaroOscuro = document.getElementById('btn-claro-oscuro');
  const root = document.documentElement;
  // Función para cambiar entre modos claro y oscuro
  function toggleDarkMode() {
    root.classList.toggle('dark-mode'); // Agrega o quita una clase para cambiar el estilo
  }
  // Evento clic para cambiar el modo
  botonClaroOscuro.addEventListener('click', toggleDarkMode);

  //------------------- BOTON FLECHA ARRIBA --------------------
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 300) {
      BtnFlechaArriba.style.display = 'flex';
    } else {
      BtnFlechaArriba.style.display = 'none';
    }
  });

  //------------------- CONTACTO INPUT FORM FUNCIONAL --------------------
  document.getElementById("form_btn").addEventListener("click", function () {
    const nombre = encodeURIComponent(document.getElementById("nombre").value);
    const correo = encodeURIComponent(document.getElementById("correo").value);
    const asunto = encodeURIComponent(document.getElementById("asunto").value);
    const mensaje = encodeURIComponent(document.getElementById("mensaje").value);

    const mailtoLink = `mailto:germilagger@hotmail.com?subject=${asunto}&body=${mensaje}%0A%0A${nombre}%0A${correo}`;
    window.location.href = mailtoLink;
  });

  //------------------- Para ir mostrando el contenido de a poco --------------------
  const sections = document.querySelectorAll('.scroll-section');
  const options = {
    threshold: 0.2 // El porcentaje de intersección para activar la animación
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  //------------------- PARA DESCARGAR CV EN PDF --------------------
  document.getElementById('download-cv').addEventListener('click', function () {
    // Ruta al archivo PDF
    const pdfFilePath = 'curriculum-vitae.pdf';
    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Lagger-German-CV.pdf'; // Nombre de archivo sugerido al descargar
    document.body.appendChild(link);
    // Hacer clic en el enlace y luego removerlo
    link.click();
    document.body.removeChild(link);
  });

});
