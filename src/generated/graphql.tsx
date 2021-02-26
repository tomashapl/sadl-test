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
  cars: Array<CarModel>;
  car: CarModel;
  carsFromFirebase: CarModelModel;
  user: ProfileModel;
  rentals: Array<RentalModel>;
};


export type QueryCarArgs = {
  id: Scalars['Float'];
};

export type CarModel = {
  __typename?: 'CarModel';
  id: Scalars['Float'];
  brand: Scalars['String'];
  model: Scalars['String'];
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


export type CarModelModel = {
  __typename?: 'CarModelModel';
  kodiaq?: Maybe<Array<CarModel>>;
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

export type RentalModel = {
  __typename?: 'RentalModel';
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
  subjectId: Scalars['Float'];
  status: Scalars['String'];
  car: CarModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshToken: AuthModel;
  login: SessionModel;
  register: SessionModel;
  createRental: RentalModel;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationLoginArgs = {
  values: LoginInput;
};


export type MutationRegisterArgs = {
  values: RegisterInput;
};


export type MutationCreateRentalArgs = {
  values: RentalInput;
};

export type AuthModel = {
  __typename?: 'AuthModel';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
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

export type RentalInput = {
  subjectID: Scalars['Float'];
  rentalFrom: Scalars['DateTime'];
  rentalTo: Scalars['DateTime'];
};

export type GetCarQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetCarQuery = (
  { __typename?: 'Query' }
  & { car: (
    { __typename?: 'CarModel' }
    & Pick<CarModel, 'id' | 'brand' | 'model' | 'imageURL' | 'status' | 'fuel' | 'type' | 'year' | 'registrationPlate'>
    & { reservations: Array<(
      { __typename?: 'CarModelReservation' }
      & Pick<CarModelReservation, 'from' | 'to'>
    )> }
  ) }
);

export type GetCarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarsQuery = (
  { __typename?: 'Query' }
  & { cars: Array<(
    { __typename?: 'CarModel' }
    & Pick<CarModel, 'id' | 'brand' | 'model' | 'imageURL'>
  )> }
);

export type CreateRentalMutationVariables = Exact<{
  values: RentalInput;
}>;


export type CreateRentalMutation = (
  { __typename?: 'Mutation' }
  & { createRental: (
    { __typename?: 'RentalModel' }
    & Pick<RentalModel, 'from' | 'to' | 'subjectId'>
  ) }
);

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

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken: (
    { __typename?: 'AuthModel' }
    & Pick<AuthModel, 'accessToken' | 'refreshToken'>
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


export const GetCarDocument = gql`
    query getCar($id: Float!) {
  car(id: $id) {
    id
    brand
    model
    imageURL
    status
    fuel
    type
    year
    registrationPlate
    reservations {
      from
      to
    }
  }
}
    `;

/**
 * __useGetCarQuery__
 *
 * To run a query within a React component, call `useGetCarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCarQuery(baseOptions: Apollo.QueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
        return Apollo.useQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, baseOptions);
      }
export function useGetCarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
          return Apollo.useLazyQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, baseOptions);
        }
export type GetCarQueryHookResult = ReturnType<typeof useGetCarQuery>;
export type GetCarLazyQueryHookResult = ReturnType<typeof useGetCarLazyQuery>;
export type GetCarQueryResult = Apollo.QueryResult<GetCarQuery, GetCarQueryVariables>;
export const GetCarsDocument = gql`
    query getCars {
  cars {
    id
    brand
    model
    imageURL
  }
}
    `;

/**
 * __useGetCarsQuery__
 *
 * To run a query within a React component, call `useGetCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarsQuery(baseOptions?: Apollo.QueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
        return Apollo.useQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, baseOptions);
      }
export function useGetCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
          return Apollo.useLazyQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, baseOptions);
        }
export type GetCarsQueryHookResult = ReturnType<typeof useGetCarsQuery>;
export type GetCarsLazyQueryHookResult = ReturnType<typeof useGetCarsLazyQuery>;
export type GetCarsQueryResult = Apollo.QueryResult<GetCarsQuery, GetCarsQueryVariables>;
export const CreateRentalDocument = gql`
    mutation createRental($values: RentalInput!) {
  createRental(values: $values) {
    from
    to
    subjectId
  }
}
    `;
export type CreateRentalMutationFn = Apollo.MutationFunction<CreateRentalMutation, CreateRentalMutationVariables>;

/**
 * __useCreateRentalMutation__
 *
 * To run a mutation, you first call `useCreateRentalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRentalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRentalMutation, { data, loading, error }] = useCreateRentalMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateRentalMutation(baseOptions?: Apollo.MutationHookOptions<CreateRentalMutation, CreateRentalMutationVariables>) {
        return Apollo.useMutation<CreateRentalMutation, CreateRentalMutationVariables>(CreateRentalDocument, baseOptions);
      }
export type CreateRentalMutationHookResult = ReturnType<typeof useCreateRentalMutation>;
export type CreateRentalMutationResult = Apollo.MutationResult<CreateRentalMutation>;
export type CreateRentalMutationOptions = Apollo.BaseMutationOptions<CreateRentalMutation, CreateRentalMutationVariables>;
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
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, baseOptions);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
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