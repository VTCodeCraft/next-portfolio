import { Html, useProgress } from '@react-three/drei';
import React from 'react'

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      wrapperClass="pointer-events-none"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <span
        className="animate-spin"
        style={{
          height: 36,
          width: 36,
          borderRadius: "9999px",
          border: "2px solid var(--canvas-loader-track)",
          borderTopColor: "var(--canvas-loader-head)",
        }}
      />
      <p
        className="text-[var(--canvas-loader-text)]"
        style={{
          fontSize: 11,
          fontWeight: 700,
          marginTop: 14,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
        {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
      </p>
    </Html>
  )
}
