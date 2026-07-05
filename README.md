# Proyecto de Hooks useEffect y useMemo - Módulo 6: Introducción a React

> En este workshop, vamos a construir una pequeña aplicación en React que simule un "contador de tiempo" donde los usuarios pueden realizar un seguimiento de un conjunto de tareas. Además, utilizaremos `useEffect` para gestionar los efectos secundarios y `useMemo` para optimizar el rendimiento al procesar una lista de tareas.

---

## 🔴 Objetivo del proyecto

El objetivo de este workshop es aprender a utilizar los hooks `useEffect` y `useMemo` dentro de un proyecto de React. Al finalizar, serás capaz de:

1. Practicar la creación de un proyecto React utilizando `Vite`.
2. Utilizar `useEffect` para realizar efectos secundarios (como el manejo de la hora en la interfaz).
3. Utilizar `useMemo` para evitar cálculos innecesarios de las horas totales cuando no cambian las tareas.

---

## Proyecto/Taller: Creación de un Proyecto Contador de Tareas

Imagina que estamos desarrollando una aplicación sencilla para llevar un seguimiento de las tareas y calcular el tiempo total que una persona ha dedicado a cada tarea. Queremos asegurarnos de que los cálculos de tiempo solo se realicen cuando sea necesario, y no cada vez que el componente se renderice. Aquí es donde entran los hooks `useEffect` y `useMemo`.

---

## Instrucciones para workshop/taller:

### **1. Crear el proyecto con Vite**

Primero, vamos a crear un nuevo proyecto con React utilizando Vite.

1. Abre tu terminal y navega al directorio donde quieres crear el proyecto.
2. Ejecuta el siguiente comando para crear un proyecto nuevo con Vite y React:

   ```bash
   npm create vite@latest contador-tareas --template react
   ```

3. Cambia al directorio del proyecto recién creado:

   ```bash
   cd contador-tareas
   ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Abre el proyecto en tu editor de código favorito (por ejemplo, Visual Studio Code).

### **2. Estructura del proyecto**

Dentro de la carpeta `src`, verás el archivo `App.jsx`, que es donde vamos a implementar la lógica de la aplicación. Vamos a estructurarlo de la siguiente manera:

1. Un formulario que permita agregar tareas con su duración.
2. Una lista de tareas con sus tiempos.
3. Un total acumulado de tiempo que se calcule solo cuando se agregue una nueva tarea.

### **3. Crear la estructura básica del componente**

Abre el archivo `App.jsx` y empieza a construir la estructura básica de la aplicación:

```jsx
import React, { useState, useEffect, useMemo } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion] = useState("");

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal()} minutos`;
  }, [tareas]); // Se ejecuta cada vez que las tareas cambian

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea("");
      setDuracion("");
    }
  };

  return (
    <div>
      <h1>Contador de Tareas</h1>
      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />
        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración en minutos"
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <h2>Tareas</h2>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea.nombre}: {tarea.duracion} minutos
          </li>
        ))}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
```

### **4. Explicación del código**

- **useState**: Usamos `useState` para gestionar los estados de las tareas, la nueva tarea y la duración de la tarea.
- **useEffect**: Este hook se utiliza para actualizar el título de la página cada vez que las tareas cambian. Cada vez que se agrega una tarea, el efecto se ejecuta, y se actualiza el título con el total acumulado.

- **useMemo**: Usamos `useMemo` para memorizar el cálculo del tiempo total. Si las tareas no cambian, React reutiliza el valor calculado previamente, evitando cálculos innecesarios en cada renderizado.

##### **5. Ejecutar y ver los resultados**

Una vez que hayas implementado el código, es hora de ejecutar el proyecto y ver cómo funciona:

1. En la terminal, dentro del directorio del proyecto, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. Abre tu navegador y navega a `http://localhost:5173` (puede ser differente en tu caso).

3. Agrega algunas tareas con su duración y observa cómo el total de tiempo se calcula de manera eficiente, solo cuando agregas nuevas tareas.

4. Revisa también cómo el título de la página se actualiza con el total acumulado de tiempo gracias al `useEffect`.

### **6. Desafíos adicionales**

Para llevar este proyecto un paso más allá, puedes intentar lo siguiente:

1. **Filtrar tareas**: Agrega un filtro que permita ver solo las tareas de cierta duración o aquellas que hayan sido agregadas recientemente.
2. **Persistencia de datos**: Implementa la persistencia de datos utilizando `localStorage` para que las tareas no se pierdan cuando el navegador se recarga.

3. **Estilización**: Añade algunos estilos CSS para que la interfaz sea más atractiva y fácil de usar.

### **7. Conclusión**

Este workshop te ha enseñado cómo trabajar con los hooks `useEffect` y `useMemo` para gestionar efectos secundarios y optimizar cálculos en un proyecto de React. A través de un ejemplo práctico, aprendiste a manejar estados, actualizar el DOM y mejorar el rendimiento de tu aplicación.
