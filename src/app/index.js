import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import Articles from "./articles";
import useLanguageProvider from "../language/use-language-provider";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

 const LangProvider = useLanguageProvider();

  return (
    <LangProvider>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/articles/:id' element={<Articles/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </LangProvider>
  );
}

export default App;
