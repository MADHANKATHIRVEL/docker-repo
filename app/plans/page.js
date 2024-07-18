import { Suspense, lazy } from "react";

const PlanDynamic = lazy(() => import("@/components/plans/Plan"), {
  ssr: false,
});

export default function page({ params, searchParams }) {
  return (
    <Suspense fallback={<center>...</center>}>
      <PlanDynamic searchParams={searchParams} />
    </Suspense>
  );
}
