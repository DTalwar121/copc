export type BmiV1Input = {
  height: number;
  weight: number;
};

export type BmiV1Output = {
  bmi: number;
  category: string;
};
