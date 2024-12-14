"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { LoginData, RegisterData } from "@/types/auth";
import { User } from "@/types/users";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

const getProfile = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  console.log({ data });
  if (error) throw error;
  return data;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    console.log("we are here");
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      if (initialSession?.user) {
        getProfile(initialSession.user.id)
          .then(setUser)
          .catch((error) => {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load user profile");
          });
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      console.log({ session });
      if (session?.user) {
        try {
          const profile = await getProfile(session.user.id);
          setUser(profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load user profile");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    isLoading,
  };

  const login = async ({ email, password }: LoginData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const register = async ({
    email,
    password,
    first_name,
    last_name,
  }: RegisterData) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...value,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
