import React, { useRef, useState } from "react";
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const itemRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const rx = (e.clientX - left) / width;
    const ry = (e.clientY - top) / height;
    const tiltX = (ry - 0.5) * 10;
    const tiltY = (rx - 0.5) * 10;

    gsap.to(itemRef.current, {
      transform: `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.93,0.93,0.93)`,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handlePointerLeave = () => {
    if (!itemRef.current) return;
    gsap.to(itemRef.current, {
      transform: "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className={`${className} relative z-10 pointer-events-auto`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ willChange: "transform", transformStyle: "preserve-3d", touchAction: "none" }}>
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="pointer-events-none absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base mix-blend-soft-light">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">Dive into a cutting edge layer</p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta repellat
            dolor modi laudantium molestiae laborum, exercitationem labore eos suscipit consequatur
            nesciunt mollitia cum voluptas quam ratione explicabo optio rem.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Radia<b>n</b>t
              </>
            }
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta repellat"
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7 pointer-events-none">
          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={<>zigma</>}
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta repellat"
            />
          </BentoTilt>
          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta repellat"
            />
          </BentoTilt>
          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={<>azure</>}
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus soluta repellat"
            />
          </BentoTilt>
          <BentoTilt>
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-md ">
              <div className="flex size-full flex-col justify-between bg-violet-300 p-5 h-120 max-md:h-100">
                <h1 className="bento-title special-font max-w-64 text-black">more coming soon</h1>
                <TiLocationArrow className="m-5 scale-[5] self-end" />
              </div>
            </div>
          </BentoTilt>
          <BentoTilt>
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-md h-120 border-hsla max-md:h-100">
              <video
                src="videos/feature-5.mp4"
                loop
                muted
                autoPlay
                className="size-full object-cover object-center"
              />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
