
// API key for Open AI API
const apiKey = 'API_KEY';

const texts = document.querySelector('.chatbox-container');
const chatbotModel = "gpt-3.5-turbo-instruct"; // OpenAI GPT-3 model
// Speech to text API call
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let speech = new SpeechSynthesisUtterance(); // Text to speech API  

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to activate the chatbot when opened through the inactivity popup
function popuprecognition() {
  document.getElementById("popup-1").classList.toggle("active");
  showResponse("How may I help you?");
  speech.text = "How may I help you?";
  window.speechSynthesis.speak(speech)
  sleep(1000).then(() => { startRecognition(); });
}

// Function to start chatbot
function startRecognition() {
  console.log("recognition started");
  let recognition = new SpeechRecognition();
  recognition.interimResults = false; // To not give real-time results
  
  let p = document.createElement('p'); // element that will display user prompts in chatbox

  recognition.addEventListener('result', async (e) => {
    
    const text = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    p.innerText = text;
    setTimeout(function() {
      p.remove();
    }, 5000);
    p.innerText = text;
    // Display user's speech
    
    p.innerText = text;
    texts.appendChild(p);

    // Check if any keyword is detected
    let response = '';
    let keywordDetected = false;
    if (e.results[0].isFinal) {
      console.log("Speech completed");

      // Checking for keywords to apply filters

      // Checking if restaurant filter needs to be applied
      if (text.includes('restaurant') || text.includes('restaurants') || text.includes('food') || text.includes('eat')) {
        response = 'Filtering to restaurants nearby...' // chatbot response
        applyFilter("dining"); // applying restaurant filter
        showResponse(response); // display response
        speech.text = response; 
        window.speechSynthesis.speak(speech) // respond via speech
        keywordDetected = true; // If this is false the prompt is sent to Open AI API
      }
      // Checking if hotel filter needs to be applied
      if (text.includes('hotel') || text.includes('hotels')) {
        response = 'Filtering to hotels nearby...'
        showResponse(response);
        applyFilter("hotel");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if bar filter needs to be applied
      if (text.includes('drink') || text.includes('drinks') || text.includes('bar') || text.includes('bars') || text.includes('alcohol')) {
        response = 'Filtering to bars nearby...'
        showResponse(response);
        applyFilter("bar");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if cafe filter needs to be applied
      if (text.includes('cafe') || text.includes('cafes') || text.includes('coffee')) {
        response = 'Filtering to Cafes nearby...'
        showResponse(response);
        applyFilter("cafe");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if museum filter needs to be applied
      if (text.includes('museums') || text.includes('museum')) {
        response = 'Filtering to museums nearby...'
        showResponse(response);
        applyFilter("museum");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if tourist attraction filter needs to be applied
      if (text.includes('attraction') || text.includes('sight seeing') || text.includes('see') || text.includes('tourist')) {
        response = 'Filtering to tourist attractions nearby...'  
        showResponse(response);
        applyFilter("see");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if mall filter needs to be applied
      if (text.includes('mall') || text.includes('shop') || text.includes('shops')) {
        response = 'Filtering to malls nearby...'
        showResponse(response);
        applyFilter("mall");
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if filter needs to be cleared
      if (text.includes('clear') || text.includes('remove') || text.includes('Remove') || text.includes('Clear') ) {
        response = 'Clearing all filters...'
        showResponse(response);
        const clearFilterButton = document.getElementById("clear-filter");

        // Check if the clearFilterButton is found
        if (clearFilterButton) {
          // Simulate a click on the clearFilterButton to clear any applied filters
          clearFilterButton.click();
        } else {
          console.error("Clear filter button not found.");
        }
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // Checking if tutorial needs to be displayed
      if (text.includes('tutorial') || text.includes('demo')) {
        response = 'Showing Tutorial'
        showResponse(response);
        clickShowDemo();
        speech.text = response;
        window.speechSynthesis.speak(speech)
        keywordDetected = true;
      }
      // If no keyword is detected, query OpenAI for completion
      if (!keywordDetected) {
        console.log("step 3");
        let prompt = "You are an itinerary planner chatbot that suggests a list of places. Provide suggestions as a list without elaboration when users ask for recommendations for their future trips or seek information about tourist attractions, landmarks, restaurants, or activities in specific locations. Apologize and refuse to help if the user prompt is not related to itinerary planning or location-based queries.\n\n"
        prompt = prompt.concat(text)
        const chatbotResponse = await getChatbotResponse(prompt);
        response = chatbotResponse.trim()
        showResponse(response);
        speech.text = response;
        window.speechSynthesis.speak(speech)
      }
    }
  });
  // recognition stops once prompt is replied to 
  recognition.addEventListener('end', () => {
    sleep(2000).then(() => { recognition.stop(); }); 
  });
  

  recognition.start();
}

 
// function for passing prompt to open AI API and returning response 
async function getChatbotResponse(prompt) {
  try {
    
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: prompt,
        model: chatbotModel,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}

function showResponse(message) {
  let p = document.createElement('p');
  p.classList.add('replay');
  p.innerText = message;
  texts.appendChild(p);
  setTimeout(function() {
    p.remove();
  }, 5000);
}

// applies filter based on category passed through the argument
const applyFilter = (category) => {
  // Find the filter button corresponding to the specified category
  const filterButton = document.querySelector(`#${category.toLowerCase()} .button`);
  const applyFilterButton = document.getElementById("apply-filter");

  // Check if both filterButton and applyFilterButton are found
  if (filterButton && applyFilterButton) {
    // Simulate a click on the filterButton to apply the filter
    filterButton.click();

    // update the UI to reflect the selected filter
    filterButton.classList.add("selected");

    // Simulate a click on the applyFilterButton to apply the filter action
    applyFilterButton.click();
  } else {
    console.error(`Filter button or apply filter button for '${category}' not found.`);
  }
};

// Displays app demo 
const clickShowDemo = () => {
  // Find the Show Demo button
  const showDemoButton = document.querySelector('.onboarding-btn');

  // Check if the button is found
  if (showDemoButton) {
    // Simulate a click on the Show Demo button
    showDemoButton.click();
  } else {
    console.error("Show Demo button not found.");
  }
};

