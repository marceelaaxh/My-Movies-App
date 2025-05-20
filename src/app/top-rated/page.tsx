import { Suspense } from "react";
import TopRatedClient from "./TopRatedClient";

export default function TopRatedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopRatedClient />
    </Suspense>
  );
}
