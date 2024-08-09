import { GoogleGenerativeAI } from "@google/generative-ai";

async function getApiKey() {
    const response = await fetch('/api/key');
    if (!response.ok) {
        throw new Error('Failed to fetch API key');
    }
    const data = await response.json();
    return data.apiKey;
}

async function setupTranslation() {
    try {
        const API_KEY = await getApiKey();
        const genAI = new GoogleGenerativeAI(API_KEY);

        const translateButton = document.getElementById('translate-el');
        const textTranslate = document.getElementById('text_area');
        const translationResult = document.getElementById('translation-text');
        const language = document.getElementById('language-el');
        const languageInputs = language.querySelectorAll('input[name="language"]');
        const languageCodes = language.querySelectorAll('input[name="language"]');

        function selectLanguage() {
            for (let i = 0; i < languageInputs.length; i++) {
                if (languageInputs[i].checked) {
                    return languageInputs[i].value;
                }
            }
            return '';
        }

        function checkInputs() {
            const text = textTranslate.value.trim();
            const selectedLanguage = selectLanguage();
            if (text !== '' && selectedLanguage !== '') {
                translateButton.disabled = false;
            } else {
                translateButton.disabled = true;
            }
        }

        async function translate() {
            let textValue = textTranslate.value;
            const selectedLanguage = selectLanguage();
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: textValue }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "You are an experienced language translator and you can translate various sentences in different languages correctly, give me just the answer to the translation and how to pronounce the text, also add a comma to the word before giving me the translation and include the pronunciation in parenthesis, do not add extra text" }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0.633,
                },
            });

            const prompt = `Translate this ${textValue} in ${selectedLanguage}`;
            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            const translatedText = await response.text();
            console.log(translatedText);

            const translationHTML = `
                <div class="inner">
                    <p>Original text 👇</p>
                    <div class="original-text" id="original-text">
                        <textarea id="text_area" rows="4" cols="30">${textValue}</textarea>
                    </div>
                    <p>Your translation 👇</p>
                    <div class="translation-text" id="translation-text">
                        <textarea id="text_area" rows="4" cols="30">${translatedText}</textarea>
                    </div>
                    <button id="start-over-button">Start Over</button>
                    <button id="speak-translation-button">Speak Translation <span class="material-symbols-outlined">
                    text_to_speech</span></button>
                </div>`;

            translationResult.innerHTML = translationHTML;
            document.querySelector('.inner').style.display = 'none';

            const startoverBtn = document.getElementById('start-over-button');
            startoverBtn.addEventListener('click', startOver);

            const speakBtn = document.getElementById('speak-translation-button');
            speakBtn.addEventListener('click', () => speakText(translatedText));
        }

        function selectCode() {
            for (let i = 0; i < languageCodes.length; i++) {
                if (languageCodes[i].checked) {
                    return languageCodes[i].id;
                }
            }
            return '';
        }

        function extractPronunciation(text) {
            const commaIndex = text.indexOf('(');
        
            if (commaIndex !== -1) {
                const pronunciation = text.slice(0, commaIndex).trim();
                return pronunciation;
            }
        
            return text;
        }

        function speakText(text) {
            const synth = window.speechSynthesis;

            if (synth) {
                const pronunciation = extractPronunciation(text);
                const utterance = new SpeechSynthesisUtterance(pronunciation);

                const selectedLanguage = selectCode(); 
                utterance.lang = selectedLanguage;

                synth.speak(utterance);

                utterance.onend = () => {
                    console.log('Speech has finished');
                };

                utterance.onerror = (event) => {
                    console.error('Speech synthesis error:', event);
                };
            } else {
                console.error('Speech synthesis not supported');
            }
        }

        function startOver() {
            textTranslate.value = '';
            translationResult.innerHTML = '';
            document.querySelector('.inner').style.display = 'block';
            checkInputs();
        }

        translateButton.addEventListener('click', translate);
        textTranslate.addEventListener('input', checkInputs);
        languageInputs.forEach(input => input.addEventListener('change', checkInputs));

        checkInputs();

    } catch (error) {
        console.error('Error setting up translation:', error);
    }
}

setupTranslation();
