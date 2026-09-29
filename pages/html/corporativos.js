document.addEventListener('DOMContentLoaded', function () {
  const modalProducto = document.getElementById('modalProductoUnico');
  
  modalProducto.addEventListener('show.bs.modal', function (event) {
    // Botón o tarjeta que activó el modal
    const card = event.relatedTarget;
    
    // Extraer la información de los atributos data-*
    const titulo = card.getAttribute('data-titulo');
    const imagen = card.getAttribute('data-imagen');
    const descripcion = card.getAttribute('data-descripcion');
    
    // Inyectar los datos dentro de los elementos del modal
    modalProducto.querySelector('#modalProductoUnicoLabel').textContent = titulo;
    modalProducto.querySelector('#modalImg').src = imagen;
    modalProducto.querySelector('#modalImg').alt = titulo;
    modalProducto.querySelector('#modalDesc').textContent = descripcion;

    // Configurar el enlace de WhatsApp dinámicamente
    const telefonoWhatsApp = "573105178777"; // Reemplaza con tu número de WhatsApp real (ej. código de país + número)
    const mensaje = `Hola, deseo cotizar este set: *${titulo}*`;
    const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Asignar el enlace al botón del modal
    modalProducto.querySelector('#btnWhatsApp').href = urlWhatsApp;
  });
});