# AGENTS · Guía de diseño

## Principios innegociables
1. **Claridad visual** y contraste WCAG 2.2 AA :contentReference[oaicite:1]{index=1}  
2. **Atomic Design** estricto: átomos → moléculas → organismos → plantillas.  
3. **Liquid Glass**: traslucidez + blur (`backdrop-filter: blur(20px) saturate(180%)`) — Apple HIG :contentReference[oaicite:2]{index=2}.  
4. **Accesibilidad primero** (Radix UI como base) :contentReference[oaicite:3]{index=3}.  
5. **Pruebas y documentación** al crear o modificar cualquier componente:  
   * Test unitario (`*.test.tsx`) con Vitest + RTL.  
   * Historia en Storybook (`*.stories.tsx`) con todos los estados.  

## Flujo de creación de un átomo
```text
1. pnpm dlx hygen atom new --name <AtomName>   # generator (to‑do)
2. Implementa componente en TSX con props tipadas.
3. Agrega variante 'disabled' y 'loading' si aplica.
4. Escribe test abarcando estados críticos.
5. Añade historia con controles (args) y docs.
6. Importa en Home para enlace navegable.
```