// Set scene, camera, renderer
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 10

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Add directional and ambient light
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5,3,5)
scene.add(light)
scene.add(new THREE.AmbientLight(0x333333))

//Create planet, clouds, starts
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let createPlanet = (radius, segments, imgArr) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments, 0, Math.PI * 2, 0, Math.PI * 2),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load( imgArr[0] ),
      bumpMap: new THREE.TextureLoader().load( imgArr[1] ),
      bumpScale:   0.1,
      specularMap: new THREE.TextureLoader().load( imgArr[3] ),
      specular: new THREE.Color('grey')								
    })
  )
}

let createClouds = (radius, segments) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.003, segments, segments),			
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load( './assets/images/earth-clouds.png' ),
      transparent: true
    })
  )
}

let createStars = (radius, segments) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments), 
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load( './assets/images/stars.png' ), 
      side: THREE.BackSide
    })
)}

//Add planet, clouds, stars to DOM
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let planetEarth = createPlanet( ( window.innerWidth > window.innerHeight ? window.innerHeight / 250 : window.innerWidth / 250 ), 50, [
  './assets/images/earth.jpg', 
  './assets/images/earth-bump.jpg', 
  './assets/images/earth-water.png'
  ]
)
scene.add(planetEarth)

let clouds = createClouds( ( window.innerWidth > window.innerHeight ? window.innerHeight / 250 : window.innerWidth / 250 ), 50 )
scene.add(clouds)

let stars = createStars(90, 64)
scene.add(stars)

//Render
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let render = function () {
    requestAnimationFrame(render)

    planetEarth.rotation.y += 0.0007
    planetEarth.rotation.x += 0.0001
    clouds.rotation.y += 0.0007
    clouds.rotation.x += 0.0001

    renderer.render(scene, camera)
}

render()

