import * as BABYLON from 'babylonjs'

// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas')
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true)
// CreateScene function that creates and return the scene
const createScene = function () {
  const scene = new BABYLON.Scene(engine)

  /**** Set camera and light *****/
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new BABYLON.Vector3(0, 0, 0)
  )
  camera.attachControl(canvas, true)
  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(1, 1, 0)
  )

  // Load the sound and play it automatically once ready
  const music = new BABYLON.Sound(
    'Genshin Theme',
    'https://freesound.org/data/previews/560/560440_12295155-lq.mp3',
    scene,
    null,
    {
      loop: true,
      autoplay: true,
    }
  )

  const box = BABYLON.MeshBuilder.CreateBox('box', {})
  box.position.y = 0.5
  music.attachToMesh(box)
  return scene
}
// call the createScene function
var scene = createScene()
console.log(scene.cameras[0]._position)
// run the render loop
engine.runRenderLoop(function () {
  scene.render()
})
// the canvas/window resize event handler
window.addEventListener('resize', function () {
  engine.resize()
})
