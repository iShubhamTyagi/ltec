import { questionsForCard1a, questionsForCard1b, 
         questionsForCard2a, questionsForCard2b, 
         questionsForCard3a, questionsForCard3b, 
         questionsForCardc1, questionsForCardc2 } from './Questions';
import QuestionCard from './QuestionCard';

const questionCardSequences = [
  {
    label: 'COPD',
    cards: [
      <QuestionCard questions={questionsForCard1a} title="Is the Patient eligible for referral?" />,
      <QuestionCard questions={questionsForCard1b} title="Is the Patient eligible for listing?" />,
      <QuestionCard questions={questionsForCardc1} title="Contra Indication (Absolute)" />,
      <QuestionCard questions={questionsForCardc2} title="Contra Indication (Relative)" />
    ],
  },
  {
    label: 'ILD',
    cards: [
      <QuestionCard questions={questionsForCard2a} title="Is the Patient eligible for referral?" />,
      <QuestionCard questions={questionsForCard2b} title="Is the Patient eligible for listing?" />,
      <QuestionCard questions={questionsForCardc1} title="Contra Indication (Absolute)" />,
      <QuestionCard questions={questionsForCardc2} title="Contra Indication (Relative)" />
    ],
  },
  {
    label: 'Bronchiectasis',
    cards: [
      <QuestionCard questions={questionsForCard3a} title="Is the Patient eligible for referral?" />,
      <QuestionCard questions={questionsForCard3b} title="Is the Patient eligible for listing?" />,
      <QuestionCard questions={questionsForCardc1} title="Contra Indication (Absolute)" />,
      <QuestionCard questions={questionsForCardc2} title="Contra Indication (Relative)" />
    ],
  },
];

export default questionCardSequences;
