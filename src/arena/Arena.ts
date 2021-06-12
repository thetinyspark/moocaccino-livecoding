import { IWarrior, IWarriorDIToken } from "../core/IWarrior";
import { Container } from "../di/Container";

export class Arena {
  // code qu'on voudrait récupérer

  public battleRoyale() {
    let fighters: IWarrior[] = [];
    for (let i: number = 0; i < 10; i++) {
      fighters.push(Container.resolve<IWarrior>(IWarriorDIToken));
    }

    while (fighters.length > 1) {
      const rand1: number = Math.round(Math.random() * (fighters.length - 1));
      const rand2: number = Math.round(Math.random() * (fighters.length - 1));
      const fighter1: IWarrior = fighters[rand1];
      const fighter2: IWarrior = fighters[rand2];

      fighter1.atk(fighter2);
      fighter2.atk(fighter1);

      fighters = fighters.filter((current) => !current.isDead);
    }

    console.log(fighters);
  }
}
