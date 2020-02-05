import React, { useState, useEffect } from 'react'

export const FTL = props => {
    const [progress, updateProgress] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
          }).start();
    }, [])
    
    return (
        <LottieView source={require('../../lottie-animations/spacecraft.json')} loop={true} progress={progress} />
    );
}