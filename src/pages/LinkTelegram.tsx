import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';

const LinkTelegram = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const token = searchParams.get('token');

  const linkTelegram = async () => {
    try {
      if (!token) {
        setError('No token provided');
        return;
      }

      await api.link_telegram(token);

      navigate('/login');
      console.log(token);

    } catch (err) {
      setError('Failed to link telegram');
    }
  };

  useEffect(() => {
    linkTelegram();
  }, []);  
  
  return (
    <div>
      {error && <p>{error}</p>}
      <p>Linking Telegram...</p>
    </div>
  );
}

export default LinkTelegram;