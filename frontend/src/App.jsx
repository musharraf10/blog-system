import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import CuratorRoutes from "./routes/CuratorRoutes";
import SubscriberRoutes from "./routes/SubscriberRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFilter from "./components/Subscribers/Webinars/SearchFilter";

function App() {
  return (
    <BrowserRouter>
      <>
       
        <PublicRoutes/>
        <AdminRoutes />
        <CuratorRoutes />
        <SubscriberRoutes />
      </>
    </BrowserRouter>
    
  );
}
//Work in private Nav
export default App;
