// import { google } from "googleapis";

// const auth = new google.auth.GoogleAuth({
//   keyFile: "./resources/credentials.json",
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// const authClient = await auth.getClient();

function storeData (
  selectedSequence,
  age,
  id,
  sex,
  answers,
  verdicts,
  overallVerdict,
  timer
) {
  console.log("selectedSequence--> " + selectedSequence);
  console.log("age--> " + age);
  console.log("id--> " + id);
  console.log("sex--> " + sex);
  console.log("answers--> " + JSON.stringify(answers));
  console.log("verdicts--> " + JSON.stringify(verdicts));
  console.log("overallVerdict--> " + overallVerdict);
  console.log("timer--> " + timer);
};

export default storeData;
