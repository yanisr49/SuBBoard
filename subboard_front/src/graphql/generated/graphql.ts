export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum Frequency {
  Annual = 'ANNUAL',
  Biannual = 'BIANNUAL',
  Bimonthly = 'BIMONTHLY',
  Biquarterly = 'BIQUARTERLY',
  Custom = 'CUSTOM',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addSubscription?: Maybe<Subscription>;
  addTTDay?: Maybe<TtDays>;
  removeTTDay?: Maybe<TtDays>;
  theme?: Maybe<Scalars['String']>;
};


export type MutationAddSubscriptionArgs = {
  color: Scalars['String'];
  customFrequency?: InputMaybe<Scalars['Int']>;
  dueDate: Scalars['Date'];
  endDatePromotion?: InputMaybe<Scalars['Date']>;
  frequency: Frequency;
  logo: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  promotion?: InputMaybe<Scalars['Float']>;
};


export type MutationAddTtDayArgs = {
  date: Scalars['Date'];
};


export type MutationRemoveTtDayArgs = {
  date: Scalars['Date'];
};


export type MutationThemeArgs = {
  theme?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  subscriptions?: Maybe<Array<Maybe<Subscription>>>;
  ttDays?: Maybe<Array<Maybe<TtDays>>>;
  user?: Maybe<User>;
};


export type QuerySubscriptionsArgs = {
  name?: InputMaybe<Scalars['Date']>;
};


export type QueryTtDaysArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};

export type Subscription = {
  __typename?: 'Subscription';
  color: Scalars['String'];
  customFrequency?: Maybe<Scalars['Int']>;
  dueDate: Scalars['Date'];
  endDatePromotion?: Maybe<Scalars['Date']>;
  frequency: Frequency;
  initDate: Scalars['Date'];
  logo: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  promotion?: Maybe<Scalars['Float']>;
  userEmail: Scalars['String'];
};

export type TtDays = {
  __typename?: 'TTDays';
  date: Scalars['Date'];
  userEmail: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  profilPicture?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
};
