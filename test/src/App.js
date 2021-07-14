import React from 'react'
import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Sound,
} from '@babylonjs/core'
import SceneComponent from './components/SceneComponents' // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new ArcRotateCamera(
    'Camera',
    0,
    0,
    10,
    new Vector3(0, 0, 0),
    scene
  )

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox('box', { size: 2 }, scene)

  // Move the box upward 1/2 its height
  box.position.y = 1

  var music = new Sound(
    'Violons',
    'https://freesound.org/data/previews/560/560440_12295155-lq.mp3',
    scene,
    null,
    {
      loop: true,
      autoplay: true,
    }
  )

  // Sound will now follow the box mesh position
  music.attachToMesh(box)

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime()

    const rpm = 10
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  }
}

export default () => (
  <div className="style">
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="renderCanvas"
    />
  </div>
)
