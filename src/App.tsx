import RouteController from "./routes/routeController.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {

  return (
      <>
        <RouteController/>
        <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
      </>
  )
}

export default App
