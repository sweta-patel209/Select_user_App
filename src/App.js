import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import UserProvider from './contextApi/UserProvider'


const switchRoutes = (
  <Switch>
    {Routes.map((prop, key) => {
      return (
        <Route
          exact
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
  </Switch>
);

function App() {
  return (
    <div> 
     
      <BrowserRouter>
       <UserProvider>    
        {switchRoutes}
        </UserProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
