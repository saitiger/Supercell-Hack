"use client";

import { useState } from "react";
import { useReactor } from "@reactor-team/js-sdk";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConnectionPanelProps {
  onLocalModeChange: (isLocal: boolean) => void;
  className?: string;
}

export function ConnectionPanel({
  onLocalModeChange,
  className,
}: ConnectionPanelProps) {
  const { status, connect, disconnect } = useReactor((state) => ({
    status: state.status,
    connect: state.connect,
    disconnect: state.disconnect,
  }));

  const [isLocalMode, setIsLocalMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConnecting = status === "connecting" || status === "waiting";
  const isConnected = status === "ready";

  const handleConnect = async () => {
    setError(null);
    if (isLocalMode) {
      onLocalModeChange(true);
      connect();
      return;
    }
    setIsFetching(true);
    try {
      const res = await fetch("/api/reactor-token");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to get token");
      }
      const token = data.jwt as string;
      onLocalModeChange(false);
      // Call connect(token) without updating the provider's jwtToken prop.
      // Updating jwtToken would make ReactorProvider replace the store and run
      // cleanup disconnect() on this store mid-connect, causing
      // "No active session. Call createSession() first."
      connect(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get token");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLocalChange = (local: boolean) => {
    setIsLocalMode(local);
    onLocalModeChange(local);
    setError(null);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-card rounded-lg border border-border", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
        {/* Local model checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isLocalMode}
            onChange={(e) => handleLocalChange(e.target.checked)}
            disabled={isConnected}
            className="rounded border-border"
          />
          <span className="text-sm text-foreground">Local model</span>
        </label>

        {/* Status / error */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              status === "disconnected" && "bg-muted-foreground",
              status === "connecting" && "bg-yellow-500 animate-pulse",
              status === "waiting" && "bg-yellow-500 animate-pulse",
              status === "ready" && "bg-green-500"
            )}
          />
          <span className="text-xs text-muted-foreground capitalize hidden sm:inline">
            {status === "ready" ? "Connected" : status}
          </span>
          {error && (
            <span className="text-xs text-destructive" title={error}>
              {error}
            </span>
          )}
        </div>
      </div>

      {/* Connect / Disconnect button */}
      {status === "disconnected" ? (
        <Button
          size="default"
          variant="default"
          onClick={handleConnect}
          disabled={isFetching}
          className="min-w-[100px]"
        >
          {isFetching ? "Connecting…" : "Connect"}
        </Button>
      ) : (
        <Button
          size="default"
          variant="secondary"
          onClick={() => disconnect()}
          className="min-w-[100px]"
        >
          {isConnecting ? "Cancel" : "Disconnect"}
        </Button>
      )}
    </div>
  );
}
