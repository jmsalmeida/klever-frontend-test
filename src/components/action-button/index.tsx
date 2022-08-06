import { Link } from 'react-router-dom';
import styles from './action-button.module.css';

type ActionButtonProps = {
  label: string;
  linkTo?: string;
  primary?: boolean;
  danger?: boolean;
  submitButton?: boolean;
  action?: () => void;
};

function buttonColorClass({ primary, danger }: ActionButtonProps) {
  let style = styles.actionButton;

  if (primary) {
    style += ` ${styles.primaryButton}`;
    return style;
  }

  if (danger) {
    style += ` ${styles.dangerButton}`;
    return style;
  }

  return style;
}

function ButtonLink(props: ActionButtonProps) {
  const { linkTo, label } = props;
  return (
    <Link to={linkTo || ''} className={buttonColorClass(props)}>
      {label}
    </Link>
  );
}

function ButtonAction(props: ActionButtonProps) {
  const { label, submitButton, action } = props;

  return (
    <button
      type={submitButton ? 'submit' : 'button'}
      className={buttonColorClass(props)}
      onClick={() => (action ? action() : undefined)}
    >
      {label}
    </button>
  );
}

export function ActionButton(props: ActionButtonProps) {
  const { linkTo } = props;
  if (linkTo) {
    return ButtonLink(props);
  }

  return ButtonAction(props);
}
