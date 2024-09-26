import './App.css';
import Card from './components/Card';
import Head from './components/Head';
import SaveButton from './components/SaveButton';
import Table from './components/Table';

function App() {
  const headers = ['ID', 'Nombre', 'Edad', 'Trabajo'];
  const data = [
    { id: 1, nombre: 'Juan', edad: 28, trabajo: 'Desarrollador' },
    { id: 2, nombre: 'Ana', edad: 22, trabajo: 'Diseñadora' },
    { id: 3, nombre: 'Eider', edad: 21, trabajo: 'Desarrollador' },
    // Agrega más datos si es necesario para ver la paginación en acción
    { id: 4, nombre: 'Pedro', edad: 30, trabajo: 'Gerente' },
    { id: 5, nombre: 'Laura', edad: 25, trabajo: 'Analista' },
    { id: 6, nombre: 'Marta', edad: 29, trabajo: 'Tester' },
  ];

  return (
    <>
      <Card />
      <Head />
      <SaveButton />
      <Table headers={headers} data={data} rowsPerPage={2} />
    </>
  );
}

export default App;
