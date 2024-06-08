import { Injectable } from '@nestjs/common';
import { ILogger } from '../interfaces';

@Injectable()
export class ConsoleLogger implements ILogger {}
