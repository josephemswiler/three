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
        new THREE.RingGeometry(propOne, propTwo, 32),
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
  mesh.rotation.y += object.rotation.y
  mesh.position.set(object.position.x, object.position.y, object.position.z)
  if (object.type === 'rings') mesh.rotation.set(1.5, 10, 0)
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
  addPlanet(itemMesh, planets[item])
})

let movePlanet = (view, planetObject) => {
  $('.card-wrapper').css('display', 'block')
  $('.card-title').text(view)
  if (
    planetObject.name === view ||
    planetObject.name.split('-').includes(view)
  ) {
    let origin = {
      x: planetObject.mesh.position.x,
      y: planetObject.mesh.position.y,
      z: planetObject.mesh.position.z
    }

    let x = planetObject.position.x
    let y = planetObject.position.y
    let z = planetObject.position.z

    switch (view) {
      case 'mercury':
      case 'venus':
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
        x = 0
        y = 0
        z = 8
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
  } else {
    {
      let origin = {
        x: planetObject.mesh.position.x,
        y: planetObject.mesh.position.y,
        z: planetObject.mesh.position.z
      }

      let x = planetObject.position.x
      let y = planetObject.position.y
      let z = planetObject.position.z

      switch (view) {
        case 'mercury':
        case 'venus':
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
          // x = 0
          // y = 0
          z = 0
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
  }
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
})

function animate () {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()
