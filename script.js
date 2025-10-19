function searchWord() {
    const apiBaseURL = "https://api.dictionaryapi.dev/api/v2/entries/en"; // API base URL
    let word = document.getElementById("searchWord").value.trim();
    let wordElement = document.getElementById("word");
    let definitionElement = document.getElementById("definition");
    let resultBox = document.querySelector(".result");
    let audioSection = document.getElementById("audioSection");
    let playButton = document.getElementById("playAudio");

    if (word === "") {
        alert("Please enter a word!");
        return;
    }

    fetch(`${apiBaseURL}/${word}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not OK");
            return response.json();
        })
        .then(data => {
            if (data.title) {
                wordElement.innerText = "Word not found!";
                definitionElement.innerText = "";
                audioSection.style.display = "none";
            } else if (Array.isArray(data) && data.length > 0) {
                let wordData = data[0];
                wordElement.innerText = wordData.word || "No word info";

                // Ensure meanings exist
                if (wordData.meanings && wordData.meanings.length > 0 &&
                    wordData.meanings[0].definitions &&
                    wordData.meanings[0].definitions.length > 0) {
                    definitionElement.innerText = wordData.meanings[0].definitions[0].definition || "No definition found";
                } else {
                    definitionElement.innerText = "Definition not available";
                }

                // Audio pronunciation
                let audioSrc = (wordData.phonetics || []).find(p => p.audio)?.audio;
                if (audioSrc) {
                    audioSection.style.display = "flex";
                    playButton.onclick = () => {
                        let audio = new Audio(audioSrc);
                        audio.play();
                    };
                } else {
                    audioSection.style.display = "none";
                }
            } else {
                wordElement.innerText = "Unexpected API response!";
                definitionElement.innerText = "";
                audioSection.style.display = "none";
            }

            resultBox.classList.add("show");
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            wordElement.innerText = "Error fetching data!";
            definitionElement.innerText = "";
            audioSection.style.display = "none";
            resultBox.classList.remove("show");
        });
}
