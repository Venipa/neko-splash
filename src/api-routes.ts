import api from './api';
import { INekoRoute } from './models/neko-image';

export const NekRoutes: INekoRoute[] = [
  {
    displayName: 'Neko',
    name: 'neko',
    request: api.nekoApi.neko
  },
  {
    displayName: 'Fox',
    name: 'fox',
    request: api.nekoApi.fox
  },
  {
    displayName: 'Kiss',
    name: 'kiss',
    request: api.nekoApi.kiss
  },
  {
    displayName: 'Baka',
    name: 'baka',
    request: api.nekoApi.baka
  }
];
