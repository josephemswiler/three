// Set scene, camera, renderer
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 50

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Add directional and ambient light
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 3, 5)
scene.add(light)
scene.add(new THREE.AmbientLight(0x333333))

// Create planet, clouds, starts
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let createPlanet = (radius, segments, imgArr) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(
      radius,
      segments,
      segments,
      0,
      Math.PI * 2,
      0,
      Math.PI * 2
    ),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(imgArr[0]),
      bumpMap: new THREE.TextureLoader().load(imgArr[1]),
      bumpScale: 0.1,
      specularMap: new THREE.TextureLoader().load(imgArr[3]),
      specular: new THREE.Color('grey')
    })
  )
}

let createClouds = (radius, segments) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.003, segments, segments),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('./assets/images/earth-clouds.png'),
      transparent: true
    })
  )
}

let createStars = (radius, segments) => {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('./assets/images/stars.png'),
      side: THREE.BackSide
    })
  )
}

// Add planet, clouds, stars to DOM
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let focusRadius = window.innerWidth > window.innerHeight
  ? window.innerHeight / 400
  : window.innerWidth / 400

  console.log(focusRadius)

let planetEarth = createPlanet(focusRadius, 50, [
  './assets/images/earth.jpg',
  './assets/images/earth-bump.jpg',
  './assets/images/earth-water.png'
])
scene.add(planetEarth)

let clouds = createClouds(focusRadius, 50)
scene.add(clouds)

let stars = createStars(90, 64)
scene.add(stars)

let moon = createPlanet(focusRadius / 5, 50, ['./assets/images/moon.jpg'])
moon.position.set(2, 2, 2)
scene.add(moon)

let mars = createPlanet(focusRadius / 3, 50, ['./assets/images/mars.jpg'])
mars.position.set(-3, 10, -20)
scene.add(mars)

let jupiter = createPlanet(focusRadius / 1.15, 50, ['./assets/images/jupiter.jpg'])
jupiter.position.set(-3, 14, -35)
scene.add(jupiter)

// Render
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let render = function () {
  requestAnimationFrame(render)

  planetEarth.rotation.y += 0.0007
  planetEarth.rotation.x += 0.0001
  clouds.rotation.y += 0.0007
  clouds.rotation.x += 0.0001
  moon.rotation.y -= 0.001
  mars.rotation.y += 0.001
  jupiter.rotation.y -= 0.01

  renderer.render(scene, camera)
}

render()

// Move position
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

window.onload = () => {
  setTimeout(() => {
    let zoom = {
      value: camera.position.z
    }
    let zoomEnd = {
      value: 10
    }
    let tween = new TWEEN.Tween(zoom).to(zoomEnd, 800)
    tween.onUpdate(() => {
      camera.position.z = zoom.value
    })

    tween.easing(TWEEN.Easing.Quartic.InOut)

    tween.start()
  }, 1000)
}

$('.planet-btn').click(function () {

  let view = this.dataset.name
  moveMoon(view)
  moveEarth(view)
  moveZoom(view)
  moveMars(view)
  moveJupiter(view)
})

let moveZoom = view => {
  let zoom = {
    value: camera.position.z
  }

  let zoomEnd = {
    value: 10
  }

  switch (view) {
    case 'earth':
      break
    case 'moon':
    case 'mars':
    case 'jupiter':
        zoomEnd.value = 3
      break
  }

  let tween = new TWEEN.Tween(zoom).to(zoomEnd, 1000)

  tween.onUpdate(() => {
    camera.position.z = zoom.value
  })
  tween.easing(TWEEN.Easing.Exponential.Out)
  tween.start()
}

