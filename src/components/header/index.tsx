import styles from './header.module.css';
import kleverLogo from '../../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={kleverLogo} alt="klever logo" title="klever logo" />
    </header>
  );
}
