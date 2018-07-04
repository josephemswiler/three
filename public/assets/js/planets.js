// Animate CSS
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = (function (el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd'
      }

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t]
        }
      }
    })(document.createElement('div'))

    this.addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName)

      if (typeof callback === 'function') callback()
    })

    return this
  }
})

// Set scene, camera, renderer
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 80

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Onload zoom
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
window.onload = () => {
  setTimeout(() => {
    let zoom = {
      value: camera.position.z
    }
    let zoomEnd = {
      value: 15
    }
    let tween = new TWEEN.Tween(zoom).to(zoomEnd, 800)
    tween.onUpdate(() => {
      camera.position.z = zoom.value
    })

    tween.easing(TWEEN.Easing.Quartic.InOut)

    tween.start()
  }, 1000)
}

$(window).resize(function () {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  renderer.setSize(window.innerWidth, window.innerHeight)

  if ( $('.card-title').first().text() === '' ) {
    moveCamera(planets.earth)
  } else {
    moveCamera(planets[$('.card-title').first().text()])
  }
})

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

Object.keys(planets).forEach(item => {
  let itemMesh = createPlanet(
    planets[item].type,
    planets[item].radiusRatio,
    planets[item].segments,
    planets[item].images
  )
  addPlanet(itemMesh, planets[item])
})

let moveCamera = planetObject => {
  if ( $('.container-fluid').css('display') === 'none' ) {
    $('.card-wrapper').show().animateCss('fadeInRight')
    $('.card-title').text(planetObject.name)
    $('.visit-span').text(`Visit ${planetObject.name}`)
  }
  let origin = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }
  let target = {
    x: planetObject.mesh.position.x,
    y: planetObject.mesh.position.y,
    z: planetObject.mesh.position.z + 5
  }
  let tween = new TWEEN.Tween(origin).to(target, 1000)
  tween.onUpdate(() => {
    camera.position.x = origin.x
    camera.position.y = origin.y
    camera.position.z = origin.z
  })

  tween.easing(TWEEN.Easing.Quartic.InOut)

  tween.start()
}

// Click event listener
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let currentPlanet = planets.earth

$('.planet-btn').click(function () {
  moveCamera(planets[this.dataset.name])
})

$('.visit-btn').click(function () {
  $('.container-fluid').show().animateCss('fadeInRight')
  $('.container').animateCss('zoomOut', () => {
    $('.container').hide()
  })

  Object.keys(planets).forEach(item => {
    $('.card-title').first().text() === planets[item].name ||
    planets[item].name.split('-').includes($('.card-title').first().text()) ? 
    false :
    planets[item].mesh.visible = false
  })
})

// Render, animate
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

function animate () {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()
