export interface Transaction {
  transactionId: string;
  userId: number;
  topicId: number;
  testedAt: Date;
  score: number;
}