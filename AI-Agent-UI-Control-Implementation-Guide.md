# AI Agent Controlled Berry E-commerce UI - Implementation Guide

## 📋 Project Overview

This document outlines the implementation strategy for building an AI agent that can control a Berry e-commerce UI through natural language conversations and real-time tool calling.

### 🎯 Core Concept
- **AI Agent Backend**: Processes natural language and returns tool calls
- **Berry Frontend**: Executes tool calls to manipulate UI in real-time
- **Streaming Architecture**: Real-time bi-directional communication
- **Tool Calling System**: Structured function calls to control UI components

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    System Architecture                      │
├──────────────────────────────┬──────────────────────────────┤
│        FRONTEND              │         BACKEND              │
│                              │                              │
│  🖥️ Berry React UI           │   🤖 AI Agent Service       │
│  - Product catalog           │   - GenAI + Tool calling     │
│  - Shopping cart             │   - Natural language proc.   │
│  - Checkout flow             │   - Function call generation │
│  - Redux state mgmt          │   - Streaming responses      │
│                              │                              │
│  📡 Tool Call Executor       │   📡 Streaming API           │
│  - Function mapping          │   - Server-Sent Events       │
│  - UI manipulation           │   - WebSocket support        │
│  - Real-time updates         │   - Event-based responses    │
│                              │                              │
│  💬 Chat Interface           │   🧠 Context Management      │
│  - Message display           │   - Conversation state       │
│  - Streaming text            │   - User session tracking    │
│  - Function indicators       │   - Error handling          │
└──────────────────────────────┴──────────────────────────────┘
```

## 🛠️ Tool Calling System

### Tool Definition Structure
All available tools are defined in `berry-ecommerce-tools.json`. Each tool follows this schema:

```json
{
  "name": "tool_name",
  "description": "What this tool does",
  "parameters": {
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string|number|boolean|array|object",
        "enum": ["optional_enum_values"],
        "description": "Parameter description"
      }
    },
    "required": ["required_param_names"]
  }
}
```

### Core Tools Available
1. **navigate** - Page navigation and routing
2. **manage_products** - Product search, filtering, sorting
3. **manage_cart** - Shopping cart operations
4. **control_ui** - UI component control
5. **notify_user** - User notifications
6. **manage_comparison** - Product comparison
7. **manage_wishlist** - Wishlist operations
8. **checkout_operations** - Checkout process control

## 📡 API Communication Protocol

### 1. Chat Message Request Format

**Endpoint**: `POST /api/chat/stream`

```json
{
  "message": "Show me red handbags under $100",
  "conversation_id": "conv_123456",
  "user_id": "user_789",
  "session_id": "session_abc123",
  "timestamp": "2024-01-01T12:00:00Z",
  "metadata": {
    "user_agent": "Mozilla/5.0...",
    "current_page": "/products",
    "session_duration": 1200
  }
}
```

### 2. Streaming Response Events

The backend should stream events in **Server-Sent Events (SSE)** format or **WebSocket** with the following event types:

#### Event Base Structure
```json
{
  "event_id": "evt_unique_id",
  "conversation_id": "conv_123456", 
  "event_type": "text_chunk|function_call|thinking|function_result|complete|error",
  "timestamp": "2024-01-01T12:00:00Z",
  "data": { /* event specific data */ }
}
```

#### Text Chunk Event
```json
{
  "event_id": "evt_001",
  "conversation_id": "conv_123456",
  "event_type": "text_chunk",
  "timestamp": "2024-01-01T12:00:01Z",
  "data": {
    "chunk": "I'll show you red handbags under $100",
    "is_complete": false,
    "chunk_index": 0,
    "total_expected_chunks": null
  }
}
```

#### Function Call Event
```json
{
  "event_id": "evt_002",
  "conversation_id": "conv_123456", 
  "event_type": "function_call",
  "timestamp": "2024-01-01T12:00:02Z",
  "data": {
    "call_id": "call_001",
    "function": "navigate",
    "parameters": {
      "action": "go_to",
      "target": "products",
      "params": {
        "category": "handbags"
      }
    },
    "reasoning": "Navigating to handbags section to show relevant products",
    "confidence": 0.95
  }
}
```

#### Thinking Event
```json
{
  "event_id": "evt_003",
  "conversation_id": "conv_123456",
  "event_type": "thinking",
  "timestamp": "2024-01-01T12:00:03Z", 
  "data": {
    "step": "Analyzing user request for product filters...",
    "progress": 45,
    "substep": "Identifying color and price requirements",
    "estimated_completion_ms": 2000
  }
}
```

#### Function Result Event
```json
{
  "event_id": "evt_004",
  "conversation_id": "conv_123456",
  "event_type": "function_result", 
  "timestamp": "2024-01-01T12:00:04Z",
  "data": {
    "call_id": "call_001",
    "status": "success|error|timeout",
    "result": {
      "products_found": 12,
      "applied_filters": ["color: red", "price_max: 100"]
    },
    "execution_time_ms": 850,
    "error_message": null
  }
}
```

#### Stream Complete Event
```json
{
  "event_id": "evt_005", 
  "conversation_id": "conv_123456",
  "event_type": "complete",
  "timestamp": "2024-01-01T12:00:05Z",
  "data": {
    "total_functions": 2,
    "successful_functions": 2,
    "failed_functions": 0,
    "final_message": "I found 12 red handbags under $100 for you!",
    "execution_time_ms": 3500,
    "tokens_used": {
      "input": 45,
      "output": 120
    }
  }
}
```

#### Error Event
```json
{
  "event_id": "evt_006",
  "conversation_id": "conv_123456",
  "event_type": "error",
  "timestamp": "2024-01-01T12:00:06Z",
  "data": {
    "error_code": "FUNCTION_EXECUTION_FAILED",
    "error_message": "Failed to apply product filters",
    "function_call_id": "call_002", 
    "retry_possible": true,
    "suggested_action": "retry_with_different_params"
  }
}
```

## 🎬 Example Complete Interaction Flow

### User Request
**User**: *"Show me red handbags under $100 and add the first one to my cart"*

### Expected Streaming Response Sequence

```json
// 1. Initial thinking
{
  "event_type": "thinking",
  "data": {
    "step": "Understanding user request...", 
    "progress": 10
  }
}

