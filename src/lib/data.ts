import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const colors = ['#6C4327', '#F9F4F0', '#D0A343', '#A5A5A5', '#333333'];

export const ALL_COLORS = [
  { name: 'Clay Brown', value: '#6C4327' },
  { name: 'Soft Beige', value: '#F9F4F0' },
  { name: 'Caramel Gold', value: '#D0A343' },
  { name: 'Stone Gray', value: '#A5A5A5' },
  { name: 'Charcoal', value: '#333333' },
  { name: 'Terracotta', value: '#E2725B' },
  { name: 'Forest Green', value: '#228B22' },
];


export const initialProducts: Product[] = [
  {
    id: PlaceHolderImages[0].id,
    name: 'Artisan Vase',
    description: PlaceHolderImages[0].description,
    price: 120,
    colors: [colors[0], colors[1]],
    image: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
  },
  {
    id: PlaceHolderImages[1].id,
    name: 'Kintsugi Bowl',
    description: PlaceHolderImages[1].description,
    price: 95,
    colors: [colors[1], colors[2], colors[4]],
    image: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
  },
  {
    id: PlaceHolderImages[2].id,
    name: 'Wabi-sabi Mug',
    description: PlaceHolderImages[2].description,
    price: 45,
    colors: [colors[3], colors[1]],
    image: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint,
  },
  {
    id: PlaceHolderImages[3].id,
    name: 'Earthen Plates (Set of 4)',
    description: PlaceHolderImages[3].description,
    price: 180,
    colors: [colors[0], colors[3]],
    image: PlaceHolderImages[3].imageUrl,
    imageHint: PlaceHolderImages[3].imageHint,
  },
  {
    id: PlaceHolderImages[4].id,
    name: 'Ceramic Planter',
    description: PlaceHolderImages[4].description,
    price: 75,
    colors: [colors[0], colors[1], colors[2]],
    image: PlaceHolderImages[4].imageUrl,
    imageHint: PlaceHolderImages[4].imageHint,
  },
  {
    id: PlaceHolderImages[5].id,
    name: 'Classic Pitcher',
    description: PlaceHolderImages[5].description,
    price: 85,
    colors: [colors[1]],
    image: PlaceHolderImages[5].imageUrl,
    imageHint: PlaceHolderImages[5].imageHint,
  },
];
