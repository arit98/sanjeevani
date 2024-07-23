import V1 from '../img/vitamin.png'
import G1 from '../img/GAS.png'
import A1 from '../img/antibiotics.png'
import B1 from '../img/baby.png'
import P1 from "../img/pain.webp"
import I1 from "../img/ic_diabetes.webp"
import C1 from "../img/cold.webp"
import S1 from "../img/syrup.png"
import G2 from "../img/gyno.png"

export const categories = [
  {
    id: 1,
    name: 'Gastric',
    imgURL: G1,
    category_name: 'Gastric',
  },
  {
    id: 2,
    name: 'Daily Use',
    imgURL: C1,
    category_name: 'Daily Use',
  },
  {
    id: 3,
    name: 'Antibiotics',
    imgURL: A1,
    category_name: 'bellypain',
  },
  {
    id: 4,
    name: 'Syrup',
    imgURL: S1,
    category_name: 'headache',
  },
  {
    id: 5,
    name: 'Vitamin',
    imgURL: V1,
    category_name: 'pressure',
  },
  {
    id: 6,
    name: 'Baby Care',
    imgURL: B1,
    category_name: 'baby care',
  },

  {
    id: 7,
    name: 'Gynocology',
    imgURL: G2,
    category_name: 'gynocology',
  },

  {
    id: 8,
    name: 'Sugar',
    imgURL: I1,
    category_name: 'sugar',
  },

  {
    id: 9,
    name: 'Pain Killer',
    imgURL: P1,
    category_name: 'painkiller',
  },
]