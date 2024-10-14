import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { AppDispatch, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate('/');
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
