import { BrowserRouter } from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";

import CuratorRoutes from "./routes/CuratorRoutes";

import SubscriberRoutes from "./routes/SubscriberRoutes";
import 'bootstrap/dist/css/bootstrap.min.css'; 

import PublicRoutes from "./routes/PublicRoutes";





import "bootstrap/dist/js/bootstrap.bundle.min"
function App() {
  return (
    <BrowserRouter>
      <>
       
        <PublicRoutes/>
        <AdminRoutes/>
        <CuratorRoutes />
        <SubscriberRoutes />

      </>
    </BrowserRouter>
  );
}
//Work in private Nav
export default App;
