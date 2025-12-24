import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const RSVP = () => {
    const [response, setResponse] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("RSVP:", { response, message });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center shadow-lg border border-white/10 flex flex-col items-center">
                <CheckCircle size={48} className="text-sage mb-4" />
                <h3 className="font-script text-4xl text-white mb-2">Thank You!</h3>
                <p className="font-sans text-sm text-white/70">Your response has been recorded.</p>
            </div>
        );
    }

    return (
        <div className="bg-burgundy/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gold/20">
            <h3 className="font-sans text-2xl text-cream mb-8 text-center drop-shadow-md tracking-[0.3em] font-medium">R.S.V.P</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4 justify-center">
                    <label className={`flex-1 cursor-pointer py-4 px-2 rounded-xl border text-center font-sans text-xs md:text-sm font-bold tracking-wide transition-all shadow-sm flex flex-col items-center justify-center gap-1
                    ${response === 'yes'
                            ? 'bg-sage text-white border-sage scale-105 shadow-md'
                            : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'}`}>
                        <input
                            type="radio"
                            name="rsvp"
                            value="yes"
                            className="hidden"
                            onChange={(e) => setResponse(e.target.value)}
                        />
                        <span>Joyfully</span>
                        <span>Accept</span>
                    </label>
                    <label className={`flex-1 cursor-pointer py-4 px-2 rounded-xl border text-center font-sans text-xs md:text-sm font-bold tracking-wide transition-all shadow-sm flex flex-col items-center justify-center gap-1
                    ${response === 'no'
                            ? 'bg-charcoal text-white border-charcoal scale-105 shadow-md'
                            : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'}`}>
                        <input
                            type="radio"
                            name="rsvp"
                            value="no"
                            className="hidden"
                            onChange={(e) => setResponse(e.target.value)}
                        />
                        <span>Regretfully</span>
                        <span>Decline</span>
                    </label>
                </div>

                <textarea
                    placeholder="Leave a message for the couple..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 p-4 rounded-xl border border-white/10 bg-black/20 text-white placeholder:text-white/40 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage/50 text-sm font-sans resize-none shadow-inner transition-colors"
                />

                <button
                    type="submit"
                    disabled={!response}
                    className="w-full py-4 bg-gradient-to-r from-sage to-mint hover:from-[#7A8F86] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-sans text-sm font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                >
                    Start The Celebration
                    <Send size={14} />
                </button>
            </form>
        </div>
    );
};

export default RSVP;
