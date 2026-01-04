import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InvitePage from './components/InvitePage';
import CocktailCard from './components/CocktailCard';

function App() {
    // Initialize state from localStorage if available
    // Initialize state from localStorage if available
    const [guest, setGuest] = useState(() => {
        const savedGuest = localStorage.getItem('wedding_guest');
        if (!savedGuest) return null;

        try {
            const parsed = JSON.parse(savedGuest);
            const path = window.location.pathname.toLowerCase();

            // Strict Session Validation Logic
            // If the URL dictates a specific role/access, we must ensure the stored session matches.
            // If not, we invalidate it to force a "re-login" (which will auto-login via LandingPage logic).

            // 1. Special Groom Link
            if (path.includes('jeeyan-squad1')) {
                if (parsed.role !== 'groom_special') {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
            }
            // 2. Squad Links
            else if (path.includes('-squad')) {
                if (!parsed.hasCocktailAccess) {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
                // Check side consistency
                if (path.includes('jeeyan') && parsed.role !== 'groom_side') {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
                if (path.includes('chandni') && parsed.role !== 'bride_side') {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
            }
            // 3. Standard Links (Strict Downgrade)
            else if (path.includes('jeeyan')) { // /jeeyan but not squad or squad1
                if (parsed.role !== 'groom_side' || parsed.hasCocktailAccess) {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
            }
            else if (path.includes('chandni')) { // /chandni but not squad
                if (parsed.role !== 'bride_side' || parsed.hasCocktailAccess) {
                    localStorage.removeItem('wedding_guest');
                    return null;
                }
            }

            return parsed;
        } catch (e) {
            localStorage.removeItem('wedding_guest');
            return null;
        }
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
