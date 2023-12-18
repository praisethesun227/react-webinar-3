import {memo, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function AuthGuard(props) {
  const select = useSelector((state) => ({
    authorized: state.user.authorized,
    initComplete: state.user.initComplete
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!select.authorized && select.initComplete) {
      navigate(props.redirect)
    }
  }, [select.authorized, select.initComplete]);

  if (!select.authorized) {
    return null;
  }

  else {
    return props.children;
  }
}

AuthGuard.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node
}

export default memo(AuthGuard);
