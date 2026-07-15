import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fcfcfc" }}
    >
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sun size={28} className="text-amber-500" />
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Solara
            </span>
          </div>
          <CardTitle
            className="text-lg font-medium"
            style={{ color: "#525252" }}
          >
            Sign in to continue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            Sign in with Kimi
          </Button>
          <p
            className="text-center mt-4 text-sm"
            style={{ color: "#a3a3a3" }}
          >
            Admin access for managing contact submissions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
