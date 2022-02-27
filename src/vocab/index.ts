import { core } from './_core';
import { core2 } from './_core2';
import { activity } from './activity';
import { animals } from './animals';
import { drink } from './drink';
import { food } from './food';
import { home } from './home';
import { math } from './math'
import { media } from './media';
import { myself } from './myself';
import { numbers } from './numbers';
import { people } from './people';
import { places } from './places';
import { plants } from './plants';
import { routine } from './routine';
import { things } from './things';
import { weather } from './weather';

export type PageKey = keyof typeof vocab; 

export const vocab = {
    core,
    core2,
    activity,
    animals,
    drink,
    food,
    home,
    math,
    media,
    myself,
    numbers,
    people,
    places,
    plants,
    routine,
    things,
    weather
};
