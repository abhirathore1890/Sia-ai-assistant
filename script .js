// 1. Chat aur Elements Setup
let chat = document.getElementById("chat");

// 2. 100+ Links ki Dictionary (Smart Map)
const assistantData = {
    "youtube": "https://youtube.com", "facebook": "https://facebook.com", "instagram": "https://instagram.com",
    "twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "whatsapp": "https://web.whatsapp.com",
    "snapchat": "https://snapchat.com", "reddit": "https://reddit.com", "pinterest": "https://pinterest.com",
    "telegram": "https://web.telegram.org", "gmail": "https://mail.google.com", "drive": "https://drive.google.com",
    "maps": "https://www.google.com/maps", "calendar": "https://calendar.google.com", "photos": "https://photos.google.com",
    "amazon": "https://amazon.in", "flipkart": "https://flipkart.com", "zomato": "https://zomato.com",
    "wikipedia": "https://wikipedia.org", "chatgpt": "https://chatgpt.com", "weather": "https://www.google.com/search?q=weather"
};

// 3. Message Display Function
function addMessage(text, cls) {
    let msg = document.createElement("p");
    msg.className = cls;
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

// 4. Voice Synthesis (Bolne wala function)
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    window.speechSynthesis.speak(speech);
}

// 5. Main Logic (Sia ka dimaag)
function getReply(message) {
    message = message.toLowerCase().trim();

    // A. Website Shortcuts
    for (let key in assistantData) {
        if (message === key || message.includes("open " + key)) {
            window.open(assistantData[key]);
            return key.toUpperCase() + " khol rahi hoon.";
        }
    }

    // B. Greetings
    if (message.includes("good morning") || message.includes("सुप्रभात")) return "Suprabhat! Aapka din mangalmay ho.";
    if (message.includes("good night") || message.includes("shubh ratri")) return "Shubh Ratri! Meethe sapne dekhiye.";
    if (message.includes("hi") || message.includes("hello") || message.includes("नमस्ते")) return "नमस्ते! मैं Sia AI Assistant हूँ।";

    // C. Jokes & Poems
    if (message.includes("joke") || message.includes("chutkula")) {
        let jokes = [
            "Pappu: Teacher, kya aap mujhe us baat ke liye saza dengi jo maine nahi ki? Teacher: Nahi. Pappu: Theek hai, maine homework nahi kiya!",
            "Santa: Doctor sahab, mera gala kharab hai. Doctor: Namak ke paani se gharare karo. Santa: Thik hai, par sabun kaunsa use karun?"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (message.includes("poem") || message.includes("kavita")) return "Machli jal ki rani hai, jeevan uska paani hai...";

    // D. Smart Math (Calculations)
    if (/[0-9]/.test(message) && (message.includes("+") || message.includes("-") || message.includes("*") || message.includes("/"))) {
        try {
            let calc = message.replace(/[^-()\d/*+.]/g, ''); 
            return "Iska jawab hai: " + eval(calc);
        } catch (e) { return "Math thoda mushkil hai, firse puchiye."; }
    }

    // E. Dynamic Searches (Maps/Wiki/Google)
    if (message.includes("map") || message.includes("rasta")) {
        let place = message.replace("map", "").replace("rasta", "").replace("dikhao", "").trim();
        window.open(`https://www.google.com/maps/search/${place}`);
        return place ? place + " ka rasta dikha rahi hoon." : "Google Maps khol rahi hoon.";
    }

    if (message.includes("search") || message.includes("google")) {
        let query = message.replace("search", "").replace("google", "").trim();
        window.open("https://www.google.com/search?q=" + query);
        return "Google par search kar rahi hoon: " + query;
    }

    if (message.includes("समय") || message.includes("time")) return "अभी समय है " + new Date().toLocaleTimeString();

    return "Maaf kijiye, main ye samajh nahi paaya. Kya aap kuch aur puchna chahenge?";
}

// 6. Message Sending Function
function sendMessage() {
    let input = document.getElementById("input");
    let text = input.value.trim();
    if (text !== "") {
        addMessage(text, "user");
        let reply = getReply(text);
        setTimeout(() => {
            addMessage(reply, "bot");
            speak(reply);
        }, 500);
        input.value = "";
    }
}

// 7. Voice Command Function (Final)
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "hi-IN";
    
    const voiceBtn = document.getElementById("voice-btn");
    if(voiceBtn) voiceBtn.style.backgroundColor = "red"; // Listening indicator

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("input").value = transcript;
        sendMessage();
        if(voiceBtn) voiceBtn.style.backgroundColor = "";
    };

    recognition.onerror = () => {
        addMessage("Mic mein kuch problem hai.", "bot");
        if(voiceBtn) voiceBtn.style.backgroundColor = "";
    };
}
