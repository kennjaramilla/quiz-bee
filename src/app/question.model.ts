export interface Question {
  readonly question: string;
  readonly options: string[];
  readonly answer: string;
  readonly difficulty: number;
  readonly topic: string;
  readonly explanation: string;
};
  