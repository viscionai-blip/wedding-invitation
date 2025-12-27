import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, KeyRound } from 'lucide-react';

const LandingPage = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState(''); // 'groom_family', 'groom_friend', 'bride_family', 'bride_friend'
    const [error, setError] = useState('');

    // Secret Code State
    // Secret Code - Checking URL for Magic Link
    // If URL contains ?vip=true, they get access automatically
    const [secretCode, setSecretCode] = useState('');
    // State for auto-detected role
    const [autoSelect, setAutoSelect] = useState(false);

    React.useEffect(() => {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('jeeyan-squad1')) {
            setRole('groom_special');
            setAutoSelect(true);
        } else if (path.includes('jeeyan')) {
            setRole('groom');
            setAutoSelect(true);
        } else if (path.includes('chandni')) {
            setRole('bride');
            setAutoSelect(true);
        }
    }, []);

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
        if (role === 'bride' || role.startsWith('bride')) {
            assignedRole = 'bride_side';
        } else if (role === 'groom_special') {
            assignedRole = 'groom_special';
        }

        // Check Secret Code OR Magic Link (/squad)
        const pathName = window.location.pathname.toLowerCase();
        // Magic link if path contains 'squad'
        const isMagicLink = pathName.includes('squad');

        const hasCocktailAccess = isMagicLink || secretCode.trim().toUpperCase() === 'SQUAD26';

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
        <div className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-charcoal">

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
            <div className="z-10 w-full max-w-md flex flex-col items-center justify-center min-h-[60vh] py-10">
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
                                {['groom', 'bride'].filter(side => {
                                    const path = window.location.pathname.toLowerCase();
                                    if (path.includes('jeeyan')) return side === 'groom';
                                    if (path.includes('chandni')) return side === 'bride';
                                    return true; // Show both if no specific path
                                }).map((side) => {
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

                    {/* Secret Code Section - REMOVED for cleaner UI */}
                    {/* VIPs will use the Magic Link: ?vip=true */}

                    <motion.div
                        className="flex justify-center mt-8 text-white/50"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart size={24} fill="currentColor" className="text-gold opacity-80 drop-shadow-lg" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
