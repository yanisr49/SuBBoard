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

export type Mutation = {
  __typename?: 'Mutation';
  addSubscription?: Maybe<Subscription>;
  addTTDay?: Maybe<TtDays>;
  removeTTDay?: Maybe<TtDays>;
  theme?: Maybe<Scalars['String']>;
};


export type MutationAddSubscriptionArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
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
  ttDays?: Maybe<Array<Maybe<TtDays>>>;
  user?: Maybe<User>;
};


export type QueryTtDaysArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};

export type Subscription = {
  __typename?: 'Subscription';
  color?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  subscriptions?: Maybe<Array<Maybe<Subscription>>>;
  theme?: Maybe<Scalars['String']>;
};
