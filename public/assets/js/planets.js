let planets = {
  mercury: {
      name: 'mercury',
      type: 'planet',
      mesh: null,
      radiusRatio: 2,
      segments: 50,
      images: [
          './assets/images/mercury.jpg'
      ],
      position: {
         x: -2, 
         y: -2, 
         z: -1
      },
      rotation: {
          x: 0.001,
          y: 0.001
      },
      // origin: {
      //     x: mercury.position.x,
      //     y: mercury.position.y,
      //     z: mercury.position.z
      // },
      moveRatio: {
          x: -1, 
          y: 1, 
          z: 2
      },
      zoomTarget: 3,
  }
}

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
// let createPlanet = (radius, segments, imgArr) => {
//   return new THREE.Mesh(
//     new THREE.SphereGeometry(
//       radius,
//       segments,
//       segments,
//       0,
//       Math.PI * 2,
//       0,
//       Math.PI * 2
//     ),
//     new THREE.MeshPhongMaterial({
//       map: new THREE.TextureLoader().load(imgArr[0]),
//       bumpMap: new THREE.TextureLoader().load(imgArr[1]),
//       bumpScale: 0.1,
//       specularMap: new THREE.TextureLoader().load(imgArr[3]),
//       specular: new THREE.Color('grey')
//     })
//   )
// }

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

let createRings = (inner, outer) => {
  return new THREE.Mesh(
    new THREE.RingGeometry(inner + 0.8, outer, 32),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('./assets/images/saturn-ring.png'),
      side: THREE.DoubleSide
    })
  )
}

let createPlanet = (type, propOne, propTwo, images) => {
  switch ( type ) {
    case 'planet':
      return new THREE.Mesh(
        new THREE.SphereGeometry(
          propOne,
          propTwo,
          propTwo,
          0,
          Math.PI * 2,
          0,
          Math.PI * 2
        ),
        new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load(images[0]),
          bumpMap: new THREE.TextureLoader().load(images[1]),
          bumpScale: 0.1,
          specularMap: new THREE.TextureLoader().load(images[3]),
          specular: new THREE.Color('grey')
        })
      )
    case 'clouds':
      return new THREE.Mesh(
        new THREE.SphereGeometry(propOne + 0.003, propTwo, propTwo),
        new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load(images[0]),
          transparent: true
        })
      )
    case 'rings':
      return new THREE.Mesh(
        new THREE.RingGeometry(propOne + 0.8, propTwo, 32),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(images[0]),
          side: THREE.DoubleSide
        })
      )
    case 'stars':
      return new THREE.Mesh(
        new THREE.SphereGeometry(propOne, propTwo, propTwo),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(images[0]),
          side: THREE.BackSide
        })
      )
  }
}

// let scale = ratio => {
//   window.innerWidth > window.innerHeight
//     ? window.innerHeight / ratio
//     : window.innerWidth / ratio
// }
let focusRadius = window.innerWidth > window.innerHeight
  ? window.innerHeight / 400
  : window.innerWidth / 400

//create mesh from planet object
let mercuryMesh = createPlanet(planets.mercury.type, focusRadius / planets.mercury.radiusRatio, 50, planets.mercury.images)
mercuryMesh.rotation.x += planets.mercury.rotation.x
//add mesh to planet object
planets.mercury.mesh = mercuryMesh
//add mesh to scene
scene.add(mercuryMesh)


let movePlanet = ( view, planetObject ) => {
  console.log(planetObject)
  let origin = {
    x: planetObject.mesh.position.x,
    y: planetObject.mesh.position.y,
    z: planetObject.mesh.position.z
  }

  let x = planetObject.position.x
  let y = planetObject.position.y
  let z = planetObject.position.z

  switch (view) {
    case 'earth':
      break
    case 'moon':
    case 'mars':
    case 'jupiter':
    case 'saturn':
    case 'uranus':
    case 'neptune':
      x = planetObject.position.x
      y = planetObject.position.y
      z = planetObject.position.z
      break
  }

  let target = {
    x: x,
    y: y,
    z: z
  }

  let tween = new TWEEN.Tween(origin).to(target, 1000)

  tween.onUpdate(function () {
    planetObject.mesh.position.x = origin.x
    planetObject.mesh.position.y = origin.y
    planetObject.mesh.position.z = origin.z
  })
  tween.easing(TWEEN.Easing.Exponential.Out)
  tween.start()
}

movePlanet('earth', planets.mercury)

// Add planet, clouds, stars to DOM
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//


