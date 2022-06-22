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
};

export type Mutation = {
  __typename?: 'Mutation';
  addSubscription?: Maybe<Subscription>;
  theme?: Maybe<Scalars['String']>;
};


export type MutationAddSubscriptionArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationThemeArgs = {
  theme?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  color?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  profilPicture?: Maybe<Scalars['String']>;
  subscriptions?: Maybe<Array<Maybe<Subscription>>>;
  theme?: Maybe<Scalars['String']>;
};

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', email: string, theme?: string | null, profilPicture?: string | null } | null };

export type ChangeThemeMutationVariables = Exact<{
  theme: Scalars['String'];
}>;


export type ChangeThemeMutation = { __typename?: 'Mutation', theme?: string | null };