// 2. Start text response
{
  "event_type": "text_chunk",
  "data": {
    "chunk": "I'll help you find red handbags under $100",
    "is_complete": false
  }
}

// 3. First function call - Navigate to products
{
  "event_type": "function_call",
  "data": {
    "call_id": "call_001",
    "function": "navigate", 
    "parameters": {
      "action": "go_to",
      "target": "products",
      "params": {"category": "handbags"}
    },
    "reasoning": "Going to handbags section"
  }
}

// 4. Continue text
{
  "event_type": "text_chunk",
  "data": {
    "chunk": " and add the first one to your cart.",
    "is_complete": false
  }
}

// 5. Second function call - Apply filters  
{
  "event_type": "function_call",
  "data": {
    "call_id": "call_002", 
    "function": "manage_products",
    "parameters": {
      "action": "filter",
      "filters": {
        "color": ["red"],
        "price_max": 100
      }
    },
    "reasoning": "Filtering for red color and price under $100"
  }
}

// 6. Third function call - Add to cart
{
  "event_type": "function_call",
  "data": {
    "call_id": "call_003",
    "function": "manage_cart", 
    "parameters": {
      "action": "add",
      "product_id": "first_result",
      "quantity": 1
    },
    "reasoning": "Adding the first matching handbag to cart"
  }
}

// 7. Notification
{
  "event_type": "function_call",
  "data": {
    "call_id": "call_004",
    "function": "notify_user",
    "parameters": {
      "message": "Added red Coach handbag to your cart!",
      "type": "success"
    }
  }
}

// 8. Complete text
{
  "event_type": "text_chunk", 
  "data": {
    "chunk": " Done! I found 12 red handbags and added the Coach Classic to your cart.",
    "is_complete": true
  }
}

