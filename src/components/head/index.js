import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangSelector from "../lang-selector";

function Head({title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LangSelector/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
