import type { Coffee } from '../models/Coffee';

export const coffees: Coffee[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Rich and bold single shot of coffee',
    price: 3.0,
    imageEmoji: '☕',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.5,
    imageEmoji: '☕',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Smooth espresso with lots of steamed milk',
    price: 5.0,
    imageEmoji: '🥛',
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water',
    price: 3.5,
    imageEmoji: '☕',
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk',
    price: 5.5,
    imageEmoji: '🍫',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Double espresso with velvety steamed milk',
    price: 4.0,
    imageEmoji: '🤍',
  },
];
