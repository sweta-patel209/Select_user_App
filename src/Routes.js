
import Dashboard from "./components/Dashboard";
import SelectedUsers from "./components/SelectedUsers";

const Routes = [
    {
      path: "/",
      component: Dashboard
    },    
    {
        path: "/Selected",
        component: SelectedUsers,
        exact: true        
    }    
  ];
  
  export default Routes;