// 9. Stream complete
{
  "event_type": "complete",
  "data": {
    "total_functions": 4,
    "successful_functions": 4,
    "execution_time_ms": 4200
  }
}
```

## 🔧 Frontend Implementation

### Tool Call Executor
```javascript
// Main tool execution handler
const executeToolCall = (toolCall) => {
  const { function: functionName, parameters, call_id } = toolCall;
  
  try {
    let result;
    switch(functionName) {
      case 'navigate':
        result = handleNavigation(parameters);
        break;
      case 'manage_products':
        result = handleProductManagement(parameters);
        break;
      case 'manage_cart':
        result = handleCartManagement(parameters);
        break;
      case 'control_ui':
        result = handleUIControl(parameters);
        break;
      case 'notify_user':
        result = handleNotification(parameters);
        break;
      default:
        throw new Error(`Unknown function: ${functionName}`);
    }
    
    // Send success result back to backend (optional)
    sendFunctionResult(call_id, 'success', result);
    
  } catch (error) {
    console.error(`Tool execution failed:`, error);
    sendFunctionResult(call_id, 'error', { error: error.message });
  }
};

// Navigation handler
const handleNavigation = ({ action, target, params = {} }) => {
  switch(action) {
    case 'go_to':
      if (target === 'products') {
        const path = params.category 
          ? `/apps/e-commerce/products?category=${params.category}`
          : '/apps/e-commerce/products';
        navigate(path);
        return { navigated_to: path };
      }
      // ... other navigation cases
      break;
  }
};

// Product management handler
const handleProductManagement = ({ action, search_query, filters, sort, view_type }) => {
  switch(action) {
    case 'search':
      dispatch(setSearchQuery(search_query));
      return { search_applied: search_query };
    case 'filter':
      dispatch(updateFilters(filters));
      dispatch(fetchFilteredProducts(filters));
      return { filters_applied: filters };
    // ... other cases
  }
};
```

### Streaming Event Handler
```javascript
// SSE connection for streaming events
const connectToAgentStream = (conversationId) => {
  const eventSource = new EventSource(`/api/chat/stream/${conversationId}`);
  
  eventSource.onmessage = (event) => {
    const streamEvent = JSON.parse(event.data);
    handleStreamEvent(streamEvent);
  };
  
  eventSource.onerror = (error) => {
    console.error('Stream error:', error);
    // Handle reconnection logic
  };
  
  return eventSource;
};

// Stream event processor
const handleStreamEvent = (event) => {
  switch(event.event_type) {
    case 'text_chunk':
      updateChatMessage(event.conversation_id, event.data.chunk);
      break;
      
    case 'thinking':
      showThinkingIndicator(event.data.step, event.data.progress);
      break;
      
    case 'function_call':
      showFunctionCallIndicator(event.data);
      executeToolCall(event.data);
      break;
      
    case 'complete':
      hideThinkingIndicator();
      markConversationComplete(event.conversation_id);
      break;
      
    case 'error':
      handleStreamError(event.data);
      break;
  }
};
```

## 🎨 UI Visual Indicators

### Chat Message Component
```javascript
const ChatMessage = ({ message, isStreaming, functionCalls = [] }) => {
  return (
    <div className="chat-message">
      <div className="message-text">
        {message.text}
        {isStreaming && <BlinkingCursor />}
      </div>
      
      {message.thinking && (
        <ThinkingIndicator 
          step={message.thinking.step}
          progress={message.thinking.progress}
        />
      )}
      
      <div className="function-calls">
        {functionCalls.map(call => (
          <FunctionCallIndicator 
            key={call.call_id}
            function={call.function}
            reasoning={call.reasoning}
            status={call.status}
          />
        ))}
      </div>
    </div>
  );
};
```

### Function Call Indicator
```javascript
const FunctionCallIndicator = ({ function: funcName, reasoning, status = 'pending' }) => {
  const getIcon = () => {
    switch(funcName) {
      case 'navigate': return <NavigationIcon />;
      case 'manage_products': return <FilterIcon />;
      case 'manage_cart': return <ShoppingCartIcon />;
      default: return <FunctionIcon />;
    }
  };
  
  return (
    <div className={`function-indicator status-${status}`}>
      {getIcon()}
      <span className="reasoning">{reasoning}</span>
      {status === 'executing' && <Spinner size="xs" />}
      {status === 'complete' && <CheckCircleIcon color="success" />}
      {status === 'error' && <ErrorIcon color="error" />}
    </div>
  );
};
```

## 🔐 Security Considerations

### Input Validation
```javascript
// Validate tool call parameters
const validateToolCall = (functionName, parameters) => {
  const toolSchema = getToolSchema(functionName);
  if (!toolSchema) {
    throw new Error(`Invalid function: ${functionName}`);
  }
  
  // Validate parameters against schema
  const validation = validateParams(parameters, toolSchema.parameters);
  if (!validation.valid) {
    throw new Error(`Invalid parameters: ${validation.errors}`);
  }
  
  return true;
};

