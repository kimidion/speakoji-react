import { ACTIONS } from './actions';
import { COLORS } from './colors';

export interface Word {
    y: number;
    x: number;
    word?: string;
    icon?: string;
    emoji?: string;
    bg?: string;
    expand?: string[];
    action?: string;
    filtered?: boolean;
}

// bottom row only moves to new pages
// static rightmost column for navigational elements
export const clear = { y: 0, x: 11, word: "CLEAR", icon: "clear_all", emoji: "", action: ACTIONS.CLEAR, bg: COLORS.LIGHTGREY };
export const back = { y: 1, x: 11, word: "BACK", icon: "settings_backup_restore", emoji: "", action: ACTIONS.BACK, bg: COLORS.LIGHTGREY };
export const pluralize = { y: 2, x: 11, word: "PLURAL", icon: "", emoji: "+s", action: ACTIONS.PLURALIZE, bg: COLORS.LIGHTGREY };
export const keyboard = { y: 3, x: 11, word: "QWERTY", icon: "keyboard", emoji: "", action: ACTIONS.KEYBOARD, bg: COLORS.LIGHTGREY };
export const expand = { y: 4, x: 11, word: "", icon: "", emoji: "", action: null, bg: " " };
export const filter =  { y: 5, x: 11, word: "FILTER", icon: "filter_list", emoji: "", action: ACTIONS.FILTER, bg: COLORS.LIGHTGREY };
export const settings = { y: 6, x: 11, word: "SETTINGS", icon: "menu", emoji: "", action: ACTIONS.SETTINGS, bg: COLORS.LIGHTGREY };

const row1 = [
    { y: 0, x: 0 },
    { y: 0, x: 1 },
    { y: 0, x: 2 },
    { y: 0, x: 3 },
    { y: 0, x: 4 },
    { y: 0, x: 5 },
    { y: 0, x: 6 },
    { y: 0, x: 7 },
    { y: 0, x: 8 },
    { y: 0, x: 9 },
    { y: 0, x: 10 },
    clear
] as Word[];
const row2 = [
    { y: 1, x: 0 },
    { y: 1, x: 1 },
    { y: 1, x: 2 },
    { y: 1, x: 3 },
    { y: 1, x: 4 },
    { y: 1, x: 5 },
    { y: 1, x: 6 },
    { y: 1, x: 7 },
    { y: 1, x: 8 },
    { y: 1, x: 9 },
    { y: 1, x: 10 },
    back
] as Word[];
const row3 = [
    { y: 2, x: 0 },
    { y: 2, x: 1 },
    { y: 2, x: 2 },
    { y: 2, x: 3 },
    { y: 2, x: 4 },
    { y: 2, x: 5 },
    { y: 2, x: 6 },
    { y: 2, x: 7 },
    { y: 2, x: 8 },
    { y: 2, x: 9 },
    { y: 2, x: 10 },
    keyboard
] as Word[];
const row4 = [
    { y: 3, x: 0 },
    { y: 3, x: 1 },
    { y: 3, x: 2 },
    { y: 3, x: 3 },
    { y: 3, x: 4 },
    { y: 3, x: 5 },
    { y: 3, x: 6 },
    { y: 3, x: 7 },
    { y: 3, x: 8 },
    { y: 3, x: 9 },
    { y: 3, x: 10 },
    pluralize
] as Word[];
const row5 = [
    { y: 4, x: 0 },
    { y: 4, x: 1 },
    { y: 4, x: 2 },
    { y: 4, x: 3 },
    { y: 4, x: 4 },
    { y: 4, x: 5 },
    { y: 4, x: 6 },
    { y: 4, x: 7 },
    { y: 4, x: 8 },
    { y: 4, x: 9 },
    { y: 4, x: 10 },
    expand
];
const row6 = [
    { y: 5, x: 0 },
    { y: 5, x: 1 },
    { y: 5, x: 2 },
    { y: 5, x: 3 },
    { y: 5, x: 4 },
    { y: 5, x: 5 },
    { y: 5, x: 6 },
    { y: 5, x: 7 },
    { y: 5, x: 8 },
    { y: 5, x: 9 },
    { y: 5, x: 10 },
    filter
] as Word[];
const row7 = [
    { y: 6, x: 0 },
    { y: 6, x: 1 },
    { y: 6, x: 2 },
    { y: 6, x: 3 },
    { y: 6, x: 4 },
    { y: 6, x: 5 },
    { y: 6, x: 6 },
    { y: 6, x: 7 },
    { y: 6, x: 8 },
    { y: 6, x: 9 },
    { y: 6, x: 10 },
    settings
] as Word[];

export const keyGrid = [row1, row2, row3, row4, row5, row6, row7] as Word[][];