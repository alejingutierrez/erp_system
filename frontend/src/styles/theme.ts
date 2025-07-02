export const theme = {
  colors: {
    primary: "#000000",      // Negro: principal (textos y elementos primarios)
    secondary: "#60CBC5",    // Secundario: turquesa para acentos
    tertiary: "#FF837A",     // Terciario: rojo coral para alertas/error
    quaternary: "#FBE267",   // Cuaternario: amarillo para warnings
    success: "#9EDC75",      // Éxito: verde para mensajes de success/highlight
    altPrimary: "#233640",   // Alternativo al primario: azul oscuro complementario
    surfaceGlass: "rgba(190, 138, 111, 0.3)"  // Mantener color translúcido para efecto glass (Mocha)
  },
  radius: {
    glass: "1rem",    // Borde redondeado para contenedores tipo "glass"
    base: "0.5rem"    // (Ejemplo) Radio base para botones, cards, etc. si se decide unificar
  },
  shadow: {
    glass: "0 8px 32px rgba(31, 38, 135, 0.37)"  // Sombra suave para efecto glass
    // Podrían agregarse sombras estándar si se definen para otros elementos
  }
} as const;
