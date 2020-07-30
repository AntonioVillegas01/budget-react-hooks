import React, {useState, useEffect} from 'react';
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
    //Definir el state
    const[presupuesto,guardarPresupuesto] = useState(0);
    const[restante,guardarRestante] = useState(0);
    const[mostrarPregunta,actualizarPregunta] = useState(true);
    const[gastos,guardarGastos] = useState([]);
    const[gasto,guardarGasto] = useState({});
    const[creargasto,guardarCrearGasto] = useState(false);

    //useEffect que acxtualiza el restante
    useEffect( () => {
        if(creargasto){

            //agrega  nuevo presupuesto
            guardarGastos([
                ...gastos,
                gasto,
            ]);

            //Resta el presupuesto
            const presupuestoRestante = restante - gasto.cantidad;
            guardarRestante(presupuestoRestante);

            //RESETEAR a false
            guardarCrearGasto(false)
        }
    }, [gasto,creargasto,gastos, restante]);


    useEffect(() => {
        if(creargasto) {

            // agrega el nuevo presupuesto
            guardarGastos([
                ...gastos,
                gasto
            ]);

            // resta del presupuesto actual
            const presupuestoRestante = restante - gasto.cantidad;
            guardarRestante(presupuestoRestante);

            // Resetear a false
            guardarCrearGasto(false);
        }
    }, [gasto, creargasto, gastos, restante]);


  return (
      <div className="container">
        <header>
          <h1>Presupuesto</h1>
        </header>
          <div className="contenido-principal contenido">
              {/* Agregamos componente de carga condicional con parentesis para el return implicito*/}
              {mostrarPregunta
                  ? (<Pregunta
                  guardarPresupuesto={guardarPresupuesto}
                  guardarRestante={guardarRestante}
                  actualizarPregunta={actualizarPregunta}
              />)
                  : (
                      <div className="row">
                          <div className="one-half column">
                              <Formulario
                                  guardarGasto={guardarGasto}
                                  guardarCrearGasto={guardarCrearGasto}
                              />
                          </div>
                          <div className="one-half column">
                              <Listado
                                  gastos={gastos}
                              />
                              <ControlPresupuesto
                                  presupuesto={presupuesto}
                                  restante={restante}
                              />
                          </div>
                      </div>
                  )}
          </div>
      </div>
  );
}

export default App;
