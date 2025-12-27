import React from 'react';
import { Wine, MapPin, Clock, Calendar } from 'lucide-react';

const CocktailCard = () => {
    return (
        <div className="min-h-screen bg-black text-gold flex flex-col items-center justify-center p-8 text-center bg-[url('/venue_bg.jpg')] bg-cover bg-center bg-no-repeat relative">
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/80"></div>

            <div className="relative z-10 border-2 border-gold/40 p-8 md:p-12 max-w-lg w-full bg-black/40 backdrop-blur-sm rounded-xl box-border">
                {/* Decorative Element */}
                <div className="mb-6 flex justify-center text-gold">
                    <Wine size={48} strokeWidth={1} />
                </div>

                <h1 className="text-4xl md:text-5xl font-script mb-2 text-cream">Cocktail Night</h1>
                <p className="text-sm md:text-base uppercase tracking-widest text-white/60 mb-8 font-sans">Let's Get The Party Started</p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8"></div>

                <div className="space-y-6 font-sans text-white/90">
                    <div className="flex flex-col items-center gap-1">
                        <Calendar className="text-gold mb-1" size={20} />
                        <span className="text-lg font-semibold">January 10, 2026</span>
                        <span className="text-sm text-white/50">Saturday</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Clock className="text-gold mb-1" size={20} />
                        <span className="text-lg font-semibold">5:00 PM Onwards</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <MapPin className="text-gold mb-1" size={20} />
                        <span className="text-lg font-semibold">Amchang Farmhouse</span>
                        <span className="text-sm text-white/50">Guwahati</span>
                    </div>

                    <div className="mt-4 text-xs text-white/40 pt-4 border-t border-white/10">
                        Dress Code: Black
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-8 mb-6"></div>

                <p className="font-script text-2xl text-cream">Jeeyan & Chandni</p>
            </div>

            {/* Print Instruction - Visible on screen, hidden in print (optional, but handled via CSS usually) */}
            <div className="absolute bottom-4 text-white/20 text-xs font-sans print:hidden">
                Press Ctrl+P (Cmd+P) to Save as PDF
            </div>
        </div>
    );
};

export default CocktailCard;
