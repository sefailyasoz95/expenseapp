export type InitialState = {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
};

export type AppStackParams = {
  HomeStack: undefined;
  SettingsScreen: undefined;
  DashboardScreen: screen;
};

export type HomeStackParams = {
  HomeScreen: undefined;
  ActivityItemScreen: {
    cards: ICard[];
    activityItems: IActivity[];
    selectedActivityItem?: IActivity;
  };
};

export type ICard = {
  id: number;
  cardNumber: string;
  cardDisplayNumber: string;
  cardHolder: string;
  validThru: string;
  cvv: string;
  cardType?: string;
};
export type IActivityType = 'expense' | 'income';
// export type ICategory =
//   | 'fun'
//   | 'bills'
//   | 'salary'
//   | 'transportation'
//   | 'kitchen'
//   | 'transaction'
//   | 'outsource'
//   | 'rent'
//   | 'creditCard'
//   | 'credit'
//   | 'food'
//   | 'other'
//   | 'gasoline'
//   | 'car'
export type ICategory = {id: number; key: string; value: string};
export type IActivity = {
  id: number;
  type: IActivityType;
  price: number;
  date: string;
  description: string;
  category: string;
  cardId?: number;
};
