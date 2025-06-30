import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

// project imports
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useAIProductFilter } from 'contexts/AIProductFilterContext';
import { useAIHighlight, HIGHLIGHT_STYLES, HIGHLIGHT_TYPES } from 'contexts/AIHighlightContext';

// assets
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavigationIcon from '@mui/icons-material/Navigation';

// chat width
const drawerWidth = 360;

// ==============================|| AI ASSISTANT ACTION COMPONENTS ||============================== //

const UserMessage = ({ message, timestamp }) => {
    const theme = useTheme();
    const { mode } = useConfig();

    return (
        <ListItem sx={{ py: 1, px: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ maxWidth: '85%' }}>
                <Paper
                    sx={{
                        p: 1.5,
                        bgcolor: mode === ThemeMode.DARK ? 'primary.dark' : 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: '16px 16px 4px 16px',
                        minWidth: '120px'
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {message}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
                        {timestamp}
                    </Typography>
                </Paper>
                <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main' }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                </Avatar>
            </Stack>
        </ListItem>
    );
};

const AITextResponse = ({ message, timestamp }) => {
    const theme = useTheme();
    const { mode } = useConfig();

    return (
        <ListItem sx={{ py: 1, px: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ width: '100%' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', mt: 0.5 }}>
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        sx={{
                            p: 2,
                            bgcolor: mode === ThemeMode.DARK ? 'grey.900' : 'background.paper',
                            border: `1px solid ${mode === ThemeMode.DARK ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                            borderRadius: '12px',
                            boxShadow: mode === ThemeMode.DARK ? 'none' : '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                    >
                        <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
                            {message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', mt: 1, display: 'block' }}>
                            {timestamp}
                        </Typography>
                    </Paper>
                </Box>
            </Stack>
        </ListItem>
    );
};

const ActionCard = ({ action, status = 'executing', timestamp }) => {
    const theme = useTheme();
    const { mode } = useConfig();

    const getActionIcon = (actionName) => {
        switch (actionName) {
            case 'searching': return <SearchIcon sx={{ fontSize: 18 }} />;
            case 'filtering': return <FilterListIcon sx={{ fontSize: 18 }} />;
            case 'navigating': return <NavigationIcon sx={{ fontSize: 18 }} />;
            case 'adding_to_cart': return <ShoppingCartIcon sx={{ fontSize: 18 }} />;
            default: return <SearchIcon sx={{ fontSize: 18 }} />;
        }
    };

    const getActionText = (actionName) => {
        switch (actionName) {
            case 'searching': return 'Searching for products';
            case 'filtering': return 'Applying filters';
            case 'navigating': return 'Navigating to page';
            case 'adding_to_cart': return 'Adding to cart';
            default: return 'Processing';
        }
    };

    return (
        <ListItem sx={{ py: 1, px: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Paper
                    sx={{
                        p: 2,
                        bgcolor: mode === ThemeMode.DARK ? 'primary.dark' : 'primary.light',
                        border: `1px solid ${mode === ThemeMode.DARK ? 'primary.main' : 'primary.main'}`,
                        borderRadius: '16px',
                        minWidth: '200px',
                        textAlign: 'center'
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        <Box sx={{ 
                            p: 1, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {getActionIcon(action)}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {getActionText(action)}
                        </Typography>
                        {status === 'executing' && (
                            <Box sx={{ 
                                width: 16, 
                                height: 16,
                                border: '2px solid transparent',
                                borderTop: '2px solid',
                                borderTopColor: 'primary.main',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                '@keyframes spin': {
                                    '0%': { transform: 'rotate(0deg)' },
                                    '100%': { transform: 'rotate(360deg)' }
                                }
                            }} />
                        )}
                    </Stack>
                </Paper>
            </Box>
        </ListItem>
    );
};

const ActionMessage = ({ type, message, isUser, timestamp, action, status, result }) => {
    if (isUser) {
        return <UserMessage message={message} timestamp={timestamp} />;
    }
    
    if (action) {
        return <ActionCard action={action} status={status} timestamp={timestamp} />;
    }
    
    return <AITextResponse message={message} timestamp={timestamp} />;
};

ActionMessage.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    isUser: PropTypes.bool,
    timestamp: PropTypes.string.isRequired,
    action: PropTypes.string,
    status: PropTypes.string,
    result: PropTypes.string
};

UserMessage.propTypes = {
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
};

AITextResponse.propTypes = {
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
};

ActionCard.propTypes = {
    action: PropTypes.string.isRequired,
    status: PropTypes.string,
    timestamp: PropTypes.string.isRequired
};

// ==============================|| AI CHAT SIDEBAR ||============================== //

const AIChatSidebar = ({ open, onToggle }) => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const { mode } = useConfig();
    const navigate = useNavigate();
    const { applyCategoryFilter, applySearchFilter, resetFilters } = useAIProductFilter();
    const { highlightRecommendation, clearAllHighlights } = useAIHighlight();
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai_response',
            message: "Hi! I'm your shopping assistant. Ask me to find products, check your cart, or apply filters and I'll help you out! 🛍️",
            isUser: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const userMessage = {
                id: Date.now(),
                type: 'user_message',
                message: message.trim(),
                isUser: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, userMessage]);
            const userInput = message.trim().toLowerCase();
            console.log('AI Assistant: Processing user input:', userInput);
            setMessage('');
            
            // Simple AI responses with action cards
            setTimeout(() => {
                // CART NAVIGATION - Check this FIRST before search to avoid conflicts
                if (userInput.includes('cart') || userInput.includes('checkout') || userInput.includes('check my cart') || userInput.includes('show my cart') || userInput.includes('open cart') || userInput.includes('go to cart')) {
                    console.log('AI Assistant: Cart condition triggered!');
                    // Initial response
                    const initialResponse = {
                        id: Date.now() + 1,
                        type: 'ai_response',
                        message: "Sure! Let me check your cart for you.",
                        isUser: false,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, initialResponse]);

                    // Show action card
                    setTimeout(() => {
                        const actionCard = {
                            id: Date.now() + 2,
                            type: 'action_card',
                            action: 'navigating',
                            status: 'executing',
                            isUser: false,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages(prev => [...prev, actionCard]);

                        // Complete action
                        setTimeout(() => {
                            // **REAL ACTION**: Navigate to cart/checkout page
                            console.log('AI Assistant: Navigating to cart/checkout page...');
                            try {
                                navigate('/apps/e-commerce/checkout');
                                console.log('AI Assistant: Navigation completed successfully');
                            } catch (error) {
                                console.error('AI Assistant: Navigation failed:', error);
                            }

                            setMessages(prev => prev.map(msg => 
                                msg.id === actionCard.id ? { ...msg, status: 'completed' } : msg
                            ));

                            // Final response
                            setTimeout(() => {
                                const finalResponse = {
                                    id: Date.now() + 3,
                                    type: 'ai_response',
                                    message: "Here's your cart! You can see all your items and proceed to checkout.",
                                    isUser: false,
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                };
                                setMessages(prev => [...prev, finalResponse]);
                            }, 500);
                        }, 800);
                    }, 600);

                } else if (userInput.includes('electronics') || userInput.includes('electronic')) {
                    // Initial response
                    const initialResponse = {
                        id: Date.now() + 1,
                        type: 'ai_response',
                        message: "Yeah! I can help you with that. Let me filter the products for you.",
                        isUser: false,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, initialResponse]);

                    // Show action card
                    setTimeout(() => {
                        const actionCard = {
                            id: Date.now() + 2,
                            type: 'action_card',
                            action: 'filtering',
                            status: 'executing',
                            isUser: false,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages(prev => [...prev, actionCard]);

                        // Complete action and add result
                        setTimeout(() => {
                            // **REAL ACTION**: Apply electronics filter
                            applyCategoryFilter('electronics');
                            
                            // Navigate to products page if not already there
                            if (window.location.pathname !== '/apps/e-commerce/products') {
                                navigate('/apps/e-commerce/products');
                            }

                            setMessages(prev => prev.map(msg => 
                                msg.id === actionCard.id ? { ...msg, status: 'completed' } : msg
                            ));

                            // Final response
                            setTimeout(() => {
                                const finalResponse = {
                                    id: Date.now() + 3,
                                    type: 'ai_response',
                                    message: "I've filtered the products to show electronics. You can see the updated list in the main area!",
                                    isUser: false,
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                };
                                setMessages(prev => [...prev, finalResponse]);
                            }, 500);
                        }, 1500);
                    }, 800);

                } else if (userInput.includes('search') || userInput.includes('find') || userInput.includes('show')) {
                    // Initial response
                    const initialResponse = {
                        id: Date.now() + 1,
                        type: 'ai_response',
                        message: "Yeah! I can help you with that. Let me search for you.",
                        isUser: false,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, initialResponse]);

                    // Show action card
                    setTimeout(() => {
                        const actionCard = {
                            id: Date.now() + 2,
                            type: 'action_card',
                            action: 'searching',
                            status: 'executing',
                            isUser: false,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages(prev => [...prev, actionCard]);

                        // Complete action and add result
                        setTimeout(() => {
                            // **REAL ACTION**: Apply search filter based on user input
                            const searchTerms = userInput.replace(/find|search|show/g, '').trim();
                            if (searchTerms) {
                                applySearchFilter(searchTerms);
                            }
                            
                            // Navigate to products page if not already there
                            if (window.location.pathname !== '/apps/e-commerce/products') {
                                navigate('/apps/e-commerce/products');
                            }

                            setMessages(prev => prev.map(msg => 
                                msg.id === actionCard.id ? { ...msg, status: 'completed' } : msg
                            ));

                            // Final response
                            setTimeout(() => {
                                const finalResponse = {
                                    id: Date.now() + 3,
                                    type: 'ai_response',
                                    message: "I've searched the products for you! Hope you can see the results in the main area.",
                                    isUser: false,
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                };
                                setMessages(prev => [...prev, finalResponse]);
                            }, 500);
                        }, 2000);
                    }, 800);

                } else if (userInput.includes('recommend') || userInput.includes('suggest') || userInput.includes('best') || userInput.includes('which product')) {
                    // Product Recommendation with Highlighting
                    const initialResponse = {
                        id: Date.now() + 1,
                        type: 'ai_response',
                        message: "Sure! I can suggest some great products for you. Let me highlight my recommendations.",
                        isUser: false,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, initialResponse]);

                    // Show action card
                    setTimeout(() => {
                        const actionCard = {
                            id: Date.now() + 2,
                            type: 'action_card',
                            action: 'searching',
                            status: 'executing',
                            isUser: false,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages(prev => [...prev, actionCard]);

                        // Complete action and highlight products
                        setTimeout(() => {
                            // **REAL ACTION**: Navigate to products page if not already there
                            if (window.location.pathname !== '/apps/e-commerce/products') {
                                navigate('/apps/e-commerce/products');
                            }

                            setMessages(prev => prev.map(msg => 
                                msg.id === actionCard.id ? { ...msg, status: 'completed' } : msg
                            ));

                            // **HIGHLIGHT PRODUCT**: Highlight one recommended product
                            setTimeout(() => {
                                // Clear any existing highlights and highlight the top recommendation
                                highlightRecommendation('product-1', '✨ My Top Pick!', {
                                    style: HIGHLIGHT_STYLES.GLOW,
                                    intensity: 'high',
                                    duration: 12000 // 12 seconds to give user time to see it
                                });

                                // Final response
                                const finalResponse = {
                                    id: Date.now() + 3,
                                    type: 'ai_response',
                                    message: "✨ I've highlighted my top recommendation with a beautiful gradient glow! Look for the product with the animated purple-blue border - it's my best pick based on quality and value! The page will automatically scroll to show it.",
                                    isUser: false,
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                };
                                setMessages(prev => [...prev, finalResponse]);
                            }, 800);
                        }, 1500);
                    }, 600);

                } else {
                    // Default AI response
                    const aiResponse = {
                        id: Date.now() + 1,
                        type: 'ai_response',
                        message: "I'd be happy to help! Try asking me to 'show electronics', 'find headphones', 'recommend products', or 'check cart' and I'll get that done for you.",
                        isUser: false,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, aiResponse]);
                }
            }, 500);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Drawer
            anchor="right"
            variant="persistent"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    mt: downMD ? 0 : 11, // Responsive positioning - same as left sidebar
                    height: downMD ? '100vh' : 'calc(100vh - 88px)', // Responsive height
                    borderLeft: `1px solid ${mode === ThemeMode.DARK ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'background.default'
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: `1px solid ${mode === ThemeMode.DARK ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        bgcolor: mode === ThemeMode.DARK ? 'dark.dark' : 'background.paper'
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            <SmartToyIcon sx={{ fontSize: 22 }} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                AI Shopping Agent
                            </Typography>
                            <Chip 
                                label="Online" 
                                size="small" 
                                color="success" 
                                sx={{ fontSize: '0.7rem', height: 18 }}
                            />
                        </Box>
                        {onToggle && (
                            <IconButton
                                onClick={onToggle}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        bgcolor: 'action.hover'
                                    }
                                }}
                                title="Close AI Shopping Agent"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Stack>
                </Box>

                {/* Messages Area */}
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <PerfectScrollbar style={{ height: '100%' }}>
                        <List sx={{ p: 0 }}>
                            {messages.map((msg) => (
                                <ActionMessage
                                    key={msg.id}
                                    type={msg.type}
                                    message={msg.message}
                                    isUser={msg.isUser}
                                    timestamp={msg.timestamp}
                                    action={msg.action}
                                    status={msg.status}
                                    result={msg.result}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </List>
                    </PerfectScrollbar>
                </Box>

                {/* Quick Action Buttons */}
                <Box
                    sx={{
                        p: 1.5,
                        borderTop: `1px solid ${mode === ThemeMode.DARK ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        bgcolor: mode === ThemeMode.DARK ? 'dark.dark' : 'background.paper'
                    }}
                >
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Quick Actions:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip
                            label="Show Electronics"
                            size="small"
                            onClick={() => setMessage('show electronics')}
                            sx={{ fontSize: '0.7rem' }}
                        />
                        <Chip
                            label="Recommend Products"
                            size="small"
                            onClick={() => setMessage('recommend products')}
                            sx={{ fontSize: '0.7rem' }}
                        />
                        <Chip
                            label="Check Cart"
                            size="small"
                            onClick={() => setMessage('show my cart')}
                            sx={{ fontSize: '0.7rem' }}
                        />
                    </Stack>
                </Box>

                {/* Input Area */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: `1px solid ${mode === ThemeMode.DARK ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        bgcolor: mode === ThemeMode.DARK ? 'dark.dark' : 'background.paper'
                    }}
                >
                    <OutlinedInput
                        fullWidth
                        multiline
                        maxRows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Try: 'Show me electronics' or 'Find headphones under $50'..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    color="primary"
                                    sx={{
                                        bgcolor: message.trim() ? 'primary.main' : 'grey.300',
                                        color: message.trim() ? 'primary.contrastText' : 'grey.500',
                                        '&:hover': {
                                            bgcolor: message.trim() ? 'primary.dark' : 'grey.400'
                                        },
                                        borderRadius: '50%',
                                        width: 36,
                                        height: 36
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: mode === ThemeMode.DARK ? 'grey.800' : 'background.default'
                            }
                        }}
                    />
                    
                    {/* Quick Actions */}
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip
                            label="Show electronics"
                            size="small"
                            variant="outlined"
                            onClick={() => setMessage("Show me electronics")}
                            sx={{ fontSize: '0.7rem' }}
                            icon={<FilterListIcon sx={{ fontSize: 14 }} />}
                        />
                        <Chip
                            label="Find headphones"
                            size="small"
                            variant="outlined"
                            onClick={() => setMessage("find headphones")}
                            sx={{ fontSize: '0.7rem' }}
                            icon={<SearchIcon sx={{ fontSize: 14 }} />}
                        />
                        <Chip
                            label="Check cart"
                            size="small"
                            variant="outlined"
                            onClick={() => setMessage("Show my cart")}
                            sx={{ fontSize: '0.7rem' }}
                            icon={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
                        />
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    );
};

AIChatSidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func
};

export default AIChatSidebar; 