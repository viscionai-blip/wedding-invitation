import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InvitePage from './components/InvitePage';
import CocktailCard from './components/CocktailCard';

function App() {
    // Initialize state from localStorage if available
    const [guest, setGuest] = useState(() => {
        const savedGuest = localStorage.getItem('wedding_guest');
        return savedGuest ? JSON.parse(savedGuest) : null;
    });

    const handleLogin = (guestData) => {
        setGuest(guestData);
        localStorage.setItem('wedding_guest', JSON.stringify(guestData));
    };

    const handleLogout = () => {
        setGuest(null);
        localStorage.removeItem('wedding_guest');
    };

    // Simple Route Check for Print Card
    if (window.location.pathname.includes('/cocktail-card')) {
        return <CocktailCard />;
    }

    return (
        <div className="min-h-screen font-sans text-charcoal antialiased selection:bg-flamenco/20 bg-gradient-to-br from-burgundy via-[#2d0202] to-black">
            {/* Mobile-first centered container */}
            <div className="mx-auto max-w-md min-h-screen relative shadow-2xl overflow-hidden bg-transparent">
                {!guest ? (
                    <LandingPage onLogin={handleLogin} />
                ) : (
                    <InvitePage guest={guest} onLogout={handleLogout} />
                )}
            </div>
        </div>
    );
}

export default App;
