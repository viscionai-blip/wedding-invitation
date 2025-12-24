import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const InlineAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const START_TIME = 4; // 0:04
    const END_TIME = 193; // 3:13
    const CLIP_DURATION = END_TIME - START_TIME;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // Ensure we start from the correct range if somehow out of bounds
                if (audioRef.current.currentTime < START_TIME || audioRef.current.currentTime >= END_TIME) {
                    audioRef.current.currentTime = START_TIME;
                }
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const current = audio.currentTime;

            // Loop logic
            if (current >= END_TIME) {
                audio.currentTime = START_TIME;
                audio.play(); // Ensure it keeps playing
            }

            // Progress for the clips duration
            const clipProgress = ((current - START_TIME) / CLIP_DURATION) * 100;
            setProgress(Math.max(0, Math.min(100, clipProgress)));
        };

        const handleLoadedMetadata = () => {
            if (audio.currentTime < START_TIME) {
                audio.currentTime = START_TIME;
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Try autoplay logic moved to interaction or after load
        // But for auto-play on mount:
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(e => {
                console.log("Autoplay blocked", e);
                setIsPlaying(false);
            });
        }

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    // Calculate display time based on progress
    const displayTime = Math.floor((progress / 100) * CLIP_DURATION);

    return (
        <div className="w-full max-w-xs mx-auto bg-burgundy/60 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gold/20 my-6 hover:bg-burgundy/80 transition-colors">
            <audio
                ref={audioRef}
                src="/wedding_song.mp3"
                preload="metadata"
            />

            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center bg-gold/90 text-charcoal rounded-full shadow-[0_0_15px_rgba(191,162,104,0.4)] hover:scale-110 hover:bg-gold transition-all"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>

                <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-[10px] text-gold font-sans tracking-wider uppercase font-bold">
                        <span>{formatTime(displayTime)} / {formatTime(CLIP_DURATION)}</span>
                        <Volume2 size={12} />
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold shadow-[0_0_10px_rgba(191,162,104,0.8)] transition-all duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InlineAudio;
