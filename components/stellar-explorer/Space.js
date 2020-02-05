import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import OrbitingObject from "./components/OrbitingObject";
import ScaleControl from "./components/ScaleControl";
import SpeedControl from "./components/SpeedControl";
import ResetButton from "./components/ResetButton";
import ShowStarsButton from "./components/ShowStarsButton";
import Footer from "./components/Footer";
// styles
import "./assets/scss/main.scss";
// helpers and data
import { solarSystemData } from "./lib/orbiting-data";

export const Space = props => {
    //Inital screen size
    const [screenSize, updateScreenSize] = useState(
        {
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width
        }
    )
    //Initial Universe Setup
    const [universe, updateUniverseCenter] = useState({ center: {
        cx: Dimensions.get('screen').width / 2,
        cy: Dimensions.get('screen').height / 2
    } })
    //Configurations
    const [viewTilt] = useState(0.8)
    const [speed, updateSpeed] = useState(1)
    const [frameRate, updateFrameRate] = useState(70)
    const [zIndex, updateZIndex] = useState(5000)
    const [scale, updateScale] = useState(0.4)
    const [scaleLimitLower] = useState(0.1)
    const [scaleLimitUpper] = useState(2)
    const [showStars, updateShowStars] = useState(true)
    //Screen size change handler
    const updateScreenSizeHandler = ({height, width}) => {
        updateScreenSize({height, width})
        updateUniverseCenter({center: {
            cx: width / 2,
            cy: height / 2
        }})
    }
    //Add event listener for screen changes
    Dimensions.addEventListener('change', updateScreenSizeHandler)

 
    useEffect(() => {
        updateUniverseCenter()
        window.addEventListener("resize", updateScreenSizeHandler);
        return () => window.removeEventListener('resize', updateScreenSizeHandler)
    }, [])
    
      clickAction = (changeType, change = null) => {
        // get current values - need to change in whole numbers to avoid tiny fractions creeping in
        let tmpScale = scale * 10;
        let tmpScaleStep = scaleStep * 10;
        let tmpSpeed = speed * 10;
        let tmpSpeedStep = speedStep * 10;
        // change scale or speed
        if (changeType === "scale") {
          tmpScale =
            change === "-" ? tmpScale - tmpScaleStep : tmpScale + tmpScaleStep;
        } else if (changeType === "speed") {
          tmpSpeed =
            change === "-" ? tmpSpeed - tmpSpeedStep : tmpSpeed + tmpSpeedStep;
        } else if (changeType === "reset") {
          tmpSpeed = defaultSpeed * 10;
          tmpScale = defaultScale * 10;
        }
        // set new scale
        updateScale(tmpScale / 10)
        updateSpeed(tmpSpeed / 10)
    };
    
    const toggleStars = () => {
        updateShowStars(!showStars)
    };
    

    return (
    <div id="universe" className="universe" style={style}>
    {/* render the stars */}
    {showStars && (
      <React.Fragment>
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </React.Fragment>
    )}

    {/* render the solar system objects */}

    {Object.keys(props.planets).map((key, i) => {
      let solarObject = solarSystemData[key];
      return (
        <OrbitingObject
          key={i}
          universe={universe}
          solarSystem={props.data}
          solarObject={solarObject}
        />
      );
    })}
    <ScaleControl
      clickAction={clickAction}
      universeScale={{
        scale: scale,
        scaleStep: scaleStep,
        scaleLimitLower: scaleLimitLower,
        scaleLimitUpper: scaleLimitUpper
      }}
    />
    <SpeedControl
      clickAction={clickAction}
      universeSpeed={{
        speed: speed,
        speedStep: speedStep,
        speedLimitLower: speedLimitLower,
        speedLimitUpper: speedLimitUpper
      }}
    />
    <ResetButton clickAction={clickAction} />
    <ShowStarsButton
      clickAction={toggleStars}
      buttonText={showStars ? "Hide Stars" : "Show Stars"}
    />
    <Footer />
    </div>
    )


}