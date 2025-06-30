import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import './App.css';

function App() {
  // Define all the routes for our app
  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />
    },
    {
      path: "/creator/:id",
      element: <ViewCreator />
    },
    {
      path: "/edit/:id", 
      element: <EditCreator />
    },
    {
      path: "/new",
      element: <AddCreator />
    }
  ]);

  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;