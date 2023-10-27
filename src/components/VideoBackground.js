import React from "react";

const VideoBackground = () => {
  return (
   
<video
  muted                  // Sin audio
  autoPlay               // Reproducción automática al cargar la página
  loop                   // El video se reproduce en bucle
  style={{
    position: "fixed",    // Fija la posición en la ventana del navegador
    top: 0,               // Alineación en la parte superior
    left: 0,              // Alineación en la parte izquierda
    width: "100%",        // Ancho del video al 100% del contenedor padre
    height: "100%",       // Altura del video al 100% del contenedor padre
    objectFit: "cover",   // El video se ajusta para cubrir el contenedor manteniendo su relación de aspecto
    zIndex: -1,            // Coloca el video detrás de otros elementos de la página
  }}
>
  <source src="./assets/Videos/Background.mp4" type="video/mp4" /></video>// Ruta del video en formato mp4



  );
};

export default VideoBackground;
