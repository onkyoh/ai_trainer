import { useState, useEffect } from "react";
import axios from "axios";
import { ICurrentUser } from "../../../types";
import { clearToken, getToken } from "../../../utils/storage";
import { API_URL } from "../../../utils/constants";

interface IExistingUserRes {
  data: {
    success: Boolean;
    message: string;
    data: ICurrentUser;
  };
}

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const retrieveUser = async (token: string) => {
    setIsLoading(true);
    try {
      const res: IExistingUserRes = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data && res.data.data) {
        setCurrentUser({ ...res.data.data });
      }
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    const token: string | null = getToken();
    if (!token) return;
    retrieveUser(token);
  }, []);

  const logout = () => {
    setCurrentUser(null);
    clearToken();
  };

  return {
    currentUser,
    setCurrentUser,
    logout,
    isLoading,
  };
};

export default useCurrentUser;
