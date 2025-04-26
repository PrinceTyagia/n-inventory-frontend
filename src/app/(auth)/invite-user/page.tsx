import { InviteFormMain } from './InviteUserForm';
import { Suspense } from "react";



export default function Page() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <InviteFormMain />
      </Suspense>
    </div>
  );
}

