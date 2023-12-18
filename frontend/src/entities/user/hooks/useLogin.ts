import { useActions } from "@/shared/lib/hooks/useActions";
import { useTypedSelector } from "@/shared/lib/hooks/useTypedSelector";
import { useEffect } from "react";
import { useLoginMutation } from "..";
import Cookie from 'js-cookie';

export const useLogin = () => {
  const { setAuthToken, setLoaderActive } = useActions();
  const authToken = useTypedSelector((state) => state.user.token);
  const [login] = useLoginMutation();
  
  useEffect(() => {
    const borbozaIdCookie = Cookie.get('orders_borboza_sid');
    if (!borbozaIdCookie) {
      const base64 = btoa(window.location.href);
      const redirectLink = `https://passport.borboza.com/passport/login?returl=${base64}`;
      window.location.replace(redirectLink);
      return;
    }
    if (authToken) {
      return;
    }

    login({
      orders_borboza_sid: borbozaIdCookie,
    }).then((res) => {
      if ('data' in res && 'data' in res.data) {
        setAuthToken(res.data.data.access_token);
      }
      setLoaderActive(false);
    });
    setLoaderActive(true);
  }, [authToken, login, setAuthToken, setLoaderActive]);

  return [authToken];
}
