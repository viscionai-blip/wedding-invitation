import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, KeyRound } from 'lucide-react';

const LandingPage = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState(''); // 'groom_family', 'groom_friend', 'bride_family', 'bride_friend'
    const [error, setError] = useState('');

    // Secret Code State
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [secretCode, setSecretCode] = useState('');

    const handleEnter = () => {
        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!role) {
            setError('Please select who you are to us.');
            return;
        }

        // Logic: Map selection to internal roles
        let assignedRole = 'groom_side';
        if (role.startsWith('bride')) {
            assignedRole = 'bride_side';
        }

        // Check Secret Code
        const hasCocktailAccess = secretCode.trim().toUpperCase() === 'SQUAD26';

        onLogin({
            name: name.trim(),
            role: assignedRole,
            hasCocktailAccess: hasCocktailAccess
        });
    };

    const getButtonClass = (targetRole) => {
        const isSelected = role === targetRole;
        return `flex-1 py-3 px-2 rounded-xl border transition-all duration-300 font-sans text-xs md:text-sm font-medium
        ${isSelected
                ? 'bg-flamenco text-cream border-gold shadow-lg scale-105 ring-1 ring-gold'
                : 'bg-black/40 text-cream/80 border-white/10 hover:bg-black/60 hover:text-white'
            }`;
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-charcoal">

            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    poster="/video_poster.jpg"
                >
                    <source src="/background.mp4" type="video/mp4" />
                </video>

                {/* Subtle Black Fade Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Overlay Content */}
            <div className="z-10 w-full max-w-md flex flex-col items-center justify-center min-h-[60vh]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-shadow-lg flex flex-col items-center"
                >
                    <p className="text-white/90 text-xs md:text-sm font-sans tracking-[0.3em] uppercase drop-shadow-md mb-0">
                        The Wedding Of
                    </p>

                    <h1 className="font-script text-7xl md:text-8xl text-cream drop-shadow-xl leading-[0.8] mt-6 mb-2">
                        Jeeyan
                    </h1>
                    <span className="font-script text-4xl text-gold my-1 block">&</span>
                    <h1 className="font-script text-7xl md:text-8xl text-cream drop-shadow-xl leading-[0.8]">
                        Chandni
                    </h1>

                    <p className="text-cream/80 font-sans italic tracking-wide text-sm md:text-base mt-6 drop-shadow-md">
                        We are getting married.
                    </p>
                </motion.div>

                <motion.div
                    className="w-full mt-10 space-y-6 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {/* Glassmorphic Container for Form */}
                    <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">

                        {/* Name Input */}
                        <div className="relative group mb-8">
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-6 py-4 rounded-full bg-black/20 border border-white/10 focus:border-sage focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-sage/50 text-center placeholder:text-white/40 font-sans shadow-inner text-cream transition-all duration-300"
                            />
                        </div>

                        {/* Role Selection Grid */}
                        <div className="w-full space-y-4">
                            <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-4 font-sans font-medium">I am with...</p>
                            <div className="flex gap-4">
                                {['groom', 'bride'].map((side) => {
                                    const isSelected = role === side;
                                    return (
                                        <div key={side} className="relative group flex-1">
                                            {/* Glowing Animated Border Container */}
                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-gold via-flamenco to-gold rounded-xl opacity-0 transition-opacity duration-500 blur-sm bg-size-200
                                                ${isSelected ? 'opacity-100 animate-gradient-xy' : 'group-hover:opacity-75'}`}></div>

                                            <button
                                                onClick={() => { setRole(side); setError(''); }}
                                                className={`relative w-full py-4 px-2 rounded-xl border transition-all duration-300 font-sans text-xs md:text-sm font-semibold tracking-wide overflow-hidden
                                                ${isSelected
                                                        ? 'bg-gradient-to-br from-charcoal to-black text-gold border-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                                        : 'bg-black/40 text-cream/70 border-white/10 hover:bg-black/60 hover:text-white hover:border-white/30'
                                                    }`}
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {side === 'groom' ? 'Team Groom' : 'Team Bride'}
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-300 text-xs font-medium drop-shadow-md animate-pulse mt-2">{error}</p>
                    )}

                    <button
                        onClick={handleEnter}
                        className="group w-full py-4 rounded-full bg-gold hover:bg-[#c5a028] text-burgundy font-sans tracking-widest uppercase text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-[0.98] border border-white/10 mt-6"
                    >
                        View Invitation
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Secret Code Section - Hidden by Default */}
                    <div className="flex flex-col items-center mt-4">
                        {!showCodeInput ? (
                            <button
                                onClick={() => setShowCodeInput(true)}
                                className="px-3 py-1 rounded-full border border-white/10 text-white/50 text-[9px] uppercase tracking-wider hover:bg-white/5 hover:text-white/80 hover:border-gold/30 transition-all duration-300 backdrop-blur-sm"
                            >
                                Enter Group PIN
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-[140px]"
                            >
                                <input
                                    type="text"
                                    placeholder="Group PIN (Optional)"
                                    value={secretCode}
                                    onChange={(e) => setSecretCode(e.target.value)}
                                    autoFocus
                                    className="w-full px-2 py-1 rounded text-center bg-black/20 border border-white/5 text-gold/80 text-[9px] focus:outline-none focus:border-gold/30 focus:bg-black/40 placeholder:text-white/20 transition-all font-sans tracking-wide"
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Heart size={24} fill="currentColor" className="text-gold opacity-80 drop-shadow-lg" />
            </motion.div>
        </div>
    );
};

export default LandingPage;
