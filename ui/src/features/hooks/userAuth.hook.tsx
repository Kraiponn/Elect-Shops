import { useState } from "react";
import { IAuthForm, IAuthState } from "@/features/types";

export const useAuth = () => {
  const [authState, setAuthState] = useState<IAuthState>({
    isLoading: false,
    isSuccess: false,
    data: undefined,
  });

  const login = async ({ email, password }: IAuthForm) => {
    //
  };

  return {
    isLoading: authState.isLoading,
    isSuccess: authState.isSuccess,
    data: authState?.data,
    login,
  };
};
