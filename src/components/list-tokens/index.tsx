import { useState, useEffect } from 'react';
import styles from './list-tokens.module.css';
import { TokenItem } from '../token-item';
import { TokenProps } from '../../@types/sharedTypes';

export function ListTokens() {
  const [tokens, setTokens] = useState<TokenProps[]>([]);

  useEffect(() => {
    let storedTokens: any = localStorage.getItem('tokens') ?? '';

    if (storedTokens) {
      storedTokens = JSON.parse(storedTokens);
      setTokens([...storedTokens]);
    }
  }, []);

  return (
    <div className={styles.listContainer}>
      {Array.isArray(tokens) && tokens.length === 0 ? (
        <p data-testid="empty-list-message">There are not registered tokens</p>
      ) : (
        <>
          <div className={styles.listTitles}>
            <strong>Tokens</strong>
            <strong>Balance</strong>
          </div>

          <div className={styles.listTokens}>
            {tokens.map((token) => (
              <TokenItem
                data-testid={`token-item${token.id}`}
                id={token.id}
                key={token.id}
                name={token.name}
                balance={token.balance}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
