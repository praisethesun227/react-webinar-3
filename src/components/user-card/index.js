import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function UserCard(props) {
  const cn = bem('UserCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('usercard.title')}</h2>
      <div className={cn('info')}>
        <div className={cn('name')}>
          <span className={cn('label')}>{props.t('usercard.name')}: </span>
          <span className={cn('value')}>{props.userdata?.profile?.name}</span>
        </div>
        <div className={cn('phone')}>
          <span className={cn('label')}>{props.t('usercard.phone')}: </span>
          <span className={cn('value')}>{props.userdata?.profile?.phone}</span>
        </div>
        <div className={cn('email')}>
          <span className={cn('label')}>{props.t('usercard.email')}: </span>
          <span className={cn('value')}>{props.userdata?.email}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(UserCard);

UserCard.propTypes = {
  userdata: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    }),
    email: PropTypes.string
  }),
  t: PropTypes.func
}

UserCard.defaultTypes = {
  t: (text) => text
}