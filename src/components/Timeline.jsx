import React from 'react';
import { motion } from 'framer-motion';

const events = [
    {
        id: 1,
        title: "Cocktail",
        date: "Jan 10, 2026",
        time: "5:00 PM Onwards",
        image: "/cocktail.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Amchang+Farmhouse+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Amchang Farmhouse</a>
                <br />
                <strong>Dresscode:</strong> Black
            </span>
        ),
        roles: ["cocktail_only", "all_access"]
    },
    {
        id: 3,
        title: "Juroon - The Aagomon",
        date: "Jan 19, 2026",
        time: "10:00 AM Onwards",
        image: "/juroon.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Rajmahal+Banquet+Birkuchi+Narengi+Tiniali" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Rajmahal Banquet, Birkuchi, Narengi Tiniali</a>
            </span>
        ),
        roles: ["bride_side", "all_access"]
    },
    {
        id: 2,
        title: "Mehendi",
        date: "Jan 20, 2026",
        time: "2:00 PM Onwards",
        image: "/mehendi.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Hungry+Monk+Restro+Cafe+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">8, Goodwill Block, Near Hungry Monk Restro Cafe</a>
                <br />
                <strong>Dresscode:</strong> Yellow
            </span>
        ),
        roles: ["bride_side", "all_access"]
    },
    {
        id: 4,
        title: "Biya - The Agni Saaxhi",
        date: "Jan 20, 2026",
        time: "Baraat: 9:30 AM",
        image: "/biya.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Lake+City+Six+Mile+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Lake City, Six Mile</a>
            </span>
        ),
        roles: ["bride_side", "all_access"]
    },
    {
        id: 7,
        title: "Chandni's Reception (The Bride)",
        date: "Jan 20, 2026",
        time: "6:30 PM Onwards",
        image: "/reception.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Lake+City+Six+Mile+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Lake City, Six Mile</a>
                <br />
                Reception hosted by the Bride's family.
            </span>
        ),
        roles: ["bride_side", "all_access"]
    },
    {
        id: 6,
        title: "The Nikah",
        date: "Jan 21, 2026",
        time: "10:00 AM",
        image: "/biya.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Lake+City+Six+Mile+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Lake City, Six Mile</a>
                <br />
                The Wedding Ceremony.
            </span>
        ),
        roles: ["all_access"]
    },
    {
        id: 5,
        title: "Jeeyan's Reception (The Groom)",
        date: "Jan 21, 2026",
        time: "6:30 PM - 10:00 PM",
        image: "/reception.jpg",
        desc: (
            <span>
                <strong>Location:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Lake+City+Six+Mile+Guwahati" target="_blank" rel="noopener noreferrer" className="underline text-cream font-bold hover:text-gold transition-colors">Lake City, Six Mile</a>
                <br />
                Reception hosted by Sameema Ahmed (Mother) and Arzish Ahmed (Brother).
            </span>
        ),
        roles: ["groom_side", "all_access"]
    }
];

const Timeline = ({ role, hasCocktailAccess }) => {
    const filteredEvents = events.filter(event => {
        // Events that require "Inner Circle" access for Bride's side
        const brideInnerCircleEvents = ["Mehendi", "Juroon - The Aagomon", "Biya - The Agni Saaxhi"];
        // Events that require "Inner Circle" access for Groom's side
        const groomInnerCircleEvents = [];

        // Default role check
        if (event.roles.includes(role)) {
            // Special Restriction: Bride's side guests need Secret Code for specific events
            if (role === "bride_side" && brideInnerCircleEvents.includes(event.title) && !hasCocktailAccess) {
                return false;
            }
            // Special Restriction: Groom's side guests need Secret Code for specific events
            if (role === "groom_side" && groomInnerCircleEvents.includes(event.title) && !hasCocktailAccess) {
                return false;
            }
            return true;
        }

        // Master Key: VIPs (Cocktail Access) see The Nikah (unless Groom side) and Cocktail
        if (hasCocktailAccess) {
            if (event.title === "Cocktail") return true;
            if (event.title === "The Nikah" && role !== 'groom_side') return true;
        }

        return false;
    });

    if (filteredEvents.length === 0) {
        return <div className="text-center py-10 text-cream/50">No events found for this invitation.</div>;
    }

    const isSingleEvent = filteredEvents.length === 1;

    return (
        <div className={`py-10 space-y-12 relative ${isSingleEvent ? 'max-w-4xl mx-auto' : ''}`}>
            {/* Vertical Line - Hidden if single event */}
            {!isSingleEvent && (
                <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gold/20 md:left-1/2 md:-translate-x-1/2" />
            )}

            {filteredEvents.map((event, index) => {
                const isImageEvent = !!event.image;

                return (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-6 md:gap-0 pl-12 md:pl-0 group 
                            ${isImageEvent ? 'rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-gold/20' : ''}
                            ${isSingleEvent ? 'scale-[1.02] ring-1 ring-gold/40 shadow-[0_0_40px_rgba(191,162,104,0.3)]' : ''}`}
                        style={isImageEvent ? {
                            backgroundImage: `url(${event.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        } : {}}
                    >
                        {/* Dark overlay for text readability on image events */}
                        {isImageEvent && <div className="absolute inset-0 bg-black/40" />}

                        {/* Dot */}
                        <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-gold ring-4 ring-burgundy shadow-[0_0_10px_rgba(191,162,104,0.5)] md:left-1/2 md:-translate-x-1/2 md:top-6 z-10" />

                        <div className="flex-1 md:px-10 z-10">
                            <div className={`space-y-2 p-8 rounded-2xl border shadow-xl transition-all duration-300
                                ${isImageEvent
                                    ? 'bg-burgundy/60 backdrop-blur-md border-white/20 text-white'
                                    : 'bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/15'
                                }`}>
                                <span className="inline-block px-3 py-1 text-[10px] font-bold text-burgundy bg-gold rounded-full tracking-wider uppercase shadow-sm">
                                    {event.date}
                                </span>
                                <h3 className={`text-2xl font-script drop-shadow-md ${isImageEvent ? 'text-white' : 'text-cream'}`}>{event.title}</h3>
                                <div className={`text-sm font-sans font-medium tracking-wide ${isImageEvent ? 'text-white/90' : 'text-cream/70'}`}>
                                    {event.time}
                                </div>
                                <p className={`text-sm font-sans leading-relaxed ${isImageEvent ? 'text-white/80' : 'text-cream/60'}`}>
                                    {event.desc}
                                </p>
                            </div>
                        </div>

                        {/* Content Logic: Image Placeholder or Spacer */}
                        {/* If it's an image event, we keep an empty div to maintain layout structure (letting background show) */}
                        {/* If it's NOT an image event, we just have a spacer */}
                        <div className={`flex-1 hidden md:block ${isImageEvent ? '' : ''}`}>
                            {/* Transparent spacer to let background image show through on the "image side" */}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Timeline;
