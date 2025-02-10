// Get references to DOM elements
const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const chatWindow = document.getElementById("chat-window");

// Function to append messages to the chat window
function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
        messageElement.textContent = `You: ${message}`;
    } else {
        messageElement.classList.add("receiver-message");
        messageElement.textContent = `Receiver: ${message}`;
    }

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
}

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message !== "") {
        appendMessage(message, "user");
        messageInput.value = ""; // Clear input field

        // Simulate a response from an AI chatbot
        setTimeout(() => {
            fetchAIResponse(message);
        }, 1000);
    }
}

// Function to fetch AI-generated response
function fetchAIResponse(userMessage) {
    fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(userMessage) + "&langpair=en|en") 
        .then(response => response.json())
        .then(data => {
            const botResponse = data.responseData.translatedText;
            appendMessage(botResponse, "receiver");
        })
        .catch(() => {
            appendMessage("Sorry, I couldn't understand that.", "receiver");
        });
}

// Event listener for the Send button
sendButton.addEventListener("click", sendMessage);

// Allow sending messages by pressing Enter key
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});