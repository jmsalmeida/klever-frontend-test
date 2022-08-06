import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TokenForm } from '../components/token-form';
import { TokenProps } from '../@types/sharedTypes';

export function EditToken() {
  const { tokenId }: any = useParams();
  const [token, setToken] = useState<TokenProps>();

  function findTokenById() {
    const storedTokens: any = localStorage.getItem('tokens') ?? '';
    setToken(
      JSON.parse(storedTokens).find(
        (storedToken: TokenProps) => storedToken.id === parseInt(tokenId, 10)
      )
    );
  }

  useEffect(() => {
    findTokenById();
  }, []);

  return (
    <main>
      <TokenForm formTitle="edit token" tokenToEdit={token} />
    </main>
  );
}
