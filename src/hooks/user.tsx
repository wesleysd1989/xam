import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { users } from "../constants/users_data";

export interface UserState {
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

export interface LoginData {
  branch: number;
  username: string;
  password: string;
}

interface UserContextData {
  logged: boolean;
  users: UserState[];
  username: string;
  register(user: UserState): void;
  remove(id: number): void;
  login(data: LoginData): void;
  logout(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [data, setData] = useState<UserState[]>([]);

  useEffect(() => {
    setData(users);
  }, []);

  const register = useCallback(
    async ({
      branchId,
      userName,
      password,
      firstName,
      middleName,
      lastName,
      position,
    }: UserState) => {
      setData((prevData) => [
        ...prevData,
        {
          branchId: Math.abs(branchId),
          userName,
          password,
          firstName,
          middleName,
          lastName,
          position,
        },
      ]);
    },
    []
  );

  const remove = useCallback(async (id: number) => {
    setData((prevData) => prevData.filter((user) => user.branchId !== id));
  }, []);

  const login = useCallback(({ branch, username, password }: LoginData) => {
    const session = data.some((user) => {
      return (
        user.branchId === Math.abs(branch) &&
        user.userName === username &&
        user.password === password
      );
    });
    if(session){
      setUsername(username);
      setLogged(session);
    } else {
      throw new Error("Branch ID, Username or Password invalid, please try again");
    }
  }, [data]);

  const logout = useCallback(() => {
    setLogged(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ logged, users: data, username, register, remove, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  return context;
}
export { UserProvider, useUser };