// Sanitize user inputs
const sanitizeInput = (input) => {
  // Remove potentially harmful content
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

### Rate Limiting
```javascript
// Implement rate limiting for API calls
const rateLimiter = {
  maxRequests: 60, // per minute
  windowMs: 60000,
  requests: new Map(),
  
  checkLimit(userId) {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      throw new Error('Rate limit exceeded');
    }
    
    validRequests.push(now);
    this.requests.set(userId, validRequests);
    return true;
  }
};
```

## 📊 Error Handling & Recovery

### Backend Error Responses
```json
{
  "event_type": "error",
  "data": {
    "error_code": "RATE_LIMIT_EXCEEDED|INVALID_FUNCTION|EXECUTION_TIMEOUT|INTERNAL_ERROR",
    "error_message": "Human readable error message", 
    "retry_possible": true,
    "retry_after_ms": 5000,
    "suggested_action": "wait_and_retry|modify_request|contact_support"
  }
}
```

### Frontend Error Handling
```javascript
const handleStreamError = (errorData) => {
  switch(errorData.error_code) {
    case 'RATE_LIMIT_EXCEEDED':
      showNotification({
        message: 'Too many requests. Please wait a moment.',
        type: 'warning',
        duration: errorData.retry_after_ms
      });
      break;
      
    case 'FUNCTION_EXECUTION_FAILED':
      showNotification({
        message: 'Action failed. Please try again.',
        type: 'error'
      });
      break;
      
    default:
      showNotification({
        message: 'Something went wrong. Please refresh and try again.',
        type: 'error'
      });
  }
};
```

## 🚀 Deployment & Infrastructure

### Backend Requirements
- **GenAI Integration**: OpenAI, Anthropic Claude, or similar
- **Streaming Support**: SSE or WebSocket capability
- **Session Management**: Redis or similar for conversation state
- **Rate Limiting**: Redis-based rate limiting
- **Monitoring**: Request/response logging and metrics

### Frontend Integration
- **Berry Template**: Use full-version as base
- **Redux Toolkit**: For state management
- **WebSocket/SSE**: For real-time communication
- **Error Boundaries**: React error handling
- **Performance**: Code splitting and lazy loading

## 📈 Testing Strategy

### Unit Tests
- Tool call validation
- Function execution handlers
- Stream event processing
- Error handling

### Integration Tests  
- End-to-end conversation flows
- Multi-step tool calling sequences
- Error recovery scenarios
- Performance benchmarks

### User Testing
- Natural language understanding accuracy
- UI responsiveness during tool calls
- Error message clarity
- Overall user experience

## 🔄 Future Enhancements

### Phase 2: UI Context Awareness
- Track user interactions
- Contextual AI responses
- Proactive suggestions
- Behavioral analytics

### Phase 3: Advanced Features
- Voice input/output
- Multi-modal interactions
- Personalization
- Analytics dashboard

---

## 📞 Support & Contact

For technical questions or implementation support, please refer to:
- Tool definitions: `berry-ecommerce-tools.json`
- Berry documentation: `ui-usage-doc/` folder
- This implementation guide

---

*Last updated: 2024-01-01*
*Version: 1.0.0* 