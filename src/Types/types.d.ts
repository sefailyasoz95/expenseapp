export type InitialState = {
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
  activities: IActivity[];
  isWelcomePassed: boolean;
  cards: ICard[];
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
  card?: ICard;
};

export type CreateActivityType = {
  type: IActivityType;
  price: number;
  date: string;
  description: string;
  category: string;
  cardId?: number;
  deviceId: string;
};

export type GenericApiResponse = {
  message: string;
  statusCode: number;
  data: any;
};

export type CreateUserType = {
  deviceId: string;
  gender: string;
  email: string;
  dateOfBirth: Date;
  isPremium: boolean;
};

export type CreateCardType = {
  cardNumber: string;
  validThru: string;
  cardHolder: string;
  cardDisplayNumber: string;
  cvv: string;
  userEmail: string;
};
