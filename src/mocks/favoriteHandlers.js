import { rest } from 'msw'

const baseUrl = 'http://localhost:8082'

export const handlers = [
  rest.get(baseUrl + '/myFavorite/all', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true')

    // the response from backend is `recipe/all` format instead of `overview` format
    // but here we only need `overview` format
    // backend TODO: change the format
    return res(
      ctx.status(200),
      ctx.json([
        { id: 2, name: '海鮮泰式涼麵', version: 'NORMAL', likesCount: 0, price: 100.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-photo-4518892.jpg' }, { id: 3, name: '南瓜濃湯', version: 'NORMAL', likesCount: 0, price: 60.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-jess-vide-5507642.jpg' }, { id: 4, name: '雞腿南蠻風三明治', version: 'LOWFAT', likesCount: 0, price: 100.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-geraud-pfeiffer-6608664.jpg' }, { id: 5, name: '海鮮泰式涼麵', version: 'LOWFAT', likesCount: 0, price: 70.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-photo-4518892.jpg' }, { id: 6, name: '南瓜濃湯', version: 'LOWFAT', likesCount: 0, price: 100.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-jess-vide-5507642.jpg' }, { id: 7, name: '南瓜濃湯', version: 'VAGE', likesCount: 0, price: 100.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-jess-vide-5507642.jpg' }, { id: 8, name: '海鮮泰式涼麵', version: 'MEAT', likesCount: 0, price: 130.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-photo-4518892.jpg' }, { id: 9, name: '雞腿南蠻風三明治', version: 'MEAT', likesCount: 0, price: 149.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-geraud-pfeiffer-6608664.jpg' }, { id: 10, name: '提拉米蘇', version: 'NORMAL', likesCount: 0, price: 100.0, photo: 'https://easycook-backend.s3.amazonaws.com/recipe/pexels-delphine-hourlay-691152.jpg' }],
      ),
    )
  }),
]
