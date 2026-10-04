import { trpc } from "@/providers/trpc";

export function useAuth() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery(undefined, {
    staleTime: 60_000,
    retry: false,
  });

  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      utils.course.progress.invalidate();
    },
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      utils.course.progress.invalidate();
      utils.course.entry.invalidate();
    },
  });

  return {
    user: me.data?.user ?? null,
    loading: me.isLoading,
    login,
    logout,
  };
}
