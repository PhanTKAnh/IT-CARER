import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie, deleteCookieByName } from "../helpers/cookie";
import { getProfileCompany } from "../sevices/employer/company.sevice";
import { getRefreshTokenCompany } from "../helpers/getToken";

export const useAuth = () => {
  const [tokenCompany, setTokenCompany] = useState(getCookie("tokenCompany"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenCompany);
  const [company, setCompany] = useState({});

  const login = (token) => {
    setCookie("tokenCompany", token, 60);
    setTokenCompany(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookieByName("refreshTokenCompany");
    deleteCookieByName("tokenCompany");
    setIsAuthenticated(false);
    setTokenCompany(null);
    setCompany({});
  };

  const refreshAndRetry = useCallback(async () => {
    const refreshedToken = await getRefreshTokenCompany();

    if (refreshedToken) {
      setCookie("tokenCompany", refreshedToken, 60);
      setTokenCompany(refreshedToken);
      setIsAuthenticated(true);

      try {
        const retryRes = await getProfileCompany(refreshedToken);

        if (retryRes.code === 200) {
          setCompany(retryRes.data);
        } else {
          logout();
        }
      } catch (e) {
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const fetchCompany = useCallback(async () => {
    if (!tokenCompany) return;

    try {
      const res = await getProfileCompany(tokenCompany);

      if (res.code === 200) {
        setCompany(res.data);
      } else if (res.code === 401) {
        await refreshAndRetry();
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  }, [tokenCompany, refreshAndRetry]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCompany();
    } else {
      setCompany({});
    }
  }, [isAuthenticated, fetchCompany]);

  useEffect(() => {
    if (!tokenCompany) {
      refreshAndRetry();
    }
  }, [tokenCompany, refreshAndRetry]);

  return {
    isAuthenticated,
    login,
    company,
    logout,
    setCompany,
    fetchCompany,
    tokenCompany,
  };
};
