export type Leep = {
  id: string;
  date: string;
  sleepTime: string;
  note?: string;
};

export type LeepMap = Map<string, Leep>;
