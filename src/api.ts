import { RxHR } from '@akanass/rx-http-request';
import { INekoImage, INekoRoute, NekoImageMd } from './models/neko-image';
const baseAPIUrl = 'https://nekos.life/api/v2';

const defaultClient = RxHR.defaults({
  baseUrl: baseAPIUrl,
  json: true
});

export default {
  instance: () => {
    return defaultClient;
  },
  download: () => {
    return RxHR.defaults({});
  },
  nekoApi: {
    neko: () => defaultClient.get<INekoImage>('img/neko'),
    baka: () => defaultClient.get<INekoImage>('img/baka'),
    nsfw_neko_gif: () => defaultClient.get<INekoImage>('img/nsfw_neko_gif'),
    kiss: () => defaultClient.get<INekoImage>('img/kiss'),
    meow: () => defaultClient.get<INekoImage>('img/meow'),
    fox: () => defaultClient.get<INekoImage>('img/fox_girl')
  },
  getImageMds: async (): Promise<NekoImageMd[]> => (await import("./neko/images.env.json")).default.map((x: any) => {
    if (!x.apiBase) {
      x.apiBase = baseAPIUrl;
    }
    if (!x.path) {
      x.path = `img/${x.name}`;
    }
    return x;
  })
};
