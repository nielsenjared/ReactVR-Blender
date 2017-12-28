import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  AmbientLight,
  PointLight
} from 'react-vr';

import {
  Easing
} from 'react-native';

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class ReactVR_Blender extends React.Component {
  state = {
    rotation: new Animated.Value(0)
  }

  componentDidMount() {
    this.rotate();
  }

  rotate = () => {
    this.state.rotation.setValue(0);
    Animated.timing(
      this.state.rotation,
      {
        toValue: 360,
        duration: 10000,
        easing: Easing.linear,
      }
    ).start(this.rotate);
  }

  render() {
    return (
      <View>
        <Pano source={asset('untitled.png')}/>
        <AmbientLight intensity={0.5} />
        <PointLight
          style={{
            color: 'white',
            transform: [
              {translate: [0, 0, 0]}
            ]
          }}
        />
        <Model
          lit
          source={{
            obj: asset('untitled.obj')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [0, 0, -4]}
            ]
          }}
        />
        <AnimatedModel
          lit
          source={{
            obj: asset('untitled.obj')
          }}
          style={{
            color: "#666",
            transform: [
              {translate: [0, 0, 3]},
              {rotateX: this.state.rotation},
              {rotateY: this.state.rotation},
              {rotateZ: this.state.rotation}
            ]
          }}
        />
        <Text
          style={{
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>

      </View>
    );
  }
};

AppRegistry.registerComponent('ReactVR_Blender', () => ReactVR_Blender);
