import { Suspense } from "react";
import NowPlayingClient from "./NowPlayingClient";

export default function NowPlayingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NowPlayingClient />
    </Suspense>
  );
}