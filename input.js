// Input component logic

let inputElement;
let submitButton;

function initInput() {
  inputElement = document.getElementById('bottomInput');
  submitButton = document.getElementById('submitButton');
  
  if (!inputElement) {
    console.warn('Input element not found');
    return;
  }
  
  if (!submitButton) {
    console.warn('Submit button not found');
    return;
  }
  
  // Add event listeners
  inputElement.addEventListener('keydown', handleKeyDown);
  inputElement.addEventListener('input', handleInput);
  inputElement.addEventListener('focus', handleFocus);
  inputElement.addEventListener('blur', handleBlur);
  
  // Add submit button event listener
  submitButton.addEventListener('click', handleSubmit);
}

function handleKeyDown(event) {
  // Handle Enter key
  if (event.key === 'Enter') {
    handleSubmit();
  }
  
  // Handle Escape key
  if (event.key === 'Escape') {
    inputElement.blur();
  }
}

function handleSubmit() {
  const value = inputElement.value.trim();
  if (value) {
    processInput(value);
    inputElement.value = '';
  }
}

function handleInput(event) {
  // Could add real-time input processing here
  // For example: auto-complete, validation, etc.
}

function handleFocus(event) {
  // Input focused - could pause animations or change behavior
}

function handleBlur(event) {
  // Input lost focus - could resume animations
}

async function processInput(value) {
  // Save message to JSON file with timestamp
  const message = {
    text: value,
    timestamp: new Date().toISOString()
  };
  
  try {
    await saveMessageToFile(message);
    console.log('Message saved:', message);
    showStatusMessage('success', 'success');
  } catch (error) {
    console.error('Failed to save message:', error);
    showStatusMessage('error', 'error');
  }
}

async function saveMessageToFile(message) {
  try {
    // Try to save to server first
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Message saved to file:', result.message);
      return true; // Success
    } else {
      throw new Error('Server request failed');
    }
  } catch (error) {
    console.warn('Server not available, using localStorage fallback:', error.message);
    
    // Fallback to localStorage if server is not available
    const existingMessages = JSON.parse(localStorage.getItem('userMessages') || '{"messages":[]}');
    existingMessages.messages.push(message);
    localStorage.setItem('userMessages', JSON.stringify(existingMessages));
    console.log('Message saved to localStorage (fallback)');
    return true; // Success (fallback)
  }
}

function focusInput() {
  if (inputElement) {
    inputElement.focus();
  }
}

function clearInput() {
  if (inputElement) {
    inputElement.value = '';
  }
}

function showStatusMessage(text, type) {
  const statusElement = document.getElementById('messageStatus');
  if (!statusElement) return;
  
  // Clear any existing classes and content
  statusElement.className = '';
  statusElement.textContent = text;
  
  // Add the appropriate class
  statusElement.classList.add(type, 'show');
  
  // Auto-hide after 2 seconds
  setTimeout(() => {
    statusElement.classList.remove('show');
    setTimeout(() => {
      statusElement.className = '';
      statusElement.textContent = '';
    }, 300); // Wait for fade transition
  }, 2000);
}

// Make functions globally accessible
window.initInput = initInput;
window.focusInput = focusInput;
window.clearInput = clearInput;
