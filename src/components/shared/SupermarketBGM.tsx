'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Bell } from 'lucide-react';

export default function SupermarketBGM() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume (50%)
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioBgmRef = useRef<HTMLAudioElement | null>(null);
  const audioChimeRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Synthesizer chime fallback (in case /chime.mp3 is missing)
  const playSynthesizedChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Classic Convenience Store Bell: F#5, D5, A4, D5, E5, A5
      const melody = [739.99, 587.33, 440.00, 587.33, 659.25, 880.00];
      const dur = 0.22;

      melody.forEach((freq, idx) => {
        const time = now + idx * dur;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0.12 * volume, time);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.8);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.8);
      });
    } catch (e) {
      console.warn("Synthesizer chime failed:", e);
    }
  };

  // Play convenience store entrance chime
  const playEntranceChime = () => {
    if (audioChimeRef.current && audioChimeRef.current.src && !audioChimeRef.current.error) {
      audioChimeRef.current.currentTime = 0;
      audioChimeRef.current.volume = volume;
      audioChimeRef.current.play().catch(() => {
        // Fallback to synth if play is blocked/fails
        playSynthesizedChime();
      });
    } else {
      playSynthesizedChime();
    }
  };

  // Toggle BGM play/pause
  const togglePlay = () => {
    if (!audioBgmRef.current) return;

    if (isPlaying) {
      audioBgmRef.current.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      // Play chime
      playEntranceChime();
      
      // Start BGM after a tiny delay to let the chime play
      setTimeout(() => {
        if (isPlayingRef.current && audioBgmRef.current) {
          audioBgmRef.current.play().catch(e => console.warn("BGM playback blocked:", e));
        }
      }, 500);

      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Adjust volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Sync volume state with Audio elements
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;
    if (audioBgmRef.current) {
      audioBgmRef.current.volume = targetVolume;
    }
    if (audioChimeRef.current) {
      audioChimeRef.current.volume = targetVolume;
    }
  }, [volume, isMuted]);

  // Load Audio Elements on Mount
  useEffect(() => {
    // 1. Initialize BGM Audio (local public/audio/bgm/mosi-mosi.mp3)
    const bgm = new Audio('/audio/bgm/mosi-mosi.mp3');
    bgm.loop = true;
    bgm.volume = volume;
    
    // Cozy fallback stream if local file doesn't exist/fails to load
    bgm.addEventListener('error', () => {
      console.warn("Local bgm.mp3 not found. Using high-quality public bossa lounge stream.");
      // Public royalty-free cozy bossa/lounge loop (approx 2 mins track)
      bgm.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';
      bgm.volume = isMuted ? 0 : volume;
      if (isPlayingRef.current) {
        bgm.play().catch(e => console.warn("Fallback play blocked:", e));
      }
    });

    audioBgmRef.current = bgm;

    // 2. Initialize Chime Audio (local public/chime.mp3)
    const chime = new Audio('/chime.mp3');
    chime.volume = volume;
    chime.addEventListener('error', () => {
      // If error occurs, we set source to empty to force the synthesizer fallback
      chime.removeAttribute('src');
    });

    audioChimeRef.current = chime;

    return () => {
      bgm.pause();
    };
  }, []);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Equalizer animation bars */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-6 px-2.5 bg-black/45 backdrop-blur-md rounded-full border border-border/20 shadow-lg">
          <span className="w-0.75 bg-primary rounded-full animate-pulse h-3 inline-block [animation-delay:0.1s]"></span>
          <span className="w-0.75 bg-primary rounded-full animate-pulse h-5 inline-block [animation-delay:0.3s]"></span>
          <span className="w-0.75 bg-primary rounded-full animate-pulse h-2 inline-block [animation-delay:0.5s]"></span>
          <span className="w-0.75 bg-primary rounded-full animate-pulse h-4 inline-block [animation-delay:0.2s]"></span>
        </div>
      )}

      {/* Main Music Widget */}
      <div 
        className={`flex items-center gap-3 p-2 rounded-full border border-border/40 shadow-xl bg-card/75 backdrop-blur-lg transition-all duration-300 ${
          isExpanded ? 'max-w-[280px] px-3' : 'max-w-[50px] overflow-hidden'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground transition-transform hover:scale-105 shadow-md shrink-0"
          title={isPlaying ? "Pause BGM" : "Play Supermarket BGM"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="flex items-center gap-2.5 animate-fadeIn">
            {/* Title / Description */}
            <div className="flex flex-col select-none max-w-[90px]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary leading-tight">Convenience</span>
              <span className="text-[9px] font-medium text-muted-foreground truncate leading-none">Supermarket BGM</span>
            </div>

            {/* Entrance Bell Trigger */}
            <button
              onClick={playEntranceChime}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-foreground"
              title="Play Entrance Chime"
            >
              <Bell size={14} className={isPlaying ? "animate-bounce" : ""} />
            </button>

            {/* Mute and Volume slider */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 rounded-full bg-border appearance-none cursor-pointer accent-primary [&::-webkit-slider-runnable-track]:bg-border/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
