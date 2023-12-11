import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname'
import useLanguage from "../../language/use-language";
import './style.css';
function LangSelector() {
  const {langContext, langList} = useLanguage();
  const {lang, setLang} = langContext;
  const [value, setValue] = useState(lang);

  const cn = bem('LangSelector');

  return (
    <div className={cn()}>
      <select
        value={value}
        onChange={e => {
          setValue(e.target.value);
          setLang(e.target.value);
        }}
      >
        {langList.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  )
}

export default memo(LangSelector);