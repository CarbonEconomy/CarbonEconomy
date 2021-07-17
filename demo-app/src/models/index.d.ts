import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Reward {
  readonly id: string;
  readonly title: string;
  readonly pictureUrl: string;
  readonly organisation: string;
  readonly treesRequired?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Reward>);
  static copyOf(source: Reward, mutator: (draft: MutableModel<Reward>) => MutableModel<Reward> | void): Reward;
}