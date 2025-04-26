// src/app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
