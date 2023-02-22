import {IActivity, ICard, ICategory} from '../Types/types';

export const Activities: IActivity[] = [
  {
    id: 1,
    description: 'Aralık ayı maaşı',
    type: 'income',
    category: 'salary',
    date: '05.01.2023',
    price: 20000,
    cardId: 1,
  },
  {
    id: 2,
    description: 'Haftalık mutfak alışverişi',
    type: 'expense',
    category: 'kitchen',
    date: '12.01.2023',
    price: 700,
    cardId: 2,
  },
  {
    id: 3,
    description: 'Sonay sürücü kursu taksidi',
    type: 'expense',
    category: 'kitchen',
    date: '20.01.2023',
    price: 1500,
  },
  {
    id: 4,
    description: 'Haftalık mutfak alışverişi',
    type: 'expense',
    category: 'kitchen',
    date: '22.01.2023',
    price: 400,
  },
  {
    id: 5,
    description: 'Freelancing',
    type: 'income',
    category: 'salary',
    date: '22.01.2023',
    price: 15000,
  },
  {
    id: 6,
    description: 'Ocak Ayı Kirası',
    type: 'expense',
    category: 'rent',
    date: '05.01.2023',
    price: 3500,
  },
  {
    id: 7,
    description: 'Ocak Ayı Kredi Ödemesi',
    type: 'expense',
    category: 'credit',
    date: '05.01.2023',
    price: 4990,
  },
  {
    id: 8,
    description: 'Ocak Ayı Kredi Kartı Ödemesi',
    type: 'expense',
    category: 'creditCard',
    date: '05.01.2023',
    price: 8000,
  },
];

// export const ActivityCategoryNames = [
//   {
//     other: 'Diğer',
//     kitchen: 'Mutfak',
//     fun: 'Eğlence',
//     bills: 'Faturalar',
//     salary: 'Maaş',
//     transportation: 'Ulaşım',
//     transaction: 'Para Aktarma',
//     outsource: 'Ek Gelir',
//     rent: 'Kira',
//     creditCard: 'Kredi Kartı',
//     credit: 'Kredi Ödemesi',
//     food: 'Yemek',
//     gasoline: 'Benzin',
//     car: 'Araba',
//   };
// ]

export const ActivityCategoryNames: ICategory[] = [
  {id: 12, key: 'Other', value: 'Diğer'},
  {id: 1, key: 'Fun', value: 'Eğlence'},
  {id: 2, key: 'Bills', value: 'Faturalar'},
  {id: 3, key: 'Salary', value: 'Maaş'},
  {id: 4, key: 'Transportation', value: 'Ulaşım'},
  {id: 5, key: 'Kitchen', value: 'Mutfak'},
  {id: 6, key: 'Money', value: 'Para Aktarma'},
  {id: 7, key: 'Extra', value: 'Ek Gelir'},
  {id: 8, key: 'Rent', value: 'Kira'},
  {id: 9, key: 'CreditCard', value: 'Kredi Kartı'},
  {id: 10, key: 'Credit', value: 'Kredi'},
  {id: 11, key: 'Meal', value: 'Yemek'},
  {id: 13, key: 'Gas', value: 'Benzin'},
  {id: 14, key: 'Car', value: 'Araba'},
];

export const CategoryNames = {
  Other: 'Diğer',
  Fun: 'Eğlence',
  Bills: 'Faturalar',
  Salary: 'Maaş',
  Transportation: 'Ulaşım',
  Kitchen: 'Mutfak',
  Money: 'Para Aktarma',
  Extra: 'Ek Gelir',
  Rent: 'Kira',
  CreditCard: 'Kredi Kartı',
  Credit: 'Kredi',
  Meal: 'Yemek',
  Gas: 'Benzin',
  Car: 'Araba',
};
