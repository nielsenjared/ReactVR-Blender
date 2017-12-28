# ReactVR + Blender

## Getting Started with ReactVR

Install react-vr-cli:

`npm install -g react-vr-cli`

Create a new ReactVR app:
`react-vr init ReactVR-Blender`

Uppercase is the naming convention as react-vr-cli will generate a class component using the name you provide.

`cd ReactVR-Blender`
`npm start`

Open http://localhost:8081/vr/

Well, hello there...

## Hot Reload

Adding hot reloading to your app is great for development. To do so, in vr/client.js, on line 10, just above `...options`, add:
`enableHotReload: true,`

## Creating Equirectangular Panoramic Images with Blender

Download the latest version of Blender http://blender.org Ensure that you are using a version later than 2.77.

Open Blender and create a scene.

Be sure to switch to Cycles Render. You can't render panoramic images for VR using the default engine.

Under the Render panel, in Dimensions, set the size to 2:1 with a minimum value of 2048 x 1024.

Next, in the 3D viewport, select the camera. Shift + S and Selection to Cursor.

Open the Transform panel and change the Rotation to X: 90 and Z: 0.

With the camera selected in the viewport, select the Camera panel.

Under Lens, select Panoramic.

Under the Type toggle, select: Equirectangular

Hit F12 to render. Then F3 to save the image file.

Save the .png in the static_assets folder of your ReactVR app.

## Hacking ReactVR

On line 14 of index.vr.js, replace chess-world.jpg with your newly created image.

Next delete the <Text> component and its contained styles. Save and refresh your app.

## Importing Models

Open a new Blender file, add a mesh, and under File, select Export > Wavefront (.obj).

Save the file in static_assets.

In index.vr.js, add Model and Animated to your react-vr import statement.

```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
} from 'react-vr';
```

Under your Pano component, add a new Model component:

```
<Model
  source={{
    obj: asset('untitled.obj')
  }}
  style={{
    color: "#666"
    transform: [
      {translate: [0, 0, -4]}
    ]
  }}
/>
```

It will be positioned behind the Text component, so remove backgroundColor from the style.

```
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
```

## Adding Light

From react-vr, import AmbientLight and PointLight:

```
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  PointLight
} from 'react-vr';
```

Under the Pano component, add AmbientLight and PointLight components:

```
<AmbientLight intensity={0.5} />
<PointLight
  style={{
    color: 'white',
    transform: [
      {translate: [0, 0, 0]}
    ]
  }}
/>
```

To the Model component add a `lit` property:

```
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
```

## Animating Models

Import from react-vr the Animated component and from react-native the Easing component:

```
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
```

Declare a component to animate using the Animated component:

`const AnimatedModel = Animated.createAnimatedComponent(Model);
`

In order to animate a model, we need to use state. At the top of the ReactVR_Blender component, add:

```
state = {
  rotation: new Animated.Value(0)
}

componentDidMount() {
  this.rotate();
}
```

Create a rotate function:

```
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
```

Copy/paste the Model component below itself, but above Text, change the Z translate to a positive integer, and add the following transform objects:

```
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
```

## Deployment

`npm run bundle`
