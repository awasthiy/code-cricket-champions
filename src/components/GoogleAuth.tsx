
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GoogleAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth state change and initial user fetch
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch session & user on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        toast.error("Login failed: " + error.message);
        console.error("Google login error:", error);
      }
    } catch (err) {
      console.error("Unexpected error during Google login:", err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-500">Loading user...</div>;
  }

  if (!user) {
    return (
      <Button
        onClick={signInWithGoogle}
        variant="outline"
        className="flex gap-2 bg-white text-black hover:bg-gray-100"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />
        Log in with Google
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={user.user_metadata?.avatar_url ?? "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.email)}
        alt={user.email}
        className="h-8 w-8 rounded-full"
      />
      <span className="font-medium text-sm">{user.email}</span>
      <Button variant="outline" size="sm" onClick={signOut}>
        Log out
      </Button>
    </div>
  );
}
