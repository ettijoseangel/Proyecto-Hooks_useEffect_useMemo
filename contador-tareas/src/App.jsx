import { useState, useEffect, useMemo } from "react";
import "./App.css"; // Importamos nuestro archivo de estilos

function App() {
  // PERSISTENCIA DE DATOS: Leemos el localStorage al cargar la aplicación
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas_guardadas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion] = useState("");

  // Nuevo estado para manejar el filtro actual
  const [filtro, setFiltro] = useState("todas");

  // PERSISTENCIA: Guardamos en el localStorage cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem("tareas_guardadas", JSON.stringify(tareas));
  }, [tareas]);

  // FILTRADO: Procesamos las tareas segun el filtro seleccionado
  const tareasFiltradas = useMemo(() => {
    if (filtro === "cortas")
      return tareas.filter((tarea) => tarea.duracion < 30);
    if (filtro === "largas")
      return tareas.filter((tarea) => tarea.duracion >= 30);
    if (filtro === "todas") return tareas.slice(-3); // Muestra solo las ultimas 3
    return tareas; // Por defecto, mostramos todas las tareas
  }, [tareas, filtro]);

  // 1. Calculamos el tiempo total basandonos en las tareas que se estan viendo en la pantalla
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareasFiltradas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareasFiltradas]); // Solo se recalcula cuando cambian las tareas filtradas

  //2. DESPUES usamos el useEffect (porque ya existe calcularTiempoTotal)
  // Efecto secundario: Actualizar el titulo del documento cada vez que cambia el total
  useEffect(() => {
    // Le quitamos los () a calcularTiempoTotal porque es un valor, no una funcion
    document.title = `Total de tiempo: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]); // Actualizamos la dependencia a calcularTiempoTotal

  // Funcion para agregar una nueva tarea
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
    <div className="contenedor-principal">
      <h1>Contador de Tareas</h1>

      <div className="panel-controles">
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
          placeholder="Minutos"
          min="1"
        />
        <button className="btn-agregar" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <div className="panel-filtros">
        <label>Ver tareas: </label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="cortas">Cortas (Menos de 30 min)</option>
          <option value="largas">Largas (30 min o más)</option>
          <option value="recientes">Agregadas recientemente</option>
        </select>
      </div>

      <div className="lista-tareas">
        <h2>Registro</h2>
        {tareasFiltradas.length === 0 ? (
          <p className="mensaje-vacio">No hay tareas para mostrar.</p>
        ) : (
          <ul>
            {tareasFiltradas.map((tarea, index) => (
              <li key={index}>
                <span className="tarea-nombre">{tarea.nombre}</span>
                <span className="tarea-duracion">{tarea.duracion} min</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="total-tiempo">
        Total de tiempo en vista: {calcularTiempoTotal} minutos
      </h3>
    </div>
  );
}

export default App;
