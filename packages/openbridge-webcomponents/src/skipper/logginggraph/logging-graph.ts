import {LitElement, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import { Colors } from '../interfaces.js';
import { loggingGraphStyles } from './logging-graph-styles.js';

@customElement('ob-logging-graph-skipper')
export class LoggingGraph extends LitElement {

  @property({type: String}) timeScale = '24h';
  @property({type: String}) timeLeft = '';
  @property({type: String}) timeRight = '';
  @property({type: Number}) functionOne = 25;
  @property({type: Number}) functionTwo = 25;
  @property({type: Array}) listPointsFunctionOne = [ 
    -5, 0, 5, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 15, 15, 15, 15,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 12, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 30, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 30, 28, 29, 28, 27, 26, 25, -15, 23, 22, 21,
    20, 21, 22, 8, 8, 8, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 40, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 30, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    26, 25, 24, 23, 22, 21
  ];

  @property({type: Array}) listPointsFunctionTwo = [ 
    -3, 10, -5, 15, 0, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 12, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 56, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 8, 8, 8, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 75, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 65, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 65, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 22
  ];
  
  @property({type: Array}) listTimeStampOfPoints = [
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:4:055', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05',
    '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05', '22.06.2023 12:23:05', '22.06.2023 12:45:05', '22.06.2023 13:15:05', '22.06.2023 13:20:05'
  ];
  @property({type: String}) nameOfFunctionOne = 'Speed Calibrated Long';
  @property({type: String}) nameOfFunctionTwo = 'Function green';
  @property({type: Boolean}) showFunctionOne = true;
  @property({type: Boolean}) showFunctionTwo = false;
  @property({type: String}) showVerticalSelectedLine = false;
  @property({type: Number}) xPositionSelectedLine = 0;
  @property({type: Number}) yPositionSelectedLine = 0;
  @property({type: Number}) opacity = 0;

  @property({type: String}) xValue = '';
  @property({type: String}) yValue = '';
  @property({type: String}) timeOfPoint = '12:43';
  
  @property({type: String}) colorPoint = '';
  @property({type: String}) colorPointFunctionOne = '';
  @property({type: String}) colorPointFunctionTwo = '';

  @property({type: Event}) handleEvent = '';

  polylineOne = "";
  polylineTwo = "";

  clicked = false;

  zoneZero = 0;
  zoneOne = 0;
  zoneTwo = 0;
  zoneThree = 0;
  zoneFour = 0;
  zoneFive = 0;

  zoneZeroFunctionTwo = 0;
  zoneOneFunctionTwo = 0;
  zoneTwoFunctionTwo = 0;
  zoneThreeFunctionTwo = 0;
  zoneFourFunctionTwo = 0;
  zoneFiveFunctionTwo = 0;

  hiddeFunctionOne = '';
  hiddeFunctionTwo = '';

  nameOfFunction = '';

  setVerticalLine(): void {
    // console.log('clicked: ' + this.clicked);
    if (!this.showFunctionOne && !this.showFunctionTwo) {
      this.showVerticalSelectedLine = false;
    }
    else if (this.clicked) {
      this.showVerticalSelectedLine = true;
    }
    else {
      this.showVerticalSelectedLine = false;
    }
  }

  static override styles = [
    loggingGraphStyles
  ];

  override render(): unknown {

    this.setVerticalLine();

    // todo remove this function
    //function getFunction(x: number) {
    //  return Math.tan(x);
    //}

    // console.log('Rendering...');

    const timeScaleParameter = 600; //this.listPointsFunctionOne.length; // 600; // 1440;
    const lineWidth = 1.75; // 1.5; // 1

    if (Array.isArray(this.listTimeStampOfPoints) && this.listTimeStampOfPoints.length > 0) {
      const first = this.listTimeStampOfPoints[0];
      const last = this.listTimeStampOfPoints[this.listTimeStampOfPoints.length - 1];
        
      const firstElement = first != null ? String(first) : '0';
      const lastElement = last != null ? String(last) : '0';
        
      const getTimePart = (value: string): string => {
        if (value === '0') return '';
        const parts = value.split(' ');
        return parts.length > 1 ? parts[1] : '';
      };
    
      this.timeLeft = getTimePart(firstElement);
      this.timeRight = getTimePart(lastElement);
      this.clicked = false;
    }

    // function one min points
    let minPointFunctionOne = this.listPointsFunctionOne.length != 0 ? Infinity : 0;
    let maxPointFunctionOne = this.listPointsFunctionOne.length != 0 ? -Infinity : 10;
    const functionOneArray = [];
    // console.log('listPointsFunctionOne.length: ' + this.listPointsFunctionOne.length);
    for (let i = 0; i < this.listPointsFunctionOne.length; i++) {
      if (this.listPointsFunctionOne[i] !== null) {
        functionOneArray.push([i, this.listPointsFunctionOne[i]]);

        if (this.listPointsFunctionOne[i] < minPointFunctionOne) {
          minPointFunctionOne = this.listPointsFunctionOne[i];
        }

        if (this.listPointsFunctionOne[i] > maxPointFunctionOne) {
          maxPointFunctionOne = this.listPointsFunctionOne[i];
        }
      }
      else {
        functionOneArray.push([i, NaN]);
      }

      if (i >= timeScaleParameter) {
        break;
      }
    }

    if (minPointFunctionOne === Infinity) {
      minPointFunctionOne = 0;
    }

    if (maxPointFunctionOne === -Infinity) {
      maxPointFunctionOne = 10;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // function two min points
    let minPointFunctionTwo = this.listPointsFunctionTwo.length != 0 ? Infinity : 0;
    let maxPointFunctionTwo = this.listPointsFunctionTwo.length != 0 ? -Infinity : 10;
    const functionTwoArray = [];
    for (let i = 0; i < this.listPointsFunctionTwo.length; i++) {
      if (this.listPointsFunctionTwo[i] !== null) {
        functionTwoArray.push([i, this.listPointsFunctionTwo[i]]);

        if (this.listPointsFunctionTwo[i] < minPointFunctionTwo) {
          minPointFunctionTwo = this.listPointsFunctionTwo[i];
        }

        if (this.listPointsFunctionTwo[i] > maxPointFunctionTwo) {
          maxPointFunctionTwo = this.listPointsFunctionTwo[i];
        }
      }
      else {
        functionTwoArray.push([i, NaN]);
      }

      if (i >= timeScaleParameter) {
        break;
      }
    }

    if (minPointFunctionTwo === Infinity) {
      minPointFunctionTwo = 0;
    }

    if (maxPointFunctionTwo === -Infinity) {
      maxPointFunctionTwo = 10;
    }

    ///////////////////////round min and max//////////////////////////////
    // function one
    if (minPointFunctionOne % 5 !== 0) {
      minPointFunctionOne = this.roundDownToFive(minPointFunctionOne);
    }
    if (maxPointFunctionOne % 5 !== 0) {
      maxPointFunctionOne = this.roundUpToFive(maxPointFunctionOne);
    }

    // function two
    if (minPointFunctionTwo % 5 !== 0) {
      minPointFunctionTwo = this.roundDownToFive(minPointFunctionTwo);
    }
    if (maxPointFunctionTwo % 5 !== 0) {
      maxPointFunctionTwo = this.roundUpToFive(maxPointFunctionTwo);
    }

    this.functionOne = maxPointFunctionOne - minPointFunctionOne;
    this.functionTwo = maxPointFunctionTwo - minPointFunctionTwo;
    // console.log('max i min point function one: ' + maxPointFunctionOne + ', ' + minPointFunctionOne);
    // console.log('max i min point function two: ' + maxPointFunctionTwo + ', ' + minPointFunctionTwo);

    if (this.functionOne >= 0) {
      this.zoneZero = Math.round(minPointFunctionOne * 10) / 10; // minPointFunctionOne;
      this.zoneOne = Math.round((this.zoneZero + this.functionOne / 5) * 10) / 10;
      this.zoneTwo = Math.round((this.zoneOne + this.functionOne / 5) * 10) / 10;
      this.zoneThree = Math.round((this.zoneTwo + this.functionOne / 5) * 10) / 10;
      this.zoneFour = Math.round((this.zoneThree + this.functionOne / 5) * 10) / 10;
      this.zoneFive = Math.round((this.zoneFour + this.functionOne / 5) * 10) / 10;
    }
    else {
      this.zoneFive = Math.round(maxPointFunctionOne * 10) / 10; // maxPointFunctionOne;
      this.zoneFour = Math.round((this.functionOne / 5) * 10) / 10;
      this.zoneThree = Math.round((this.zoneFour + this.functionOne / 5) * 10) / 10;
      this.zoneTwo = Math.round((this.zoneThree + this.functionOne / 5) * 10) / 10;
      this.zoneOne = Math.round((this.zoneTwo + this.functionOne / 5) * 10) / 10;
      this.zoneZero = Math.round((this.zoneOne + this.functionOne / 5) * 10) / 10;
    }

    if (this.showFunctionOne === false) {
      this.hiddeFunctionOne = 'hidden';
    }
    else {
      this.hiddeFunctionOne = '';
    }

    if (this.functionTwo >= 0) {
      this.zoneZeroFunctionTwo = Math.round(minPointFunctionTwo * 10) / 10; // minPointFunctionTwo;
      this.zoneOneFunctionTwo = Math.round((this.zoneZeroFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneTwoFunctionTwo = Math.round((this.zoneOneFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneThreeFunctionTwo = Math.round((this.zoneTwoFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneFourFunctionTwo = Math.round((this.zoneThreeFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneFiveFunctionTwo = Math.round((this.zoneFourFunctionTwo + this.functionTwo / 5) * 10) / 10;
    }
    else {
      this.zoneFiveFunctionTwo = Math.round(maxPointFunctionTwo * 10) / 10; // maxPointFunctionTwo;
      this.zoneFourFunctionTwo = Math.round((this.zoneFiveFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneThreeFunctionTwo = Math.round((this.zoneFourFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneTwoFunctionTwo = Math.round((this.zoneThreeFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneOneFunctionTwo = Math.round((this.zoneTwoFunctionTwo + this.functionTwo / 5) * 10) / 10;
      this.zoneZeroFunctionTwo = Math.round((this.zoneOneFunctionTwo + this.functionTwo / 5) * 10) / 10;
    }

    for (let i = 0; i < functionOneArray.length; i++) {
      functionOneArray[i][0] = 30.5 + i * 990 / timeScaleParameter;
      if (!isNaN(functionOneArray[i][1])) {
        functionOneArray[i][1] = 495 - this.listPointsFunctionOne[i] * 425 / this.functionOne + (minPointFunctionOne * 425 / this.functionOne);
      }
    }

    for (let i = 0; i < functionTwoArray.length; i++) {
      functionTwoArray[i][0] = 30.5 + i * 990 / timeScaleParameter;
      if (!isNaN(functionTwoArray[i][1])) {
        functionTwoArray[i][1] = 495 - this.listPointsFunctionTwo[i] * 425 / this.functionTwo + (minPointFunctionTwo * 425 / this.functionTwo);
      }
    }
  

    if (this.showFunctionTwo === false) {
      this.hiddeFunctionTwo = 'hidden';
    }
    else {
      this.hiddeFunctionTwo = '';
    }

    const svgElementFunctionOne = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    const segmentsOfPolylineOne = this.splitPolyline(functionOneArray);
    segmentsOfPolylineOne.forEach(segment => {
      let pointsAttr = '';
      for(let i = 0; i < segment.length; i++) {
        pointsAttr += segment[i] + ' ';
      }
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", pointsAttr);
      polyline.setAttribute("stroke", "var(--instrument-enhanced-primary-color)");
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke-width", "2");
  
      svgElementFunctionOne.appendChild(polyline);

    });

    // this.polylineOne = this.createPolyline(functionOneArray);

    const svgElementFunctionTwo = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    const segmentsOfPolylineTwo = this.splitPolyline(functionTwoArray);
    segmentsOfPolylineTwo.forEach(segment => {
      let pointsAttr = '';
      for(let i = 0; i < segment.length; i++) {
        pointsAttr += segment[i] + ' ';
      }
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", pointsAttr);
      polyline.setAttribute("stroke", "var(--alert-running-color)");
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke-width", "2");

      svgElementFunctionTwo.appendChild(polyline);
    });

    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < functionOneArray.length; i++) {
      const coordinatex: number = functionOneArray[i][0];
    
      const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
      line.setAttribute("x1", coordinatex + '');
      line.setAttribute("x2", coordinatex + '');
      line.setAttribute("y1", 495 + '');
      line.setAttribute("y2", 70 + '');
      line.setAttribute("stroke", "transparent");
      line.setAttribute("stroke-width", lineWidth + '');
      line.setAttribute("cursor", "inherit");

      fragment.appendChild(line);

      line.addEventListener('click', () => { //'click'

        this.xPositionSelectedLine = coordinatex - 256.85;
        this.showVerticalSelectedLine = true;
        this.clicked = true;
        // this.yPositionSelectedLine = coordinateyMax - 351;
        this.xValue = i.toString();
        // console.log('valueOfFunctionOne: ' + i);
        // if (this.listPointsFunctionOneMax.length >= i && this.listPointsFunctionOneMax[i] !== null) {
        //   const temp: number = this.listPointsFunctionOneMax[i];
        //   this.yValue = (temp.toFixed(2)).toString(); //.toFixed(1);
        // }
        // this.yValue = (this.listPointsFunctionOneMax[i].toFixed(2)).toString(); //.toFixed(2);
        this.timeOfPoint = this.listTimeStampOfPoints[i] !== null ? this.listTimeStampOfPoints[i] : '';
        this.nameOfFunction = this.nameOfFunctionOne;

        // this.opacity = 1;
        // this.colorPoint = "var(--instrument-enhanced-primary-color)";

        this.handleEdit('Blue&Green_Data', this.xValue, this.yValue, this.timeOfPoint);
      });
    }

    svgContainer.appendChild(fragment);
    
    // this.polylineTwo = this.createPolyline(functionTwoArray);

    // const endTime = performance.now();
    // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    //-256 -236 530 490
    return svg`
    
      <svg viewBox="-296 -296 1130 560" fill="var(--element-active-color)" style="width: 100%; height: 100%" preserveAspectRatio="none">
        <g>
          <svg x="-226" y="-206" width="1" height="425">
            ${this.getVerticalBorderLine()}
          </svg>
        </g>
        <!--TODO-->
        <g>
          <svg x="-226" y="219" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
       
          <text x="-256" y="-202" class="ob-font-ui-body">${this.zoneFive}</text>
          <text x="780" y="-202" class="ob-font-ui-body">${this.zoneFiveFunctionTwo}</text>
          <text x="730" y="249" class="ob-font-ui-body">${this.timeRight}</text>
        <g>
          <svg x="-226" y="134" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
        <text x="-256" y="-116" class="ob-font-ui-body">${this.zoneFour}</text>
        <text x="780" y="-116" class="ob-font-ui-body">${this.zoneFourFunctionTwo}</text>
        
        <g>
          <svg x="-226" y="49" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
        <text x="-256" y="-31" class="ob-font-ui-body">${this.zoneThree}</text>
        <text x="780" y="-31" class="ob-font-ui-body">${this.zoneThreeFunctionTwo}</text>
       
        <g>
          <svg x="-226" y="-36" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
        <text x="-256" y="54" class="ob-font-ui-body">${this.zoneTwo}</text>
        <text x="780" y="54" class="ob-font-ui-body">${this.zoneTwoFunctionTwo}</text>

        <g>
          <svg x="-226" y="-121" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
        ${this.getLegendItem(
          -290,
          -216,
          Colors.instrumentEnhancedPrimary
        )}
        <text x="-256" y="139" class="ob-font-ui-body">${this.zoneOne}</text>
        <text x="780" y="139" class="ob-font-ui-body">${this.zoneOneFunctionTwo}</text>
          <svg x="-226" y="-206" width="1000" height="1">
            ${this.getHorizontalBorderLine()}
          </svg>
        </g>
        ${this.getLegendItem(
          810,
          -216,
          Colors.alertRunningColor
        )}
        <text x="-256" y="224" class="ob-font-ui-body">${this.zoneZero}</text>
        <text x="780" y="224" class="ob-font-ui-body">${this.zoneZeroFunctionTwo}</text>
        <text x="-230" y="249" class="ob-font-ui-body">${this.timeLeft}</text>
        <g style="visibility:${this.hiddeFunctionOne}">
          <svg x="-256" y="-276" width="1124" height="512">
            ${svgElementFunctionOne}
          </svg>
        </g>
        
        <g style="visibility:${this.hiddeFunctionTwo}">
          <svg x="-256" y="-276" width="1124" height="512">
            ${svgElementFunctionTwo}
          </svg>
        </g>

        <svg x="-256" y="-276" width="1124" height="512">
            ${svgContainer}
          </svg>

        <g style="visibility:${this.showVerticalSelectedLine ? '' : 'hidden'}">
          <svg x="${this.xPositionSelectedLine}" y="-206" width="${lineWidth}" height="425">
            ${this.getVerticalSelectedLine()}
          </svg>
          <text x="${-25 + this.xPositionSelectedLine}" y="264" class="ob-font-ui-body ob-alert-alarm-color-stroke">${this.timeOfPoint.split(' ')[1]}</text>
        </g>

        <!--
        <svg x="${this.xPositionSelectedLine}" y="${this.yPositionSelectedLine}" style="pointer-events: none; position: absolute; z-index: 1;">
          <svg id="chartcontainer_tooltip_svg" opacity=${this.opacity}>
            <g id="chartcontainer_tooltip_group" opacity="1">
              <path id="chartcontainer_tooltip_path" stroke-width="0.5" fill="rgba(0, 8, 22, 0.75)" opacity="0.75" stroke="#cccccc" d="M 0.25 2.25 Q 0.25 0.25 2.25 0.25  L 150 0.25 Q 152 0.25 152 2.25 L 152 57 Q 152 59 150 59 L 80 59 L 76 70 Q 74 76 74 74 L 68 59 L 2.25 59 Q 0.25 59 0.25 57 z" filter="url(#chartcontainer_tooltip_shadow)"></path>
              <text id="chartcontainer_tooltip_text" x="10" y="20" fill="null" class="ob-font-ui-body" text-anchor="middle">
                <tspan text-anchor="start" fill="#ffffff">${this.nameOfFunction}</tspan>
              </text>
              <text id="chartcontainer_tooltip_text" x="10" y="20" fill="null" class="ob-font-ui-body" text-anchor="start">
                <tspan x="25" dy="27" fill="#dbdbdb"> ${" y: "}</tspan><tspan fill="#dbdbdb"> </tspan>
                <tspan fill="#ffffff" style="font-weight:bold">${this.yValue},</tspan>
                <tspan fill="#dbdbdb"> </tspan><tspan fill="#ffffff">${this.timeOfPoint.split(' ')[1]}</tspan>
              </text>
              <path id="chartcontainer_tooltip_header_path" stroke-width="1" fill="null" opacity="0.8" stroke="#ffffff" d="M 15 28L 120 28"></path><defs id="SVG_tooltip_definition"><filter id="chartcontainer_tooltip_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur><feOffset dx="3" dy="3" result="offsetblur"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.5"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs>
              <g id="chartcontainer_tooltip_trackball_group"><ellipse id="chartcontainer_tooltip_Trackball_0" opacity="1" fill=${this.colorPoint} stroke="#cccccc" stroke-width="1" stroke-dasharray="null" d="undefined" rx="5" ry="5" cx="15" cy="42" aria-label="null"></ellipse></g>
            </g>
          </svg>
        </svg>
        -->
      </svg>
    `;
  }

  private getLegendItem(
  x: number,
  y: number,
  color: string
) {
  return svg`
    <g transform="translate(${x}, ${y})">
      <rect
        x="0"
        y="0"
        width="24"
        height="24"
        rx="2"
        fill="${color}">
      </rect>
    </g>
  `;
}

  createPolyline(listPoints: any): string {
    let polyline = "";

    if (listPoints.length > 0) {
      polyline += listPoints[0][0] + ', ' + listPoints[0][1];
      for (let i = 1; i < listPoints.length; i++) {
        if ((typeof(listPoints[i][0]) === 'number' && typeof(listPoints[i][1]) === 'number') && !isNaN(listPoints[i][0]) && !isNaN(listPoints[i][1])) 
        {
          polyline += " " + Number(listPoints[i][0]) + ", ";
          polyline += Number(listPoints[i][1]);
        }
      }
    }
    return polyline;
  }

  getSVGCoordinates(event: MouseEvent, svg: SVGSVGElement): DOMPoint {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svg.getScreenCTM()?.inverse());
}

  splitPolyline(points: any) {
    const segments = [];
    let currentSegment = [];

    for (let i = 0; i < points.length; i++) {
      if (!isNaN(points[i][1])) {
        currentSegment.push(points[i]);
      } 
      else if (currentSegment.length > 0) {
        segments.push([...currentSegment]);
        currentSegment = [];
      }
    }

    if (currentSegment.length > 0) {
      segments.push([...currentSegment]);
    }

    return segments;
  }

  private handleEdit(dataType: string, x: string, y: string, timeOfPoint: string) {
    this.dispatchEvent(
      new CustomEvent('edit', {
        detail: {dataType: dataType, x: x, y: y, time: timeOfPoint},
      })
    );
    // console.log('handleEdit called...: ' + dataType + ': ' + x + ', ' + y + ', ' + timeOfPoint);
  }

  roundDownToFive(value: number) {
    return Math.floor(value / 5) * 5;
  }
  
  roundUpToFive(value: number) {
    return Math.ceil(value / 5) * 5;
  }

  getVerticalBorderLine() {
    return svg`
      <svg width="1" height="1024" viewBox="0 0 1 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="1024" fill="var(--border-outline-color)"/>
      </svg>
    `;
  }

  getHorizontalBorderLine() {
    return svg`
      <svg width="1024" height="1" viewBox="0 0 1024 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1024" height="1" fill="var(--border-outline-color)"/>
      </svg>
    `;
  }

  getVerticalSelectedLine() {
    return svg`
      <svg width="2" height="1024" viewBox="0 0 2 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="2" height="1024" fill="var(--alert-alarm-color)"/>
      </svg>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'ob-logging-graph-skipper': LoggingGraph;
  }
}