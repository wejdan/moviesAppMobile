import React, {useState, useContext, useEffect} from 'react';
import {
  requsetToken,
  createSession,
  Auth,
  getAccountId,
} from '../services/services';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AccountContext = React.createContext();

const AccountProvider = ({children}) => {
  const [session_id, setSession_id] = useState('');
  const [account, setAccount] = useState(null);

  const [IsLoading, SetLoading] = useState(true);

  const Login = async () => {
    const token = await requsetToken();
    const session = await Auth(token);
    const session_id = await createSession(session);
    const accountDetails = await getAccountId(session_id);
    setSession_id(session_id);
    setAccount(accountDetails);
    SetLoading(false);
  };

  useEffect(() => {
    Login();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        session_id,
        account,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AccountContext);
};

export {AccountContext, AccountProvider};
