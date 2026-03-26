import React, { memo } from "react";

const MonitorLight = memo(() => {
  return (
    <rectAreaLight
      position={[0, .09, -.30]}
      rotation={[-Math.PI, 0, 0]}
      width={.2}
      height={.2}
      intensity={120}
      color={'green'}
    />
  );
});

export default MonitorLight;
