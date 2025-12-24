import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import Countdown from './Countdown';
import Timeline from './Timeline';
import Gallery from './Gallery';
import InlineAudio from './InlineAudio';
import Venue from './Venue';
import RSVP from './RSVP';

const InvitePage = ({ guest, onLogout }) => {
    const targetDate = "2026-01-21T10:00:00"; // Nikah Time

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden">

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] overflow-hidden rounded-b-[3rem] shadow-2xl z-0">
                <img
                    src="/hero.jpg"
                    alt="Couple"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-transparent to-transparent opacity-90" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-6 left-0 right-0 text-center"
                >
                    <h1 className="font-script text-6xl text-cream drop-shadow-lg">
                        Jeeyan <span className="text-4xl text-gold">&</span> Chandni
                    </h1>
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-cream/80 mt-2 text-shadow-sm">We Are Getting Married</p>
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="px-6 -mt-12 relative z-10 space-y-8">

                {/* Inline Player Card */}
                <InlineAudio />

                {/* Welcome Message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-4 mb-8 space-y-3 bg-burgundy/40 backdrop-blur-md rounded-2xl p-6 border border-gold/20 shadow-lg"
                >
                    <p className="font-script text-4xl text-gold drop-shadow-md">You're Invited!</p>
                    <p className="font-sans text-cream/90 text-sm max-w-xs mx-auto leading-relaxed">
                        We would be delighted to have you, <span className="font-bold text-gold text-lg">{guest.name}</span>, celebrate this special moment with us.
                    </p>
                </motion.div>

                <Countdown targetDate={targetDate} />
            </div>

            {/* Timeline Section */}
            <section className="px-4 mt-12 relative z-10">
                <div className="flex items-center justify-center mb-8">
                    <span className="h-px w-12 bg-white/30"></span>
                    <span className="mx-4 font-sans text-xs uppercase tracking-widest text-white/80">The Events</span>
                    <span className="h-px w-12 bg-white/30"></span>
                </div>
                <Timeline role={guest.role} hasCocktailAccess={guest.hasCocktailAccess} />
            </section>

            {/* Gallery Section */}
            <Gallery />

            {/* Details Section - Glass Card */}
            <section className="px-6 py-10 space-y-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] mx-2 mt-8 shadow-2xl border border-white/10 relative z-10">
                {/* Glossy shine effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <Venue role={guest.role} />

                {/* Gift Section */}
                <div className="text-center space-y-4 py-8 border-b border-white/10">
                    <div className="flex justify-center">
                        <Gift size={32} className="text-gold animate-bounce-slow" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/90 font-bold">Gifts</h3>
                    <p className="font-sans text-white/70 text-sm leading-relaxed max-w-xs mx-auto italic">
                        "Your presence will be the most cherished gift of all"
                    </p>
                </div>

                <RSVP />

                <footer className="text-center pt-8 pb-12 space-y-8">
                    <div>
                        <p className="font-sans text-xs tracking-widest text-white/50 mb-3">With Love</p>
                        <h2 className="font-script text-4xl text-cream drop-shadow-md">
                            Jeeyan <span className="text-2xl text-gold font-serif">&</span> Chandni
                        </h2>
                    </div>

                    <button
                        onClick={onLogout}
                        className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white/70 transition-all backdrop-blur-sm"
                    >
                        Log Out
                    </button>
                </footer>
            </section>
        </div>
    );
};

export default InvitePage;
