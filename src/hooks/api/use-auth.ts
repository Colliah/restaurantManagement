import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/auth";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, clearUser } = useAuthStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getProfile,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["user"], data.user);
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authService.register(credentials),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
