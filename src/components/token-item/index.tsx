import { Link } from 'react-router-dom';
import editSquareIcon from '../../assets/edit_square_white.svg';
import { TokenProps } from '../../@types/sharedTypes';
import styles from './token-item.module.css';

const normalizeBalance = (balance: number | null) => {
  if (!balance) return balance;
  return balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export function TokenItem({ id, name, balance }: TokenProps) {
  const normalizedBalance = normalizeBalance(balance);
  return (
    <div className={styles.tokenItem}>
      <div className={styles.tokenName}>
        <Link
          data-testid="edit-token-link"
          className={styles.tokenLink}
          to={`/edit-token/${id}`}
        >
          <img
            src={editSquareIcon}
            alt="Icon button to edit token"
            title="edit icon"
          />
        </Link>
        <p>{name}</p>
      </div>

      <div className={styles.tokenBalance}>
        <p data-testid="token-balance">{normalizedBalance}</p>
      </div>
    </div>
  );
}
