import { Suspense } from "react";
import MyFavoritesClient from "./MyFavoriteClient";

export default function MyFavoritesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyFavoritesClient />
    </Suspense>
  );
}