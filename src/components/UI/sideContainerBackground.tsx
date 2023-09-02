import React from "react";
import Image from "next/image";

interface SideContainerBackgroundProps {
  bgImage: string;
}

const SideContainerBackground = (props: SideContainerBackgroundProps) => {
  const { bgImage } = props;
  return (
    <section className="bg-blue-100 h-screen w-full flex items-center justify-center">
      <Image src={bgImage} width={600} height={600} alt="Background" />
    </section>
  );
};

export default SideContainerBackground;
