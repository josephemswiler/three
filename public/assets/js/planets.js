// Set scene, camera, renderer
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
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
let focusRadius =  window.innerWidth > window.innerHeight ? window.innerHeight / 400 : window.innerWidth / 400 
let planetEarth = createPlanet( focusRadius, 50, [
  './assets/images/earth.jpg', 
  './assets/images/earth-bump.jpg', 
  './assets/images/earth-water.png'
  ]
)
scene.add(planetEarth)

let clouds = createClouds( focusRadius, 50 )
scene.add(clouds)

let stars = createStars(90, 64)
scene.add(stars)

let moon = createPlanet( .5, 50, [
  './assets/images/moon.jpg', 
  ]
)
moon.position.set(2,2,2)
scene.add(moon)

//Render
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let render = function () {
    requestAnimationFrame(render)

    planetEarth.rotation.y += 0.0007
    planetEarth.rotation.x += 0.0001
    clouds.rotation.y += 0.0007
    clouds.rotation.x += 0.0001
    moon.rotation.y -= 0.001
    // moon.rotation.x -= 0.001

    renderer.render(scene, camera)
}

render()

//Move position
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

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

// document.querySelector('.next-btn').onclick = () => {
  
//   let zoom = {
//     value: camera.position.z
//   }
//   let zoomEnd = {
//     value: 8
//   }
//   let zoomTwo = {
//     value: camera.position.x,
//   }
//   let zoomEndTwo = {
//     value: 3
//   }
//   let tween = new TWEEN.Tween(zoom).to(zoomEnd, 1000)
//   let tweenTwo = new TWEEN.Tween(zoomTwo).to(zoomEndTwo, 1000)
  
//   tween.onUpdate(function() {
//     camera.position.z = zoom.value
//   })

//   tweenTwo.onUpdate(function() {
//     camera.position.x = zoomTwo.value
//   })

//   tween.easing(TWEEN.Easing.Quartic.InOut)

//   tweenTwo.easing(TWEEN.Easing.Exponential.Out)

//   tween.chain( tweenTwo )

//   tween.start()
// }

document.querySelector('.next-btn').onclick = () => {

  let moonOrigin = {
    x: moon.position.x,
    y: moon.position.y,
    z: moon.position.z
  }

  let moonTarget = {
      x: window.innerWidth > window.innerHeight ? window.innerHeight / -1200 : window.innerWidth / -1200,
      y: 0,
      z: 0
  }

  let earthOrigin = {
    x: planetEarth.position.x,
    y: planetEarth.position.y,
    z: planetEarth.position.z
  }

  let earthTarget = {
      x: -5,
      y: -5,
      z: 5
  }

  let cloudsOrigin = {
    x: clouds.position.x,
    y: clouds.position.y,
    z: clouds.position.z
  }

  let cloudsTarget = {
      x: -5,
      y: -5,
      z: 5
  }

  let zoom = {
    value: camera.position.z
  }

  let zoomEnd = {
    value: 3
  }

  let tweenMoon = new TWEEN.Tween(moonOrigin).to(moonTarget, 1000)
  let tweenEarth = new TWEEN.Tween(earthOrigin).to(earthTarget, 1000)
  let tweenClouds = new TWEEN.Tween(cloudsOrigin).to(cloudsTarget, 1000)
  let tween = new TWEEN.Tween(zoom).to(zoomEnd, 1000)
  
  tweenEarth.onUpdate(function() {
    planetEarth.position.x = earthOrigin.x
    planetEarth.position.y = earthOrigin.y
    planetEarth.position.z = earthOrigin.z
  })

  tweenMoon.onUpdate(function() {
    moon.position.x = moonOrigin.x
    moon.position.y = moonOrigin.y
    moon.position.z = moonOrigin.z
  })

  tweenClouds.onUpdate(function() {
    clouds.position.x = cloudsOrigin.x
    clouds.position.y = cloudsOrigin.y
    clouds.position.z = cloudsOrigin.z
  })

  tween.onUpdate(() => {
    camera.position.z = zoom.value
  })

  tweenMoon.easing(TWEEN.Easing.Exponential.Out)
  tweenEarth.easing(TWEEN.Easing.Exponential.Out)
  tweenClouds.easing(TWEEN.Easing.Exponential.Out)  
  tween.easing(TWEEN.Easing.Exponential.Out)

  tweenMoon.start()
  tweenEarth.start()
  tweenClouds.start()
  tween.start()

  // let moonInfoOrigin = {
  //   value: moon.position.x,
  // }

  // let moonInfoTarget = {
  //   value: -0.5
  // }

  // let tweenAfter = new TWEEN.Tween(moonInfoOrigin).to(moonInfoTarget, 1000)

  // tweenAfter.onUpdate(() => {
  //   moon.position.x = moonInfoOrigin.value
  // })

  // tweenAfter.easing(TWEEN.Easing.Exponential.Out)

  // tween.chain( tweenAfter )

  // tweenAfter.start()

}

document.querySelector('.back-btn').onclick = () => {

  let moonOrigin = {
    x: moon.position.x,
    y: moon.position.y,
    z: moon.position.z
  }

  let moonTarget = {
      x: 2,
      y: 2,
      z: 2
  }

  let earthOrigin = {
    x: planetEarth.position.x,
    y: planetEarth.position.y,
    z: planetEarth.position.z
  }

  let earthTarget = {
      x: 0,
      y: 0,
      z: 0
  }

  let cloudsOrigin = {
    x: clouds.position.x,
    y: clouds.position.y,
    z: clouds.position.z
  }

  let cloudsTarget = {
      x: 0,
      y: 0,
      z: 0
  }

  let zoom = {
    value: camera.position.z
  }

  let zoomEnd = {
    value: 10
  }

  let tweenMoon = new TWEEN.Tween(moonOrigin).to(moonTarget, 1000)
  let tweenEarth = new TWEEN.Tween(earthOrigin).to(earthTarget, 1000)
  let tweenClouds = new TWEEN.Tween(cloudsOrigin).to(cloudsTarget, 1000)
  let tween = new TWEEN.Tween(zoom).to(zoomEnd, 1000)
  
  tweenEarth.onUpdate(function() {
    planetEarth.position.x = earthOrigin.x
    planetEarth.position.y = earthOrigin.y
    planetEarth.position.z = earthOrigin.z
  })

  tweenMoon.onUpdate(function() {
    moon.position.x = moonOrigin.x
    moon.position.y = moonOrigin.y
    moon.position.z = moonOrigin.z
  })

  tweenClouds.onUpdate(function() {
    clouds.position.x = cloudsOrigin.x
    clouds.position.y = cloudsOrigin.y
    clouds.position.z = cloudsOrigin.z
  })

  tween.onUpdate(() => {
    camera.position.z = zoom.value
  })

  tweenMoon.easing(TWEEN.Easing.Exponential.Out)
  tweenEarth.easing(TWEEN.Easing.Exponential.Out)
  tweenClouds.easing(TWEEN.Easing.Exponential.Out)  
  tween.easing(TWEEN.Easing.Exponential.Out)

  tweenMoon.start()
  tweenEarth.start()
  tweenClouds.start()
  tween.start()
}



function animate() {
  camera.updateProjectionMatrix()
  requestAnimationFrame(animate)
  TWEEN.update()
}

animate()