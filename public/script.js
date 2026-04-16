let currentMode = "funny";

function setMode(mode) {
  currentMode = mode;
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.start();

  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    document.getElementById("userText").innerText = "You: " + text;

    fetch("/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: text, mode: currentMode })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("aiText").innerText = "AI: " + data.reply;

      let speech = new SpeechSynthesisUtterance(data.reply);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    });
  };
}
