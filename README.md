# rashnor.com

A 3D interactive portfolio built around a handcrafted low-poly world. The site guides visitors through an immersive scene — from an aerial overview down to an interactive retro computer monitor displaying projects and bio.

**Live:** [rashnor.com](https://rashnor.com)

![Preview](public/images/logo.svg)

## Architecture

The scene is a single continuous 3D environment authored in Blender and rendered in the browser with React Three Fiber. Camera movement is driven by a Theatre.js animation sequence mapped to scroll position, creating a cinematic walkthrough through four sections: **Home**, **About**, **Skills**, and **Projects**.

```
Browser
 ├─ Next.js (SSR shell, routing, static assets)
 ├─ React Three Fiber (scene graph, render loop)
 │   ├─ Theatre.js (keyframed camera animation)
 │   ├─ drei ScrollControls (scroll-to-animation mapping)
 │   ├─ World.glb (Blender scene, Draco-compressed)
 │   ├─ Fire.glb (sprite-atlas flame animation)
 │   └─ HTML overlay (monitor UI via drei Html)
 └─ Tailwind CSS (2D UI layer)
```

## Key Technical Details

- **3D Pipeline:** Blender → glTF export → `gltf-transform` (texture resize, Draco compression) → runtime loading with `useGLTF`
- **Material Optimization:** Selective material downgrade — visually critical meshes (terrain, foliage, water) retain `MeshStandardMaterial` for IBL response, while secondary meshes use a shared `MeshLambertMaterial` cache to reduce shader program count
- **Camera System:** Theatre.js sequence keyframes synced to scroll offset via `ScrollControls`, with throttled `useFrame` updates to minimize unnecessary state changes
- **Fire Effect:** Sprite atlas animation (15x10 grid, 150 frames) with additive blending and a sine-wave flickering point light
- **Monitor UI:** A retro CRT-styled HTML interface rendered as a 3D texture using drei's `<Html>` component, featuring a working file browser for project navigation
- **Navigation:** Dual navigation system — bottom dot indicators and a side panel menu — both using eased `requestAnimationFrame` scrolling for smooth camera transitions

## Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Framework    | Next.js 13                  |
| 3D Rendering | Three.js, React Three Fiber |
| Animation    | Theatre.js                  |
| 3D Helpers   | @react-three/drei           |
| 3D Authoring | Blender                     |
| Styling      | Tailwind CSS                |
| Deployment   | Vercel                      |

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/              Next.js app router
components/       React + R3F components
  ├─ MainCanvas   Scene setup, lights, camera, scroll controls
  ├─ World        GLB scene loader, material optimization
  ├─ Fire         Sprite atlas flame system
  ├─ Monitor      Retro CRT interface (HTML in 3D)
  └─ ...          Navigation, UI overlays
public/
  ├─ 3d/          GLB models (world, fire)
  ├─ images/      Textures, HDR environment maps
  └─ gifs/        Project demo recordings
styles/           Global CSS
```

## License

This project is the personal portfolio of Rasheed Noreldaim. Source code is available for reference purposes.
