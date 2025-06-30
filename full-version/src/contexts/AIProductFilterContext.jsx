import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// ==============================|| AI PRODUCT FILTER CONTEXT ||============================== //

const AIProductFilterContext = createContext({});

export const useAIProductFilter = () => {
    const context = useContext(AIProductFilterContext);
    if (!context) {
        throw new Error('useAIProductFilter must be used within AIProductFilterProvider');
    }
    return context;
};

// ==============================|| AI PRODUCT FILTER PROVIDER ||============================== //

export const AIProductFilterProvider = ({ children }) => {
    // Global filter state that can be accessed by both AI chat and products page
    const [globalFilter, setGlobalFilter] = useState({
        search: '',
        sort: 'low',
        gender: [],
        categories: ['all'],
        colors: [],
        price: '',
        rating: 0
    });

    // Function to update filters from AI chat
    const updateFilterFromAI = (filterUpdate) => {
        setGlobalFilter(prev => ({
            ...prev,
            ...filterUpdate
        }));
    };

    // Function to apply specific category filter
    const applyCategoryFilter = (category) => {
        setGlobalFilter(prev => ({
            ...prev,
            categories: [category]
        }));
    };

    // Function to apply price range filter
    const applyPriceFilter = (priceRange) => {
        setGlobalFilter(prev => ({
            ...prev,
            price: priceRange
        }));
    };

    // Function to apply search filter
    const applySearchFilter = (searchTerm) => {
        setGlobalFilter(prev => ({
            ...prev,
            search: searchTerm
        }));
    };

    // Function to apply rating filter
    const applyRatingFilter = (rating) => {
        setGlobalFilter(prev => ({
            ...prev,
            rating: rating
        }));
    };

    // Function to reset all filters
    const resetFilters = () => {
        setGlobalFilter({
            search: '',
            sort: 'low',
            gender: [],
            categories: ['all'],
            colors: [],
            price: '',
            rating: 0
        });
    };

    const value = {
        globalFilter,
        setGlobalFilter,
        updateFilterFromAI,
        applyCategoryFilter,
        applyPriceFilter,
        applySearchFilter,
        applyRatingFilter,
        resetFilters
    };

    return <AIProductFilterContext.Provider value={value}>{children}</AIProductFilterContext.Provider>;
};

AIProductFilterProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 