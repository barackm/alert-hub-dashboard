import { useAuthStore } from "@/hooks/use-auth";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type AuthContextType = {
  refreshUser: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = (props: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const { setUser: setStoreUser } = useAuthStore();

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setStoreUser(userData);
    } catch {
      toast.error("Error fetching user data");
    } finally {
      setLoading(false);
    }
  }, [setStoreUser]);

  const refreshUser = useCallback(async () => {
    await getUser();
  }, [getUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
        </div>
      </div>
    );

  return (
    <AuthContext.Provider value={{ refreshUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
