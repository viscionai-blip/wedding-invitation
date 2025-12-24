import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Venue = ({ role }) => {
    return (
        <div
            className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-gold/20 transition-all duration-500"
            style={{
                backgroundImage: 'url(/venue_bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-30" />

            <div className="relative p-8 m-6 md:m-8 rounded-2xl border border-white/20 bg-burgundy/60 backdrop-blur-md shadow-xl text-center space-y-4">
                <div className="inline-flex p-3 bg-white/10 rounded-full shadow-inner mb-2">
                    <MapPin size={24} className="text-gold" />
                </div>

                <div>
                    <h3 className="font-script text-4xl text-white drop-shadow-md mb-2">The Venue</h3>
                    <p className="font-sans text-xs tracking-[0.2em] text-white/80">
                        {role === 'groom_side' ? "Reception (Hosted by Groom's family)" : "RECEPTION (THE FAREWELL FEAST)"}
                    </p>
                </div>

                <div className="space-y-1 py-2">
                    <p className="font-sans text-xl font-bold text-white tracking-wide">Lake City</p>
                    <p className="font-sans text-sm text-white/90">VIP Road, Guwahati</p>
                    <p className="font-sans text-sm font-bold text-gold pt-1">
                        {role === 'groom_side' ? "21st Jan, 2026" : "20th Jan, 2026"} • 6:30 PM Onwards
                    </p>
                </div>

                <a
                    href="https://maps.app.goo.gl/hLERas48T8mXVoq86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 mt-4 rounded-xl bg-gold text-charcoal font-sans text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-lg"
                >
                    <Navigation size={14} />
                    Open in Maps
                </a>
            </div>
        </div>
    );
};

export default Venue;
