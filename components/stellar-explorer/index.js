import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React, { Component } from 'react';
import { Button, Text, PanResponder, View } from 'react-native'
import { State, LongPressGestureHandler, TapGestureHandler, PanGestureHandler, FlingGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';

export default class SpaceExplorer extends Component {

  constructor(props) {
      super(props)
      this.planets = []

      this.state = {
          planetPhysics: {},
          initialRender: true,
          orbitValue: 200,
          r: 35,
          theta: 0,
          dTheta: 2 * Math.PI / 1000
      }

      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {},
        onPanResponderMove: ({ nativeEvent }, gestureState) => {
          //@TODO Set different geastures and actions
          requestAnimationFrame(() => {
            if( gestureState.numberActiveTouches === 1 ) {
//            this.camera.position.z += nativeEvent.locationX > 150 ? 2 : -2;
            this.camera.position.x += nativeEvent.locationX > 150 ? 2 : -2;
          }
          })
        },
        onPanResponderRelease: (event, gestureState) => {
          console.log("Event and gestureState if one finger its a click", event, gestureState)
        },
      });
  }

  componentDidMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <View style={{ flex: 1 }}
          {...this.panResponder.panHandlers}
      >
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onTouchStart={this._handleTouchStart}
        isShadowsEnabled={true}
        onPress={this._handlePressStart}
      />
      </View>
    );
  }

  introZoom = () => {
    if(this.camera.position.z > 300) {
        this.camera.position.z -= 10
    } else {
        this.setState({
            initialRender: false
        })
    }
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor("#000")
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.clock = new THREE.Clock();
    this.camera.position.z = 1200;
    this.camera.position.y  = 50;
    this.r = 35
    this.theta = 0
    this.dTheta = 2 * Math.PI / 1000
    this.textureLoader = new THREE.TextureLoader()

            // Load the background texture
    const bgTexture = this.textureLoader.load('/assets/images/static/space.png')
    const backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: bgTexture
        })
    );
    
            backgroundMesh.material.depthTest = false;
            backgroundMesh.material.depthWrite = false;
    
            // Create your background scene
            this.backgroundScene = new THREE.Scene();
            this.backgroundCamera = new THREE.Camera();
            this.backgroundScene.add(this.backgroundCamera);
            this.backgroundScene.add(backgroundMesh);
    
    /**
     * Create Geometric Figures
     */
    this.createControls()
    this.createStarField()
    this.createStar()
    this.createPlanets()
    this.scene.add(new THREE.AmbientLight(0x404040));

    this.light = this.createPointLight(3.5, this.star.color)
    this.scene.add(this.light)

    const ambientLight = new THREE.AmbientLight(0xaaaaaa)
    this.scene.add(ambientLight)     
   };

  createControls() {
    this.raycaster = new THREE.Raycaster()
    this.raycasterCheck = false
    this.pressVector = {
      x: 0,
      y: 0
    }
  }

  checkCollision() {
 
	}

  createStar() {
    const { star } = this.props
    //Change this to be more accurate
    const geometry = new THREE.SphereGeometry(30);

    const material = new THREE.MeshPhongMaterial({
      color: this.getColor(star.color),
      shininess: 5
    });
    
    material.receiveShadow = true
    material.castShadow = true

    const starObj = new THREE.Mesh(geometry, material);
    console.log("star object to check" , { starObj })
    this.star = starObj
    this.star.position.set(0,0,0)

    this.scene.add(this.star);

    //Create the corona of the sun TODO 
  }

  createStarField() { 
        //@TODO create background star field.
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
            distanceFromAxis: (i + 1) * 300,
            name: planet.name,
            size: Math.PI * (planet.radius * planet.radius),
            index: i 
        }
        //Create object shape
        const geometry = new THREE.SphereGeometry(physics.size + 2 * 3);
        //Create object material
        //@TODO add planet meshes
        const material = new THREE.MeshPhongMaterial({
          color: "#ffffff",
        });

        material.receiveShadow = true
        material.castShadow = true
        //Create the object as a mesh
        const planetObj = new THREE.Mesh(geometry, material);
        //Set position
        planetObj.name = planet.name
        planetObj.castShadow = true
        //@TODO set distance from star and figure out
        //random starting position in orbit.
        planetObj.position.set(20 * (i), 0, 0)
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
  //@TODO
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
  //@TODO 
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
          case "red": 
              color = "#ce2029"
          case "yellow": 
              color = "#f9d71c"
          case "orange":
              color = "#FFA500"
          case "blue": 
              color = "#007bb8"
          default:
      }

      return color
  }

  movePlanet = (planet, index, stopRotation=false) => {
      //const physics = this.getPhysics(planet.name)
      this.theta += this.dTheta;
      planet.rotation.y -= .001
      planet.position.x = (this.r + (index * 32)) * Math.cos(this.theta)
      planet.position.z = (this.r + (index * 32)) * Math.sin(this.theta)
  }

  moveMoon = (moon, planet, time) => {
      this.movePlanet(moon, this.getPhysics(planet.name))
      moon.position.x = moon.position.x + planet.position.x
      moon.position.z = moon.position.z + planet.position.z 
  }

  createVisableOrbit = planet => {
      const orbitalWidth = 0.1
      const orbit = getRing(planet.distanceFromAxis + orbitalWidth,
        planet.distanceFromAxis - orbitalWidth,
        320,
        0xffffff,
        planet.name,
        0)
  }

  getPhysics = name => {
    return (this.planets.filter(planetPhysics => 
    planetPhysics.name === name ? (planetPhysics) : null
    ))
  }

  onPressHandler(event) {
		this.pressVector.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.pressVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
		this.raycasterCheck = true;
	}

  onRender = delta => {
    this.light.position.copy(this.star.position)
    const time = Date.now()
    this.star.rotation.y = 10 * delta
    if(this.state.initialRender) {
        this.introZoom()
    }
    this.checkCollision()
    this.planets.map((planet, k) => this.movePlanet(planet, k))
    this.renderer.render(this.backgroundScene , this.backgroundCamera );
    this.renderer.render(this.scene, this.camera);
  };

  zoom = value => this.camera.position.z += value
}
