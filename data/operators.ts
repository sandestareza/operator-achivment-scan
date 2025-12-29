interface Operator {
  id: number;
  name: string;
  target: number;
  output: number;
  percentage: number;
  sendEmail: boolean;
}

export const operators: Operator[] = [
  { id: 1, name: "Abdul", target: 1000000, output: 500000, percentage: 0, sendEmail: false },
  { id: 2, name: "Budi", target: 1000000, output: 420000, percentage: 0, sendEmail: false },
  { id: 3, name: "Beni", target: 1000000, output: 1100000, percentage: 0, sendEmail: false },
  { id: 4, name: "Rian", target: 1000000, output: 950000, percentage: 0, sendEmail: false },
  { id: 5, name: "Romi", target: 1000000, output: 1000500, percentage: 0, sendEmail: false },
  { id: 6, name: "Farhan", target: 1000000, output: 550000, percentage: 0, sendEmail: false },
  { id: 7, name: "Krisna", target: 1000000, output: 953000, percentage: 0, sendEmail: false },
  { id: 8, name: "Fajar", target: 1000000, output: 1053000, percentage: 0, sendEmail: false },
  { id: 9, name: "Heri", target: 1000000, output: 876300, percentage: 0, sendEmail: false },
  { id: 10, name: "Nopri", target: 1000000, output: 300000, percentage: 0, sendEmail: false },
];
