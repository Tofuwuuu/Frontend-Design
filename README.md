# Modern Frontend Design

A visually impressive, artistic, and interactive frontend built with Next.js, Tailwind CSS, Framer Motion, and React Three Fiber. This project features a modern, smooth, and cinematic design with fluid animations, 3D background effects, and fully responsive layouts.

## ✨ Features

- **3D Background Effects**: Interactive 3D starfield and floating shapes powered by React Three Fiber
- **Smooth Animations**: Fluid motion design with Framer Motion for cinematic experiences
- **Responsive Design**: Perfectly optimized for all devices and screen sizes
- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Glass Morphism**: Beautiful glassmorphic UI elements with backdrop blur effects
- **Gradient Effects**: Eye-catching gradient text and buttons
- **Interactive Components**: Hover effects and interactive animations throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd frontend-design
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

You should see the application running with the 3D background and animated hero section.

## 🛠️ Customization

### Colors and Theming

Modify the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      },
    },
  },
}
```

### 3D Scene Customization

Edit `components/Scene3D.tsx` to customize:

- **Star count**: Change the `5000` value in the `sphere` useMemo hook
- **Star field size**: Adjust the multiplier in the position calculation (currently `2000`)
- **Rotation speed**: Modify the delta values in the `useFrame` hook
- **Floating shape**: Change the geometry or material properties in the `FloatingShapes` component

### Animation Customization

Modify animations in `components/HeroSection.tsx`:

- **Stagger timing**: Adjust `staggerChildren` and `delayChildren` in `containerVariants`
- **Animation duration**: Change `duration` values in `itemVariants` and `cardVariants`
- **Hover effects**: Modify scale values in `cardVariants`

### Typography

Customize fonts in `app/layout.tsx` by importing a different font from `next/font/google`:

```typescript
import { Inter, Poppins, Raleway } from 'next/font/google'

const customFont = Poppins({ subsets: ['latin'] })
```

### Glass Effect Styles

Modify the glassmorphic effect in `app/globals.css`:

```css
.glass {
  background: rgba(255, 255, 255, 0.05); /* Adjust opacity */
  backdrop-filter: blur(10px); /* Adjust blur amount */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Adjust border */
}
```

## 📦 Project Structure

```
frontend-design/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Scene3D.tsx          # 3D background component
│   └── HeroSection.tsx      # Hero section with animations
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🎨 Key Components

### Scene3D Component

The `Scene3D` component creates an immersive 3D background with:
- Animated starfield using React Three Fiber
- Floating geometric shapes
- Smooth rotation and movement animations

### HeroSection Component

The `HeroSection` component features:
- Staggered text animations
- Interactive feature cards with hover effects
- Gradient buttons with smooth transitions
- Scroll indicator animation

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy" and your site will be live in minutes

### Other Platforms

#### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Set the build command to: `npm run build`
3. Set the publish directory to: `.next`
4. Deploy to Netlify

#### Custom Server

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000` (or your configured port).

### Environment Variables

For production deployments, you may want to configure:
- `NODE_ENV=production`
- Custom API endpoints (if added later)
- Analytics keys (if using analytics)

## 🧪 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Dependencies

### Core
- **Next.js 14**: React framework with server-side rendering
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React

### 3D Graphics
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for React Three Fiber
- **Three.js**: 3D graphics library

## 🎯 Performance Optimization

- The 3D scene uses efficient rendering with `frustumCulled={false}` for stars
- Animations use GPU-accelerated transforms
- Images (if added) should be optimized using Next.js Image component
- Consider lazy loading for heavy components

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` directories
2. Run `npm install` again
3. Try building with `npm run build`

### 3D Scene Not Rendering

- Ensure your browser supports WebGL
- Check browser console for errors
- Verify Three.js dependencies are installed correctly

### Animation Issues

- Clear browser cache
- Check for conflicting CSS animations
- Verify Framer Motion is properly imported

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js, Tailwind CSS, Framer Motion, and React Three Fiber