let moveEarth = view => {
  let earthOrigin = {
    x: planetEarth.position.x,
    y: planetEarth.position.y,
    z: planetEarth.position.z
  }

  let cloudsOrigin = {
    x: clouds.position.x,
    y: clouds.position.y,
    z: clouds.position.z
  }

  let x = 0
  let y = 0
  let z = 0

  switch (view) {
    case 'earth':
      break
    case 'moon':
    case 'mars':
    case 'jupiter':
      x = -5
      y = -5
      z = 5
    break
  }

  let earthTarget = {
    x: x,
    y: y,
    z: z
  }
  let cloudsTarget = {
    x: x,
    y: y,
    z: z
  }

  let tweenEarth = new TWEEN.Tween(earthOrigin).to(earthTarget, 1000)

  tweenEarth.onUpdate(function () {
    planetEarth.position.x = earthOrigin.x
    planetEarth.position.y = earthOrigin.y
    planetEarth.position.z = earthOrigin.z
  })
  tweenEarth.easing(TWEEN.Easing.Exponential.Out)
  tweenEarth.start()

  let tweenClouds = new TWEEN.Tween(cloudsOrigin).to(cloudsTarget, 1000)

  tweenClouds.onUpdate(function () {
    clouds.position.x = cloudsOrigin.x
    clouds.position.y = cloudsOrigin.y
    clouds.position.z = cloudsOrigin.z
  })
  tweenClouds.easing(TWEEN.Easing.Exponential.Out)
  tweenClouds.start()
}

let moveMoon = view => {
  let moonOrigin = {
    x: moon.position.x,
    y: moon.position.y,
    z: moon.position.z
  }
  let x = 2
  let y = 2
  let z = 2

  switch (view) {
    case 'earth':
      break
    case 'moon':
        x = focusRadius / -4
        y = 0
        z = 0
      break
    case 'mars':
    case 'jupiter':
      x = focusRadius / -4
      y = -5
      z = 5
    break
  }

  let moonTarget = {
    x: x,
    y: y,
    z: z
  }

  let tweenMoon = new TWEEN.Tween(moonOrigin).to(moonTarget, 1000)

  tweenMoon.onUpdate(() => {
    moon.position.x = moonOrigin.x
    moon.position.y = moonOrigin.y
    moon.position.z = moonOrigin.z
  })

  tweenMoon.easing(TWEEN.Easing.Exponential.Out)
  tweenMoon.start()
}

let moveMars = view => {
  let marsOrigin = {
    x: mars.position.x,
    y: mars.position.y,
    z: mars.position.z
  }

  let x = -3
  let y = 10
  let z = -20

  switch (view) {
    case 'earth':
      break
    case 'moon':
        x = -2
        y = 5
        z = -10
      break
    case 'mars':
      x = focusRadius / -3
      y = 0
      z = 0
    break
    case 'jupiter':
      x = -4
      y = -1
      z = 5
    break
  }

  let marsTarget = {
    x: x,
    y: y,
    z: z
  }

  let tweenMars = new TWEEN.Tween(marsOrigin).to(marsTarget, 1000)

  tweenMars.onUpdate(function () {
    mars.position.x = marsOrigin.x
    mars.position.y = marsOrigin.y
    mars.position.z = marsOrigin.z
  })
  tweenMars.easing(TWEEN.Easing.Exponential.Out)
  tweenMars.start()
}

let moveJupiter = view => {
  let jupiterOrigin = {
    x: jupiter.position.x,
    y: jupiter.position.y,
    z: jupiter.position.z
  }

  let x = -3
  let y = 14
  let z = -35

  switch (view) {
    case 'earth':
      break
    case 'moon':
        x = -2
        y = 10
        z = -30
      break
    case 'mars':
      x = -2
      y = 6
      z = -25
    break
    case 'jupiter':
      x = focusRadius / -1.15
      y = 0
      z = -2
    break
  }

  let jupiterTarget = {
    x: x,
    y: y,
    z: z
  }

  let tweenJupiter = new TWEEN.Tween(jupiterOrigin).to(jupiterTarget, 1000)

  tweenJupiter.onUpdate(function () {
    jupiter.position.x = jupiterOrigin.x
    jupiter.position.y = jupiterOrigin.y
    jupiter.position.z = jupiterOrigin.z
  })
  tweenJupiter.easing(TWEEN.Easing.Exponential.Out)
  tweenJupiter.start()
}

function animate () {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()