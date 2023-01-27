<View style={{width: WIDTH, alignItems: 'center'}}>
  <Canvas
    style={{
      width: WIDTH * 0.95,
      height: HEIGHT * 0.085,
    }}>
    {/* <Fill color="#606060" /> */}
    <RoundedRect
      x={10}
      y={5}
      width={WIDTH * 0.9}
      height={HEIGHT * 0.07}
      r={14}
      color="#606060">
      <Shadow dx={12} dy={12} blur={25} color="#000" />
      <Shadow dx={-12} dy={-12} blur={25} color="#ccc" />
    </RoundedRect>
  </Canvas>
</View>;
