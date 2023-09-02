import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const { children } = props;
  return (
    <>
      <main className="bg-blue-100 w-full md:w-[75%] lg:w-[80%] xl:w-[85%] ml-auto h-full pb-20 mt-20">
        {children}
      </main>
    </>
  );
};

export default Container;
