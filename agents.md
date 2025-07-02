# AGENTS · El Manifiesto del Liquid Glass Design System

## 1. El Manifiesto: Nuestra Filosofía

No construimos interfaces, creamos experiencias. Nuestro norte es el **diseño líquido**: interfaces que se sienten orgánicas, intuitivas y vivas. La estética "Liquid Glass" no es solo un efecto visual; es nuestra filosofía de **claridad, profundidad y fluidez**. Cada componente, cada interacción, debe guiar al usuario sin esfuerzo, presentando la información de forma clara y contextual, como un objeto visto a través de un cristal pulido.

## 2. Los Pilares del Diseño

Estos son los principios innegociables que garantizan la excelencia y la coherencia en todo lo que construimos.

### 2.1. Claridad y Foco (WCAG 2.2 AA)
*   **Por qué:** Una interfaz hermosa que no es legible es un fracaso. La accesibilidad visual no es una opción, es un requisito. Garantizamos que todos los usuarios, sin importar sus capacidades visuales, puedan interactuar con nuestro producto de manera efectiva.
*   **Cómo:**
    *   **Contraste:** Todo texto debe cumplir un ratio de contraste mínimo de 4.5:1 (AA). Usamos nuestra paleta de Tailwind (`neutral-900` sobre `neutral-50`) como base segura.
    *   **Jerarquía:** El tamaño, peso y color de la tipografía deben crear una jerarquía visual clara que guíe la atención del usuario.

### 2.2. Atomic Design: La Arquitectura de la Coherencia
*   **Por qué:** Nos permite construir interfaces complejas de manera consistente, escalable y mantenible. Cada pieza tiene un propósito y un lugar.
*   **Cómo:**
    *   **Átomos:** Los bloques de construcción fundamentales (`Button`, `Input`, `Label`). No pueden ser descompuestos.
    *   **Moléculas:** Grupos de átomos que funcionan juntos como una unidad (`FormControl` = `Label` + `Input`).
    *   **Organismos:** Conjuntos de moléculas que forman una sección discreta de una interfaz (`Header`, `Sidebar`).

### 2.3. Liquid Glass: La Estética de la Fluidez
*   **Por qué:** Crea una sensación de profundidad y contexto espacial. Las superficies translúcidas ayudan al usuario a mantener el contexto de lo que está detrás, haciendo que la experiencia sea menos disruptiva.
*   **Cómo:**
    *   Utilizamos la clase de utilidad `.glass` definida en `global.css`.
    *   Esta clase aplica un `background` semitransparente, `backdrop-filter` (blur y saturación) y un borde sutil para simular el efecto de un cristal esmerilado.

### 2.4. Calidad Total: Pruebas y Documentación
*   **Por qué:** Un componente sin pruebas y sin documentación es una deuda técnica. La calidad no se negocia.
*   **Cómo:**
    *   **Pruebas Unitarias (Vitest + RTL):** Cada componente DEBE tener un archivo `*.test.tsx`. Probamos el comportamiento, no la implementación. ¿Renderiza? ¿Responde a eventos? ¿Es accesible?
    *   **Documentación Visual (Storybook):** Cada componente DEBE tener un archivo `*.stories.tsx`. Creamos historias para cada variante y estado. Usamos controles (`args`) para que el componente sea explorable y MDX para documentar su uso.

## 3. El Flujo de Creación de Componentes

Este es el proceso estandarizado para crear cualquier componente nuevo, garantizando consistencia y calidad.

### Paso 0: Estructura de Archivos

Cada componente vive en su propia carpeta para máxima encapsulación. Para un átomo `Button`, la estructura es:

```sh
src/atoms/Button/
├── Button.tsx         # El componente y sus variantes (cva)
├── Button.stories.tsx # Historias de Storybook
├── Button.test.tsx    # Pruebas unitarias
└── index.ts           # Archivo barril para exportación limpia
```

### Paso 1: Definición del Componente (`Button.tsx`)

Usamos **`class-variance-authority (cva)`** para manejar las variantes de estilo de una forma limpia y escalable.

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

// 1. Definir variantes y estilos base
const buttonVariants = cva('inline-flex items-center justify-center rounded-md ...',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-white ...',
        secondary: 'bg-secondary text-white ...',
      },
      size: {
        medium: 'h-10 px-4 ...',
        large: 'h-12 px-6 ...',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

// 2. Definir las props del componente
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

// 3. Crear el componente
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
```

### Paso 2: Pruebas Unitarias (`Button.test.tsx`)

Validamos que el componente se comporte como se espera en todos los escenarios.

**Checklist de pruebas:**
- [ ] Renderiza el texto o los hijos correctamente.
- [ ] Aplica las clases correctas para la `intent` y `size` por defecto.
- [ ] Aplica las clases correctas cuando se especifican `intent` y `size`.
- [ ] El atributo `disabled` funciona y previene eventos `onClick`.
- [ ] Se invoca la función `onClick` cuando se hace clic.

### Paso 3: Documentación Visual (`Button.stories.tsx`)

Creamos un catálogo vivo de nuestro componente.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    children: 'Secondary Button',
  },
};
```

### Paso 4: Exportación Limpia (`index.ts`)

Usamos un archivo "barril" para simplificar las importaciones en otras partes de la aplicación.

```ts
export * from './Button';
```

Con este manifiesto, no solo estamos construyendo un sistema de diseño; estamos estableciendo una cultura de excelencia.