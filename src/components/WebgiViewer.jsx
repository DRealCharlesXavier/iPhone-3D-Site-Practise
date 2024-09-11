import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
  mobileAndTabletCheck,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WebgiViewer() {
 const canvasRef = useRef(null);
 
 async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: canvasRef.current,
    })

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    // or use this to add all main ones at once.
    await addBasePlugins(viewer) 


    // Required for downloading files from the UI
    await viewer.addPlugin(FileTransferPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // Import and add a GLB file.
    await viewer.load("./assets/classic-watch.glb")

    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap("./assets/environment.hdr");

    // Add some UI for tweak and testing.
    const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

}

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
}

export default WebgiViewer;
