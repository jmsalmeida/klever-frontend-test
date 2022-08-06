import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TokenProps } from '../../@types/sharedTypes';
import { ActionButton } from '../action-button';
import styles from './token-form.module.css';

type TokenFormProps = {
  formTitle: string;
  tokenToEdit?: TokenProps;
};

export function TokenForm({ formTitle, tokenToEdit }: TokenFormProps) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenProps>();

  const navigate = useNavigate();

  const editToken = (storedTokens: TokenProps[], editedToken: TokenProps) => {
    const tokenRef = storedTokens.findIndex(
      (storedToken: TokenProps) => storedToken.id === editedToken.id
    );

    storedTokens[tokenRef] = editedToken;
  };

  const addToken = (storedTokens: TokenProps[], token: TokenProps) => {
    storedTokens.push({ ...token, id: Date.now() });
  };

  const deleteToken = (id: number) => {
    let storedTokens: any = localStorage.getItem('tokens');
    storedTokens = storedTokens ? JSON.parse(storedTokens) : [];

    storedTokens = storedTokens.filter((token: TokenProps) => token.id !== id);
    localStorage.setItem('tokens', JSON.stringify(storedTokens));
    navigate('/', { replace: true });
  };

  const onSubmit = handleSubmit(async (data) => {
    const token = tokenToEdit ?? ({} as TokenProps);
    token.name = data.name.toUpperCase();
    token.balance = data.balance;

    const storedTokens: any = localStorage.getItem('tokens');
    const aux = storedTokens ? JSON.parse(storedTokens) : [];

    if (token.id) {
      editToken(aux, token);
    } else {
      addToken(aux, token);
    }

    localStorage.setItem('tokens', JSON.stringify(aux));
    navigate('/', { replace: true });
  });

  const setTokenValues = () => {
    if (tokenToEdit) {
      setValue('name', tokenToEdit.name);
      setValue('balance', tokenToEdit.balance);
    }
  };

  useEffect(() => {
    setTokenValues();
  }, [tokenToEdit]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3>{formTitle}</h3>
        <ActionButton label="back" linkTo="/" />
      </div>

      <form onSubmit={onSubmit} className={styles.formBody}>
        <div className={styles.inputContainer}>
          <label>Token</label>
          <input
            data-testid="token-name-input"
            type="text"
            {...register('name', {
              required: 'Token is required',
              pattern: {
                value: /[A-Za-z]/,
                message: 'Token should be a text',
              },
              validate: (value) => {
                const storedTokens = localStorage.getItem('tokens');

                if (storedTokens && !tokenToEdit) {
                  const tokenAlreadyExists = JSON.parse(storedTokens).some(
                    (token: TokenProps) =>
                      token.name.toUpperCase() === value.toUpperCase()
                  );

                  return !tokenAlreadyExists || 'Token already exist';
                }
              },
            })}
          />
          {errors.name && (
            <p data-testid="token-name-error" className={styles.errorMessage}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label>Balance</label>
          <input
            data-testid="balance-input"
            type="tel"
            {...register('balance', {
              required: 'Balance is required',
              valueAsNumber: true,
            })}
          />
          {errors.balance && (
            <p data-testid="balance-error" className={styles.errorMessage}>
              {errors.balance.message}
            </p>
          )}
        </div>

        <div className={styles.actionsContainer}>
          {tokenToEdit ? (
            <ActionButton
              danger
              label="remove"
              action={() => deleteToken(tokenToEdit.id)}
            />
          ) : null}
          <span />
          <ActionButton primary label="save" submitButton />
        </div>
      </form>
    </div>
  );
}
