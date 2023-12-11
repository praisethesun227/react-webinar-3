import {LangContext} from "./context";
import {useMemo, useState} from "react";

export default function useLanguageProvider() {
  const [lang, setLang] = useState((navigator.language || navigator.userLanguage).split('-')[0]);

  return useMemo(() => {
    return function LangProvider({children}) {
      return (
        <LangContext.Provider value={{lang, setLang}}>
          {children}
        </LangContext.Provider>
      )
    }
  }, [lang]);
}
