import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {Loader} from "@/shared/ui/loader";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense
        fallback={<Loader centered/>}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );