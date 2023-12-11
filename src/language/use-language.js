import {useContext} from "react";
import {LangContext} from "./context";
import dictionary from "./dictionary.json";
import langList from "./lang-list.json";

export default function useLanguage() {
  /**
   * @type {{lang: string, setLang: function}}
   */
  const langContext = useContext(LangContext);
  const list = Object.values(langList);

  return {langContext, translate, langList: list};
}

const translate = (key, lang, defaultValue) => {
  let string = dictionary[key][lang];

  if (!string)
    return defaultValue;

  return string;
}
