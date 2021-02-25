import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  cars: CarModelModel;
  user: ProfileModel;
};

export type CarModelModel = {
  __typename?: 'CarModelModel';
  kodiaq?: Maybe<Array<CarModel>>;
};

export type CarModel = {
  __typename?: 'CarModel';
  id: Scalars['Float'];
  brand: Scalars['String'];
  currency: Scalars['String'];
  fuel: Scalars['String'];
  type: Type;
  groupId: Scalars['String'];
  location: CarModelLocation;
  imageURL: Scalars['String'];
  pricePerDay: Scalars['Float'];
  registrationPlate: Scalars['String'];
  status: Scalars['String'];
  subjectTypeId: Scalars['Float'];
  year: Scalars['String'];
  reservations: Array<CarModelReservation>;
};

export enum Type {
  Suv = 'SUV'
}

export type CarModelLocation = {
  __typename?: 'CarModelLocation';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CarModelReservation = {
  __typename?: 'CarModelReservation';
  id: Scalars['Float'];
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};


export type ProfileModel = {
  __typename?: 'ProfileModel';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: SessionModel;
  register: SessionModel;
};


export type MutationLoginArgs = {
  values: LoginInput;
};


export type MutationRegisterArgs = {
  values: RegisterInput;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  profile: ProfileModel;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  values: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'SessionModel' }
    & Pick<SessionModel, 'accessToken' | 'refreshToken'>
    & { profile: (
      { __typename?: 'ProfileModel' }
      & Pick<ProfileModel, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'ProfileModel' }
    & Pick<ProfileModel, 'id' | 'firstName' | 'lastName' | 'email'>
  ) }
);


export const LoginDocument = gql`
    mutation login($values: LoginInput!) {
  login(values: $values) {
    accessToken
    refreshToken
    profile {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;