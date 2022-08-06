import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { SubHeader } from './components/sub-header';

import styles from './app.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <SubHeader />
      <Outlet />
    </div>
  );
}

export default App;
