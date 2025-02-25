import {useRoutes} from "react-router-dom";
import {SuspenseElement as Suspense} from "../utils/index.tsx";
import {lazy} from "react";

const Dashboard = lazy(() => import("./dashboard/dashboard.tsx"))
const CreateTeacher = lazy(() => import("./dashboard/create-teachers/createTeachers.tsx"))
const IdentificationTeacher = lazy(() => import("./dashboard/identification-teachers/identificationTeachers.tsx"))

const RouteController = () => {
  return useRoutes([

    {
      path: "",
      element: <Suspense><Dashboard/></Suspense>,
      children: [
        {
          path: "create-teacher",
          element: <Suspense><CreateTeacher/></Suspense>
        },
        {
          path: "identification-teacher",
          element: <Suspense><IdentificationTeacher/></Suspense>
        },
      ]
    }

  ])
}
export default RouteController
