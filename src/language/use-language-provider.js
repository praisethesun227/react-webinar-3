import {LangContext} from "./context";
import {useState} from "react";

export default function useLanguageProvider() {
  const [lang, setLang] = useState((navigator.language || navigator.userLanguage).split('-')[0]);

  function LangProvider({children}) {
    return (
      <LangContext.Provider value={{lang, setLang}}>
        {children}
      </LangContext.Provider>
    )
  }

  return LangProvider;
}