function storeData(
  selectedSequence,
  age,
  id,
  sex,
  answers,
  verdicts,
  overallVerdict,
  timer,
  username,
  password
) {

  if (
    selectedSequence !== undefined &&
    age !== undefined &&
    id !== undefined &&
    sex !== undefined &&
    answers !== undefined &&
    verdicts !== undefined &&
    overallVerdict !== undefined &&
    timer !== undefined  &&
    username !== undefined  &&
    password !== undefined
  ) {

    const sequenceMapping = {
    0: "COPD",
    1: "ILD",
    2: "Bronchiectasis"
    };

    const selectedSequenceWord = sequenceMapping[selectedSequence];

    const data = {
      disease: selectedSequenceWord,
      age: age,
      id: id,
      sex: sex,
      answers: answers,
      verdicts: verdicts,
      overallVerdict: overallVerdict,
      timer: timer,
      username: username,
      password: password
    };

    const jsonData = JSON.stringify(data);

    console.log("Data to be sent to backend: " + jsonData);

    // Send the jsonData to the backend using the fetch method
    fetch("https://ltecapi.azurewebsites.net/ltec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        // Handle the successful response here if needed
        console.log("Data successfully sent to the backend.");
        // You might also want to handle the response from the backend.
        // For example, if the backend returns a JSON response, you can parse it as follows:
        // return response.json();
      })
      .catch((error) => {
        // Handle errors during the fetch or server-side errors
        console.error("Error sending data to the backend:", error.message);
      });
  } else {
    console.error("Some data is missing. Unable to store data.");
  }
}

export default storeData;
