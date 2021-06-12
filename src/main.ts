import { IWarrior } from "./core/IWarrior";
import { Knight } from "./core/Knight";

const warrior:IWarrior = new Knight("arthur") as IWarrior;

import './config';
import { Arena } from './arena/Arena';
new Arena().battleRoyale();