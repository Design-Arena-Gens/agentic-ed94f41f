'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIO_URL = 'https://nyc3.digitaloceanspaces.com/imagine-explainers/audio-explainers/677d671ccefba3c7c5245cb9/0640663b-c6f7-489c-ba8f-3d076c1ace3c-full.mp3';

interface Scene {
  start: number;
  end: number;
  title: string;
  visuals: string[];
  colors: string[];
}

const scenes: Scene[] = [
  {
    start: 0,
    end: 15,
    title: "The Self-Driving Revolution",
    visuals: ['🚗', '🤖', '✨'],
    colors: ['#667eea', '#764ba2']
  },
  {
    start: 15,
    end: 30,
    title: "Sensors: The Digital Eyes",
    visuals: ['👁️', '📡', '🔍'],
    colors: ['#f093fb', '#f5576c']
  },
  {
    start: 30,
    end: 45,
    title: "Cameras Capture the World",
    visuals: ['📷', '🌍', '🎨'],
    colors: ['#4facfe', '#00f2fe']
  },
  {
    start: 45,
    end: 60,
    title: "LiDAR: Laser Precision",
    visuals: ['🔆', '📏', '💎'],
    colors: ['#43e97b', '#38f9d7']
  },
  {
    start: 60,
    end: 75,
    title: "Radar: Seeing Through Fog",
    visuals: ['📶', '🌫️', '⚡'],
    colors: ['#fa709a', '#fee140']
  },
  {
    start: 75,
    end: 90,
    title: "Ultrasonic: Close-Range Guardian",
    visuals: ['🔊', '🛡️', '📍'],
    colors: ['#30cfd0', '#330867']
  },
  {
    start: 90,
    end: 105,
    title: "Processing the Data",
    visuals: ['💻', '🧠', '⚙️'],
    colors: ['#a8edea', '#fed6e3']
  },
  {
    start: 105,
    end: 120,
    title: "Your Role in the Future",
    visuals: ['🚀', '🌟', '🌈'],
    colors: ['#ff9a9e', '#fecfef']
  }
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const scene = scenes.findIndex(s => currentTime >= s.start && currentTime < s.end);
    if (scene !== -1 && scene !== currentScene) {
      setCurrentScene(scene);
    }
  }, [currentTime, currentScene]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const scene = scenes[currentScene];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${scene.colors[0]}, ${scene.colors[1]})`,
      transition: 'background 1s ease',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <audio ref={audioRef} src={AUDIO_URL} preload="metadata" />

      {/* Animated Background Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => {
          const randomX1 = Math.random() * 100;
          const randomY1 = Math.random() * 100;
          const randomX2 = Math.random() * 100;
          const randomY2 = Math.random() * 100;
          return (
            <motion.div
              key={i}
              initial={{
                x: `${randomX1}vw`,
                y: `${randomY1}vh`,
                scale: 0
              }}
              animate={{
                x: `${randomX2}vw`,
                y: `${randomY2}vh`,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                filter: 'blur(2px)'
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%'
      }}>
        <motion.h1
          key={scene.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '40px',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          {scene.title}
        </motion.h1>

        {/* Visual Elements */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '60px',
          minHeight: '200px',
          alignItems: 'center'
        }}>
          <AnimatePresence mode="wait">
            {scene.visuals.map((visual, i) => (
              <motion.div
                key={`${currentScene}-${i}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: 0,
                  y: [0, -20, 0]
                }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                }}
              >
                {visual}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Audio Waveform Visualization */}
        {isPlaying && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '40px',
            height: '60px',
            alignItems: 'flex-end'
          }}>
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ['20px', `${Math.random() * 60 + 20}px`, '20px']
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: '4px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '2px'
                }}
              />
            ))}
          </div>
        )}

        {/* Controls */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            style={{
              fontSize: '3rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </motion.button>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '15px'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Time Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Scene Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '30px'
        }}>
          {scenes.map((_, i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: i === currentScene
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Title Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          padding: '15px 30px',
          borderRadius: '50px',
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        Navigating the Autonomous Frontier 🚗
      </motion.div>
    </main>
  );
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
