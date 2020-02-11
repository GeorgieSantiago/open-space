import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';

export default class SpaceExplorer extends React.Component {

  constructor(props) {
      super(props)
      this.planets = []

      this.state = {
          planetPhysics: {},
          initialRender: true,
          orbitValue: 200
      }
  }

  componentDidMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor("#000")
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.clock = new THREE.Clock();
    this.camera.position.z = 250;
    /**
     * Create Geometric Figures
     */
    this.createStar()
    this.createPlanets()
    this.scene.add(new THREE.AmbientLight(0x404040));

    this.light = this.createPointLight(1.5, this.star.color)
    this.scene.add(this.light)

    const ambientLight = new THREE.AmbientLight(0xaaaaaa)
    this.scene.add(ambientLight)     
   };

  createStar() {
    const { star } = this.props
    const geometry = new THREE.SphereGeometry(10);

    const material = new THREE.MeshPhongMaterial({
      color: this.getColor(star.color),
    });
    
    material.receiveShadow = true
    material.castShadow = true

    const starObj = new THREE.Mesh(geometry, material);
    this.star = starObj
    this.star.position.set(0,0,0)

    this.scene.add(this.star);

    //Create the corona of the sun TODO 
  }

  createPlanets = () => {
    const { planets } = this.props
    planets.map((planet, i) => {
        /**
         * For physics sake
         */
        /**
         * orbitRate
         * rotationRate
         * distanceFromAxis
         * name
         * texture
         * size
         * segment
         */
        const physics = {
            orbitRate: 1,
            rotationRate: 1,
            distanceFromAxis: (i + 1) * 10,
            name: planet.name,
            size: Math.PI * (planet.radius * planet.radius)
        }
        //Create object shape
        const geometry = new THREE.SphereGeometry(10);
        //Create object material
        const material = new THREE.MeshPhongMaterial({
          color: "#006994",
        });

        material.receiveShadow = true
        material.castShadow = true
        //Create the object as a mesh
        const planetObj = new THREE.Mesh(geometry, material);
        //Set position
        planetObj.position.set(physics.distanceFromAxis + 10, 0, 0)
        planetObj.name = planet.name
        //add planet to context list
        this.planets.push(planetObj)
        //store physics config
        this.setState(prevState => ({
            planetPhysics: {...prevState.planetPhysics, physics}
        }))
        //Render
        this.scene.add(this.planets[this.planets.length - 1]);
    })
  }

  createPointLight = (color, intensity=10) => {
      const light = new THREE.PointLight(color, intensity)
      light.castShadow = true
      light.shadow.bias = 0.001
      light.shadow.mapSize.width = 2048 //Optamize this
      light.shadow.mapSize.height = 2048 //Optamize this
      return light
  }

  getRing = (size, innerDiameter, color, name, distanceFromAxis) => {
      const geometry = new THREE.RingGeometry(size, innerDiameter, facets)
      const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide})
      const ring = new THREE.Mesh(geometry, material)
      ring.name = name
      ring.position.set(distanceFromAxis, 0, 0)
      ring.rotation.x = Math.PI / 2
      this.scene.add(ring)
      return ring
  }

  getTube = (size, innerDiameter, color, name, distanceFromAxis) => {
    const geometry = new THREE.TorusGeometry(size, innerDiameter, facets)
    const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide})
    const ring = new THREE.Mesh(geometry, material)
    ring.name = name
    ring.position.set(distanceFromAxis, 0, 0)
    ring.rotation.x = Math.PI / 2
    this.scene.add(ring)
    return ring
  }

  getColor = code => {
      var color = "#ef8e38"
      switch(code) {
          case "white":
              color = "#fafdec"
          default:
      }

      return color
  }

  movePlanet = (planet, time, stopRotation=false) => {
      const { orbitValue } = this.state
      const physics = this.getPhysics(planet)
      if(!stopRotation) {
          planet.rotation.y += physics.rotationRate
      }

      planet.position.x = Math.cos(time * (1.0 / (physics.orbitRate * orbitValue)) + 10.0)
      planet.position.z = Math.cos(time * (1.0 / (physics.orbitRate * orbitValue)) + 10.0)
  }

  moveMoon = (moon, planet, time) => {
      this.movePlanet(moon, this.getPhysics(planet))
      moon.position.x = moon.position.x + planet.position.x
      moon.position.z = moon.position.z + planet.position.z
  }

  getPhysics = planet => (this.planets.filter(planetPhysics => 
    planetPhysics.name === planet.name ? (planetPhysics) : null
  ))

  update() {
      this.light.position.copy(this.star.position)
      const time = Date.now()

      this.planets.map(planet => this.movePlanet(planet, time))
      //recursively call update? or this.update?
      requestAnimationFrame(() => {
          this.update(this.renderer, this.scene, this.camera, this.controls)
      })
  }

  onRender = delta => {
    this.update()
    this.renderer.render(this.scene, this.camera);
  };
}
