import { useLocation } from 'react-router-dom';
import { ActionButton } from '../action-button';
import shootingStarLogo from '../../assets/shooting-star.svg';
import styles from './sub-header.module.css';

export function SubHeader() {
  const location = useLocation();

  function showAddTokenLink() {
    if (location.pathname === '/') {
      return (
        <div className={styles.buttonContainer}>
          <ActionButton label="add token" linkTo="/add-token" primary />
        </div>
      );
    }

    return null;
  }

  return (
    <header className={styles.subHeader}>
      <div className={styles.logoContainer}>
        <img
          src={shootingStarLogo}
          alt="shooting star logo"
          title="shooting star logo"
        />
        <h2>Wish Wallet</h2>
      </div>

      {showAddTokenLink()}
    </header>
  );
}
