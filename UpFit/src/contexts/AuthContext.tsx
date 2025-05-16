import { UserDTO } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthContextProviderProps){
  const [user, setUser] = useState(
    {
      id: "1",
      name: "Alberico Junior",
      email: "alberico@email.com",
      avatar: "https://github.com/albericojunior.png",
    }
  )

  return(
    <AuthContext.Provider value={{
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}