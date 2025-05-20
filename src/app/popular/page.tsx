import { Suspense } from "react";
import PopularClient from "./PopularClient";

export default function PopularPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PopularClient />
    </Suspense>
  );
}
