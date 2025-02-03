"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";

// Defina o tipo dos dados do usuário
export type UserData = {
  email: string;
  role: "admin" | "cliente" | "prestador" | null;
  route: string;
};

// Tipo do contexto
type UserContextType = {
  user: UserData;
  setUser: (user: UserData) => void;
};

// Valor inicial do contexto
const defaultUserData: UserData = {
  email: "",
  role: null,
  route: "",
};

// Criando o contexto
const UserContext = createContext<UserContextType>({
  user: defaultUserData,
  setUser: () => {},
});

// Provider que envolve a aplicação
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUserData);

  // Ao montar o componente, tenta carregar os dados armazenados no localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao parsear os dados do usuário:", error);
        }
      }
    }
  }, []);

  // Atualiza quando os dados mudarem
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Memoiza para evitar re-renderizações desnecessárias
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para facilitar o consumo do contexto
export const useUserContext = () => useContext(UserContext);
