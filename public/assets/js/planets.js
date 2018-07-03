let planets = {
  mercury: {
    name: 'mercury',
    type: 'planet',
    mesh: null,
    radiusRatio: 4,
    segments: 50,
    images: ['./assets/images/mercury.jpg'],
    position: {
      x: -4,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  venus: {
    name: 'venus',
    type: 'planet',
    mesh: null,
    radiusRatio: 3,
    segments: 50,
    images: ['./assets/images/venus.jpg'],
    position: {
      x: -3,
      y: 0,
      z: -1
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  earth: {
    name: 'earth',
    type: 'planet',
    mesh: null,
    radiusRatio: 2,
    segments: 50,
    images: [
      './assets/images/earth.jpg',
      './assets/images/earth-bump.jpg',
      './assets/images/earth-water.png'
    ],
    position: {
      x: -2,
      y: 0,
      z: -2
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  earthClouds: {
    name: 'earth-clouds',
    type: 'clouds',
    mesh: null,
    radiusRatio: 2,
    segments: 50,
    images: [
      './assets/images/earth-clouds.png',
    ],
    position: {
      x: -2,
      y: 0,
      z: -2
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  mars: {
    name: 'mars',
    type: 'planet',
    mesh: null,
    radiusRatio: 3,
    segments: 50,
    images: [
      './assets/images/mars.jpg'
    ],
    position: {
      x: 0,
      y: 0,
      z: -2
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  jupiter: {
    name: 'jupiter',
    type: 'planet',
    mesh: null,
    radiusRatio: 1,
    segments: 50,
    images: [
      './assets/images/jupiter.jpg'
    ],
    position: {
      x: 2,
      y: 0,
      z: -4
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  saturn: {
    name: 'saturn',
    type: 'planet',
    mesh: null,
    radiusRatio: 1.5,
    segments: 50,
    images: [
      './assets/images/saturn.jpg'
    ],
    position: {
      x: 4,
      y: 0,
      z: -5
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  saturnRing: {
    name: 'saturn-ring',
    type: 'rings',
    mesh: null,
    radiusRatio: 1.5,
    segments: 2,
    images: [
      './assets/images/saturn-ring.png'
    ],
    position: {
      x: 4,
      y: 0,
      z: -5
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  uranus: {
    name: 'uranus',
    type: 'planet',
    mesh: null,
    radiusRatio: 2,
    segments: 50,
    images: [
      './assets/images/uranus.jpg'
    ],
    position: {
      x: 5,
      y: 0,
      z: -6
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  neptune: {
    name: 'neptune',
    type: 'planet',
    mesh: null,
    radiusRatio: 2.5,
    segments: 50,
    images: [
      './assets/images/neptune.jpg'
    ],
    position: {
      x: 6,
      y: 0,
      z: -7
    },
    rotation: {
      x: 0.001,
      y: 0.001
    },
    moveRatio: {
      x: -1,
      y: 1,
      z: 2
    },
    zoomTarget: 3
  },
  stars: {
    name: 'stars',
    type: 'stars',
    mesh: null,
    radiusRatio: 1,
    segments: 64,
    images: [
      './assets/images/stars.png'
    ],
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0
    },
    moveRatio: {
      x: 0,
      y: 0,
      z: 0
    },
    zoomTarget: 1
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

let createPlanet = (type, propOne, propTwo, images) => {
  switch (type) {
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
        new THREE.SphereGeometry(90, 64, 64),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(images[0]),
          side: THREE.BackSide
        })
      )
  }
}

let addPlanet = (mesh, object) => {
  mesh.rotation.x += object.rotation.x
  mesh.position.set(object.position.x, object.position.y, object.position.z)
  object.mesh = mesh
  scene.add(mesh)
}

// let scale = ratio => {
//   window.innerWidth > window.innerHeight
//     ? window.innerHeight / ratio
//     : window.innerWidth / ratio
// }
let focusRadius = window.innerWidth > window.innerHeight
  ? window.innerHeight / 400
  : window.innerWidth / 400

Object.keys(planets).forEach(item => {
  let itemMesh = createPlanet(
    planets[item].type,
    focusRadius / planets[item].radiusRatio,
    planets[item].segments,
    planets[item].images
  )
  console.log(item)
  addPlanet(itemMesh, planets[item])
})

let movePlanet = (view, planetObject) => {
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
    case 'moon':
    case 'mars':
    case 'jupiter':
    case 'saturn':
    case 'uranus':
    case 'neptune':
      // x = planetObject.position.x
      // y = planetObject.position.y
      // z = planetObject.position.z
      x = 2
      y = 2
      z = 2
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


// Render
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let render = function () {
  requestAnimationFrame(render)

  Object.keys(planets).forEach(item => {
    planets[item].mesh.rotation.x += planets[item].rotation.x
    planets[item].mesh.rotation.y += planets[item].rotation.y
  })

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
  Object.keys(planets).forEach(item => movePlanet(view, planets[item]))

  // moveMoon(view)
  // moveEarth(view)
  // moveZoom(view)
  // moveMars(view)
  // moveJupiter(view)
  // moveSaturn(view)
  // moveUranus(view)
  // moveNeptune(view)
})

function animate () {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()
