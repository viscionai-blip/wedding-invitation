import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Auto-play on mount (with handling for browser policies)
    useEffect(() => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    setIsPlaying(true);
                })
                    .catch(error => {
                        // Auto-play was prevented
                        setIsPlaying(false);
                    });
            }
        }
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop>
                <source src="/wedding_song.mp3" type="audio/mp3" />
            </audio>

            <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-sage/90 backdrop-blur-sm text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-float"
            >
                {isPlaying ? (
                    <div className="relative">
                        <span className="absolute -inset-1 rounded-full bg-white/20 animate-ping"></span>
                        <Pause size={20} fill="currentColor" />
                    </div>
                ) : (
                    <Play size={20} fill="currentColor" className="ml-1" />
                )}
            </button>
        </div>
    );
};

export default MusicPlayer;
