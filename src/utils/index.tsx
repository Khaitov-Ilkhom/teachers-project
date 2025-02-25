import {Flex, Spin} from "antd";
import {JSX, Suspense} from "react";

const Loading = () => {
  return (
      <div className="w-full h-screen flex justify-center items-center">
        <Flex align="center" gap="middle">
          <Spin size="large"/>
        </Flex>
      </div>
  )
}

const SuspenseElement = ({children}: { children: JSX.Element }) => {
  return (
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
  )
}

export {Loading, SuspenseElement}