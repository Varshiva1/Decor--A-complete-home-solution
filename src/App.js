import "./App.css";
import {Navbar,Footer} from "./components/index";
import { ToasterWrapper } from "./utils/ToastWrapper";
import { AllRoutes } from "./Routes/AllRoutes";
function App() {
  return (
    <main>
      <Navbar />
      <ToasterWrapper/>
      <div className="main-section">
        <AllRoutes/>
      </div>
      <Footer/>
    </main>
  );
}

export default App;