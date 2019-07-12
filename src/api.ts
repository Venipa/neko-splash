import { RxHR } from '@akanass/rx-http-request';
import { INekoImage, INekoRoute } from './models/neko-image';

const defaultClient = RxHR.defaults({
  baseUrl: 'https://nekos.life/api/v2',
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
  getImageMds: () => {
    const importAll = (r: any) => r.keys().map(r);
    return importAll(require.context('./neko/images/', false, /\.image\.\.md$/))
      .sort()
      .reverse();
  }
};