// let planetEarth = createPlanet(focusRadius, 50, [
//   './assets/images/earth.jpg',
//   './assets/images/earth-bump.jpg',
//   './assets/images/earth-water.png'
// ])
// scene.add(planetEarth)

// let clouds = createClouds(focusRadius, 50)
// scene.add(clouds)

// let stars = createStars(90, 64)
// scene.add(stars)

// let moon = createPlanet(focusRadius / 5, 50, ['./assets/images/moon.jpg'])
// moon.position.set(2, 2, 2)
// scene.add(moon)

// let mars = createPlanet(focusRadius / 3, 50, ['./assets/images/mars.jpg'])
// mars.position.set(-3, 10, -20)
// scene.add(mars)

// let jupiter = createPlanet(focusRadius / 1.15, 50, [
//   './assets/images/jupiter.jpg'
// ])
// jupiter.position.set(-2, 14, -35)
// scene.add(jupiter)

// let saturn = createPlanet(focusRadius / 2, 50, ['./assets/images/saturn.jpg'])
// saturn.position.set(-15, -10, -45)
// scene.add(saturn)

// let saturnRingOne = createRings(focusRadius / 3, 1.8)
// saturnRingOne.position.set(-15, -10, -45)
// saturnRingOne.rotation.x = 10
// scene.add(saturnRingOne)

// let saturnRingTwo = createRings(focusRadius / 5, 1.5)
// saturnRingTwo.position.set(-15, -10, -45)
// saturnRingTwo.rotation.x = 10
// scene.add(saturnRingTwo)

// let uranus = createPlanet(focusRadius / 3.5, 50, ['./assets/images/uranus.jpg'])
// uranus.position.set(-18, 20, -55)
// scene.add(uranus)

// let neptune = createPlanet(focusRadius / 4.5, 50, [
//   './assets/images/neptune.jpg'
// ])
// neptune.position.set(20, -10, -65)
// scene.add(neptune)

