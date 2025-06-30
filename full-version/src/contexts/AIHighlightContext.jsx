import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const AIHighlightContext = createContext();

// Highlight types and styles
export const HIGHLIGHT_TYPES = {
    RECOMMENDATION: 'recommendation',
    COMPARISON: 'comparison', 
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success'
};

export const HIGHLIGHT_STYLES = {
    GLOW: 'glow',
    PULSE: 'pulse',
    SPOTLIGHT: 'spotlight',
    ARROW: 'arrow',
    BOUNCE: 'bounce'
};

// Provider component
export const AIHighlightProvider = ({ children }) => {
    const [highlights, setHighlights] = useState([]);
    const [isHighlightMode, setIsHighlightMode] = useState(false);

    // Add a highlight to an element (clears previous highlights first)
    const addHighlight = useCallback((elementId, options = {}) => {
        // Clear any existing highlights first (one at a time)
        setHighlights([]);
        
        const highlight = {
            id: Date.now(),
            elementId,
            type: options.type || HIGHLIGHT_TYPES.RECOMMENDATION,
            style: options.style || HIGHLIGHT_STYLES.GLOW,
            message: options.message || '',
            duration: options.duration || 5000, // 5 seconds default
            persistent: options.persistent || false,
            color: options.color || 'primary',
            intensity: options.intensity || 'medium', // low, medium, high
            createdAt: Date.now()
        };

        setHighlights([highlight]); // Only one highlight at a time
        setIsHighlightMode(true);

        // Auto-scroll to the highlighted element
        setTimeout(() => {
            const element = document.querySelector(`[data-highlight-id="${elementId}"]`);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }, 100); // Small delay to ensure element is rendered

        // Auto-remove non-persistent highlights
        if (!highlight.persistent && highlight.duration > 0) {
            setTimeout(() => {
                removeHighlight(highlight.id);
            }, highlight.duration);
        }

        return highlight.id;
    }, []);

    // Remove a specific highlight
    const removeHighlight = useCallback((highlightId) => {
        setHighlights(prev => {
            const newHighlights = prev.filter(h => h.id !== highlightId);
            if (newHighlights.length === 0) {
                setIsHighlightMode(false);
            }
            return newHighlights;
        });
    }, []);

    // Clear all highlights
    const clearAllHighlights = useCallback(() => {
        setHighlights([]);
        setIsHighlightMode(false);
    }, []);

    // Get highlights for a specific element
    const getElementHighlights = useCallback((elementId) => {
        return highlights.filter(h => h.elementId === elementId);
    }, [highlights]);



    // Highlight products by filter criteria
    const highlightProductsByCriteria = useCallback((criteria, options = {}) => {
        // This would be called with criteria like category, price range, rating, etc.
        // For now, return a function that components can use
        return { criteria, options };
    }, []);

    const value = {
        highlights,
        isHighlightMode,
        addHighlight,
        removeHighlight,
        clearAllHighlights,
        getElementHighlights,
        highlightProductsByCriteria,
        // Helper methods
        highlightRecommendation: (elementId, message, options = {}) => 
            addHighlight(elementId, { 
                ...options, 
                type: HIGHLIGHT_TYPES.RECOMMENDATION, 
                message,
                style: HIGHLIGHT_STYLES.GLOW,
                color: 'success'
            }),
        highlightComparison: (elementId, message, options = {}) => 
            addHighlight(elementId, { 
                ...options, 
                type: HIGHLIGHT_TYPES.COMPARISON, 
                message,
                style: HIGHLIGHT_STYLES.PULSE,
                color: 'info'
            }),
        highlightWarning: (elementId, message, options = {}) => 
            addHighlight(elementId, { 
                ...options, 
                type: HIGHLIGHT_TYPES.WARNING, 
                message,
                style: HIGHLIGHT_STYLES.BOUNCE,
                color: 'warning'
            })
    };

    return (
        <AIHighlightContext.Provider value={value}>
            {children}
        </AIHighlightContext.Provider>
    );
};

// Hook to use the highlight context
export const useAIHighlight = () => {
    const context = useContext(AIHighlightContext);
    if (!context) {
        throw new Error('useAIHighlight must be used within an AIHighlightProvider');
    }
    return context;
};

export default AIHighlightContext; 