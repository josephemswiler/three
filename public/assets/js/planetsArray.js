let focusRadius = window.innerWidth > window.innerHeight
  ? window.innerHeight / 400
  : window.innerWidth / 400

let planets = [
    {
        name: 'mercury',
        type: 'planet',
        radius: focusRadius / 4,
        segments: 50,
        images: [
            './assets/images/mercury.jpg'
        ],
        position: {
           x: -2, 
           y: 2, 
           z: -2
        },
        rotation: {
            x: 0.0007,
            y: 0.0001
        },
        origin: {
            x: mercury.position.x,
            y: mercury.position.y,
            z: mercury.position.z
        },
        moveRatio: {
            x: -1, 
            y: 1, 
            z: 2
        },
        zoomTarget: 3,
    }
]