// Render
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let render = function () {
  requestAnimationFrame(render)

  Object.keys(planets).forEach( item => planets[item].mesh.rotation.x += planets[item].rotation.x)

  // planetEarth.rotation.y += 0.0007
  // planetEarth.rotation.x += 0.0001
  // clouds.rotation.y += 0.0007
  // clouds.rotation.x += 0.0001
  // moon.rotation.y -= 0.001
  // mars.rotation.y += 0.001
  // jupiter.rotation.y -= 0.01
  // saturn.rotation.y += 0.008
  // saturnRingOne.rotation.x -= 0.001
  // saturnRingOne.rotation.y -= 0.001
  // saturnRingTwo.rotation.x -= 0.001
  // saturnRingTwo.rotation.y -= 0.001
  // uranus.rotation.y -= 0.008
  // neptune.rotation.y += 0.001

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

// $('.planet-btn').click(function () {
//   let view = this.dataset.name
//   moveMoon(view)
//   moveEarth(view)
//   moveZoom(view)
//   moveMars(view)
//   moveJupiter(view)
//   moveSaturn(view)
//   moveUranus(view)
//   moveNeptune(view)
// })

// let moveZoom = view => {
//   let zoom = {
//     value: camera.position.z
//   }

//   let zoomEnd = {
//     value: 10
//   }

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//     case 'mars':
//     case 'jupiter':
//     case 'saturn':
//     case 'uranus':
//     case 'neptune':
//       zoomEnd.value = 3
//       break
//   }

//   let tween = new TWEEN.Tween(zoom).to(zoomEnd, 1000)

//   tween.onUpdate(() => {
//     camera.position.z = zoom.value
//   })
//   tween.easing(TWEEN.Easing.Exponential.Out)
//   tween.start()
// }

// let moveEarth = view => {
//   let earthOrigin = {
//     x: planetEarth.position.x,
//     y: planetEarth.position.y,
//     z: planetEarth.position.z
//   }

//   let cloudsOrigin = {
//     x: clouds.position.x,
//     y: clouds.position.y,
//     z: clouds.position.z
//   }

//   let x = 0
//   let y = 0
//   let z = 0

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//     case 'mars':
//     case 'jupiter':
//     case 'saturn':
//     case 'uranus':
//     case 'neptune':
//       x = -5
//       y = -5
//       z = 5
//       break
//   }

//   let earthTarget = {
//     x: x,
//     y: y,
//     z: z
//   }
//   let cloudsTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenEarth = new TWEEN.Tween(earthOrigin).to(earthTarget, 1000)

//   tweenEarth.onUpdate(function () {
//     planetEarth.position.x = earthOrigin.x
//     planetEarth.position.y = earthOrigin.y
//     planetEarth.position.z = earthOrigin.z
//   })
//   tweenEarth.easing(TWEEN.Easing.Exponential.Out)
//   tweenEarth.start()

//   let tweenClouds = new TWEEN.Tween(cloudsOrigin).to(cloudsTarget, 1000)

//   tweenClouds.onUpdate(function () {
//     clouds.position.x = cloudsOrigin.x
//     clouds.position.y = cloudsOrigin.y
//     clouds.position.z = cloudsOrigin.z
//   })
//   tweenClouds.easing(TWEEN.Easing.Exponential.Out)
//   tweenClouds.start()
// }

// let moveMoon = view => {
//   let moonOrigin = {
//     x: moon.position.x,
//     y: moon.position.y,
//     z: moon.position.z
//   }
//   let x = 2
//   let y = 2
//   let z = 2

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = focusRadius / -4
//       y = 0
//       z = 0
//       break
//     case 'mars':
//     case 'jupiter':
//     case 'saturn':
//     case 'uranus':
//     case 'neptune':
//       x = focusRadius / -4
//       y = -5
//       z = 5
//       break
//   }

//   let moonTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenMoon = new TWEEN.Tween(moonOrigin).to(moonTarget, 1000)

//   tweenMoon.onUpdate(() => {
//     moon.position.x = moonOrigin.x
//     moon.position.y = moonOrigin.y
//     moon.position.z = moonOrigin.z
//   })

//   tweenMoon.easing(TWEEN.Easing.Exponential.Out)
//   tweenMoon.start()
// }

// let moveMars = view => {
//   let marsOrigin = {
//     x: mars.position.x,
//     y: mars.position.y,
//     z: mars.position.z
//   }

//   let x = -2
//   let y = 10
//   let z = -20

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = -2
//       y = 5
//       z = -10
//       break
//     case 'mars':
//       x = focusRadius / -3
//       y = 0
//       z = 0
//       break
//     case 'jupiter':
//     case 'saturn':
//     case 'uranus':
//     case 'neptune':
//       x = -4
//       y = -1
//       z = 5
//       break
//   }

//   let marsTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenMars = new TWEEN.Tween(marsOrigin).to(marsTarget, 1000)

//   tweenMars.onUpdate(function () {
//     mars.position.x = marsOrigin.x
//     mars.position.y = marsOrigin.y
//     mars.position.z = marsOrigin.z
//   })
//   tweenMars.easing(TWEEN.Easing.Exponential.Out)
//   tweenMars.start()
// }

// let moveJupiter = view => {
//   let jupiterOrigin = {
//     x: jupiter.position.x,
//     y: jupiter.position.y,
//     z: jupiter.position.z
//   }

//   let x = -3
//   let y = 14
//   let z = -35

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = -2
//       y = 10
//       z = -30
//       break
//     case 'mars':
//       x = -2
//       y = 6
//       z = -25
//       break
//     case 'jupiter':
//       x = focusRadius / -1.15
//       y = 0
//       z = -2
//       break
//     case 'saturn':
//     case 'uranus':
//     case 'neptune':
//       x = 5
//       y = 2
//       z = 5
//       break
//   }

//   let jupiterTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenJupiter = new TWEEN.Tween(jupiterOrigin).to(jupiterTarget, 1000)

//   tweenJupiter.onUpdate(function () {
//     jupiter.position.x = jupiterOrigin.x
//     jupiter.position.y = jupiterOrigin.y
//     jupiter.position.z = jupiterOrigin.z
//   })
//   tweenJupiter.easing(TWEEN.Easing.Exponential.Out)
//   tweenJupiter.start()
// }

// let moveSaturn = view => {
//   let saturnOrigin = {
//     x: saturn.position.x,
//     y: saturn.position.y,
//     z: saturn.position.z
//   }

//   let saturnRingOneOrigin = {
//     x: saturnRingOne.position.x,
//     y: saturnRingOne.position.y,
//     z: saturnRingOne.position.z
//   }

//   let saturnRingTwoOrigin = {
//     x: saturnRingTwo.position.x,
//     y: saturnRingTwo.position.y,
//     z: saturnRingTwo.position.z
//   }

//   let x = -15
//   let y = -10
//   let z = -45

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = -10
//       y = -8
//       z = -35
//       break
//     case 'mars':
//       x = -8
//       y = -4
//       z = -25
//       break
//     case 'jupiter':
//       x = -6
//       y = -2
//       z = -15
//       break
//     case 'saturn':
//       x = focusRadius / -2
//       y = 0
//       z = -1
//       break
//     case 'uranus':
//     case 'neptune':
//       x = -5
//       y = 0
//       z = 5
//       break
//   }

//   let saturnTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let saturnRingOneTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let saturnRingTwoTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenSaturn = new TWEEN.Tween(saturnOrigin).to(saturnTarget, 1000)
//   let tweenSaturnRingOne = new TWEEN.Tween(saturnRingOneOrigin).to(
//     saturnRingOneTarget,
//     1000
//   )
//   let tweenSaturnRingTwo = new TWEEN.Tween(saturnRingTwoOrigin).to(
//     saturnRingTwoTarget,
//     1000
//   )

//   tweenSaturn.onUpdate(function () {
//     saturn.position.x = saturnOrigin.x
//     saturn.position.y = saturnOrigin.y
//     saturn.position.z = saturnOrigin.z
//   })
//   tweenSaturn.easing(TWEEN.Easing.Exponential.Out)
//   tweenSaturn.start()

//   tweenSaturnRingOne.onUpdate(function () {
//     saturnRingOne.position.x = saturnRingOneOrigin.x
//     saturnRingOne.position.y = saturnRingOneOrigin.y
//     saturnRingOne.position.z = saturnRingOneOrigin.z
//   })
//   tweenSaturnRingOne.easing(TWEEN.Easing.Exponential.Out)
//   tweenSaturnRingOne.start()

//   tweenSaturnRingTwo.onUpdate(function () {
//     saturnRingTwo.position.x = saturnRingTwoOrigin.x
//     saturnRingTwo.position.y = saturnRingTwoOrigin.y
//     saturnRingTwo.position.z = saturnRingTwoOrigin.z
//   })
//   tweenSaturnRingTwo.easing(TWEEN.Easing.Exponential.Out)
//   tweenSaturnRingTwo.start()
// }

// let moveUranus = view => {
//   let uranusOrigin = {
//     x: uranus.position.x,
//     y: uranus.position.y,
//     z: uranus.position.z
//   }

//   let x = -18
//   let y = 20
//   let z = -55

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = -16
//       y = 14
//       z = -35
//       break
//     case 'mars':
//       x = -14
//       y = 10
//       z = -25
//       break
//     case 'jupiter':
//       x = -9
//       y = 8
//       z = -15
//       break
//     case 'saturn':
//       x = -6
//       y = 4
//       z = -10
//       break
//     case 'uranus':
//       x = focusRadius / -2.5
//       y = 0
//       z = 0
//       break
//     case 'neptune':
//       x = -2
//       y = 5
//       z = 3
//       break
//   }

//   let uranusTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenUranus = new TWEEN.Tween(uranusOrigin).to(uranusTarget, 1000)

//   tweenUranus.onUpdate(function () {
//     uranus.position.x = uranusOrigin.x
//     uranus.position.y = uranusOrigin.y
//     uranus.position.z = uranusOrigin.z
//   })
//   tweenUranus.easing(TWEEN.Easing.Exponential.Out)
//   tweenUranus.start()
// }

// let moveNeptune = view => {
//   let neptuneOrigin = {
//     x: neptune.position.x,
//     y: neptune.position.y,
//     z: neptune.position.z
//   }

//   let x = 20
//   let y = -10
//   let z = -65

//   switch (view) {
//     case 'earth':
//       break
//     case 'moon':
//       x = 14
//       y = -7
//       z = -55
//       break
//     case 'mars':
//       x = 10
//       y = -5
//       z = -45
//       break
//     case 'jupiter':
//       x = 8
//       y = -4
//       z = -35
//       break
//     case 'saturn':
//       x = 6
//       y = -3
//       z = -25
//       break
//     case 'uranus':
//       x = 4
//       y = -2
//       z = -15
//       break
//     case 'neptune':
//       x = focusRadius / -4.5
//       y = 0
//       z = 0
//       break
//   }

//   let neptuneTarget = {
//     x: x,
//     y: y,
//     z: z
//   }

//   let tweenNeptune = new TWEEN.Tween(neptuneOrigin).to(neptuneTarget, 1000)

//   tweenNeptune.onUpdate(function () {
//     neptune.position.x = neptuneOrigin.x
//     neptune.position.y = neptuneOrigin.y
//     neptune.position.z = neptuneOrigin.z
//   })
//   tweenNeptune.easing(TWEEN.Easing.Exponential.Out)
//   tweenNeptune.start()
// }

function animate () {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()
