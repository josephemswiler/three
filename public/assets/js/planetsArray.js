let planets = {
    mercury: {
      name: 'mercury',
      type: 'planet',
      mesh: null,
      radiusRatio: 14,
      segments: 50,
      images: ['./assets/images/mercury.jpg'],
      position: {
        x: -1,
        y: 0.5,
        z: 9
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    venus: {
      name: 'venus',
      type: 'planet',
      mesh: null,
      radiusRatio: 12,
      segments: 50,
      images: ['./assets/images/venus.jpg'],
      position: {
        x: 0.75,
        y: -0.5,
        z: 9
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    earth: {
      name: 'earth',
      type: 'planet',
      mesh: null,
      radiusRatio: 10,
      segments: 50,
      images: [
        './assets/images/earth.jpg',
        './assets/images/earth-bump.jpg',
        './assets/images/earth-water.png'
      ],
      position: {
        x: 0,
        y: 0,
        z: 8
      },
      rotation: {
        x: 0,
        y: 0.001
      }
    },
    earthClouds: {
      name: 'earth-clouds',
      type: 'clouds',
      mesh: null,
      radiusRatio: 10,
      segments: 50,
      images: [
        './assets/images/earth-clouds.png',
      ],
      position: {
        x: 0,
        y: 0,
        z: 8
      },
      rotation: {
        x: 0,
        y: 0.001
      }
    },
    moon: {
      name: 'moon',
      type: 'planet',
      mesh: null,
      radiusRatio: 16,
      segments: 50,
      images: [
        './assets/images/moon.jpg'
      ],
      position: {
        x: -0.5,
        y: 2.25,
        z: -2
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    mars: {
      name: 'mars',
      type: 'planet',
      mesh: null,
      radiusRatio: 11,
      segments: 50,
      images: [
        './assets/images/mars.jpg'
      ],
      position: {
        x: 0,
        y: 2,
        z: -2
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    jupiter: {
      name: 'jupiter',
      type: 'planet',
      mesh: null,
      radiusRatio: 6,
      segments: 50,
      images: [
        './assets/images/jupiter.jpg'
      ],
      position: {
        x: 0.5,
        y: 3,
        z: -4
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    saturn: {
      name: 'saturn',
      type: 'planet',
      mesh: null,
      radiusRatio: 8,
      segments: 50,
      images: [
        './assets/images/saturn.jpg'
      ],
      position: {
        x: 1,
        y: 2,
        z: -5
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    saturnRing: {
      name: 'saturn-ring',
      type: 'rings',
      mesh: null,
      radiusRatio: 6,
      segments: .6,
      images: [
        './assets/images/saturn-ring.png'
      ],
      position: {
        x: 1,
        y: 2,
        z: -5
      },
      rotation: {
        x: 0,
        y: 0
      }
    },
    uranus: {
      name: 'uranus',
      type: 'planet',
      mesh: null,
      radiusRatio: 10,
      segments: 50,
      images: [
        './assets/images/uranus.jpg'
      ],
      position: {
        x: 2.25,
        y: 3,
        z: -6
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
    },
    neptune: {
      name: 'neptune',
      type: 'planet',
      mesh: null,
      radiusRatio: 10,
      segments: 50,
      images: [
        './assets/images/neptune.jpg'
      ],
      position: {
        x: 2.5,
        y: 2,
        z: -6
      },
      rotation: {
        x: 0.001,
        y: 0.001
      }
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
      }
    }
  }