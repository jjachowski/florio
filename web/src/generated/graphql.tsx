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
};

export type Query = {
  __typename?: 'Query';
  plants: Array<Plant>;
  plant?: Maybe<Plant>;
  plantNames: Array<PlantName>;
  me?: Maybe<User>;
};


export type QueryPlantArgs = {
  id: Scalars['Int'];
};

export type Plant = {
  __typename?: 'Plant';
  id: Scalars['Float'];
  names: Array<PlantName>;
  imageUrl: Scalars['String'];
  characteristics: Array<Scalars['String']>;
  description: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PlantName = {
  __typename?: 'PlantName';
  id: Scalars['Float'];
  name: Scalars['String'];
  isPrimary: Scalars['Boolean'];
  plantId: Scalars['Float'];
  plant: Plant;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  accountType: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlant: PlantResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddPlantArgs = {
  characteristics: Array<Scalars['String']>;
  imageUrl: Scalars['String'];
  description: Scalars['String'];
  otherNames: Array<Scalars['String']>;
  primaryName: Scalars['String'];
};


export type MutationRegisterArgs = {
  credentials: RegisterCredentials;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type PlantResponse = {
  __typename?: 'PlantResponse';
  errors?: Maybe<Array<PlantError>>;
  plant?: Maybe<Plant>;
};

export type PlantError = {
  __typename?: 'PlantError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterCredentials = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type FullPlantFragment = (
  { __typename?: 'Plant' }
  & Pick<Plant, 'id' | 'createdAt' | 'updatedAt' | 'description'>
  & { names: Array<(
    { __typename?: 'PlantName' }
    & Pick<PlantName, 'name' | 'isPrimary'>
  )> }
);

export type AddPlantMutationVariables = Exact<{
  primaryName: Scalars['String'];
  otherNames: Array<Scalars['String']>;
  description: Scalars['String'];
  characteristics: Array<Scalars['String']>;
  imageUrl: Scalars['String'];
}>;


export type AddPlantMutation = (
  { __typename?: 'Mutation' }
  & { addPlant: (
    { __typename?: 'PlantResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'PlantError' }
      & Pick<PlantError, 'field' | 'message'>
    )>>, plant?: Maybe<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'description'>
      & { names: Array<(
        { __typename?: 'PlantName' }
        & Pick<PlantName, 'name' | 'isPrimary'>
      )> }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'accountType' | 'email' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'accountType' | 'email' | 'username'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'accountType' | 'email'>
  )> }
);

export type PlantQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PlantQuery = (
  { __typename?: 'Query' }
  & { plant?: Maybe<(
    { __typename?: 'Plant' }
    & FullPlantFragment
  )> }
);

export type PlantNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type PlantNamesQuery = (
  { __typename?: 'Query' }
  & { plantNames: Array<(
    { __typename?: 'PlantName' }
    & Pick<PlantName, 'name' | 'isPrimary' | 'plantId'>
  )> }
);

export type PlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & FullPlantFragment
  )> }
);

export const FullPlantFragmentDoc = gql`
    fragment FullPlant on Plant {
  id
  createdAt
  updatedAt
  description
  names {
    name
    isPrimary
  }
}
    `;
export const AddPlantDocument = gql`
    mutation AddPlant($primaryName: String!, $otherNames: [String!]!, $description: String!, $characteristics: [String!]!, $imageUrl: String!) {
  addPlant(
    primaryName: $primaryName
    otherNames: $otherNames
    description: $description
    characteristics: $characteristics
    imageUrl: $imageUrl
  ) {
    errors {
      field
      message
    }
    plant {
      names {
        name
        isPrimary
      }
      description
    }
  }
}
    `;
export type AddPlantMutationFn = Apollo.MutationFunction<AddPlantMutation, AddPlantMutationVariables>;

/**
 * __useAddPlantMutation__
 *
 * To run a mutation, you first call `useAddPlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlantMutation, { data, loading, error }] = useAddPlantMutation({
 *   variables: {
 *      primaryName: // value for 'primaryName'
 *      otherNames: // value for 'otherNames'
 *      description: // value for 'description'
 *      characteristics: // value for 'characteristics'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useAddPlantMutation(baseOptions?: Apollo.MutationHookOptions<AddPlantMutation, AddPlantMutationVariables>) {
        return Apollo.useMutation<AddPlantMutation, AddPlantMutationVariables>(AddPlantDocument, baseOptions);
      }
export type AddPlantMutationHookResult = ReturnType<typeof useAddPlantMutation>;
export type AddPlantMutationResult = Apollo.MutationResult<AddPlantMutation>;
export type AddPlantMutationOptions = Apollo.BaseMutationOptions<AddPlantMutation, AddPlantMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      accountType
      email
      username
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(credentials: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      accountType
      email
      username
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    accountType
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PlantDocument = gql`
    query Plant($id: Int!) {
  plant(id: $id) {
    ...FullPlant
  }
}
    ${FullPlantFragmentDoc}`;

/**
 * __usePlantQuery__
 *
 * To run a query within a React component, call `usePlantQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlantQuery(baseOptions: Apollo.QueryHookOptions<PlantQuery, PlantQueryVariables>) {
        return Apollo.useQuery<PlantQuery, PlantQueryVariables>(PlantDocument, baseOptions);
      }
export function usePlantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlantQuery, PlantQueryVariables>) {
          return Apollo.useLazyQuery<PlantQuery, PlantQueryVariables>(PlantDocument, baseOptions);
        }
export type PlantQueryHookResult = ReturnType<typeof usePlantQuery>;
export type PlantLazyQueryHookResult = ReturnType<typeof usePlantLazyQuery>;
export type PlantQueryResult = Apollo.QueryResult<PlantQuery, PlantQueryVariables>;
export const PlantNamesDocument = gql`
    query PlantNames {
  plantNames {
    name
    isPrimary
    plantId
  }
}
    `;

/**
 * __usePlantNamesQuery__
 *
 * To run a query within a React component, call `usePlantNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlantNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlantNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlantNamesQuery(baseOptions?: Apollo.QueryHookOptions<PlantNamesQuery, PlantNamesQueryVariables>) {
        return Apollo.useQuery<PlantNamesQuery, PlantNamesQueryVariables>(PlantNamesDocument, baseOptions);
      }
export function usePlantNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlantNamesQuery, PlantNamesQueryVariables>) {
          return Apollo.useLazyQuery<PlantNamesQuery, PlantNamesQueryVariables>(PlantNamesDocument, baseOptions);
        }
export type PlantNamesQueryHookResult = ReturnType<typeof usePlantNamesQuery>;
export type PlantNamesLazyQueryHookResult = ReturnType<typeof usePlantNamesLazyQuery>;
export type PlantNamesQueryResult = Apollo.QueryResult<PlantNamesQuery, PlantNamesQueryVariables>;
export const PlantsDocument = gql`
    query Plants {
  plants {
    ...FullPlant
  }
}
    ${FullPlantFragmentDoc}`;

/**
 * __usePlantsQuery__
 *
 * To run a query within a React component, call `usePlantsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlantsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlantsQuery(baseOptions?: Apollo.QueryHookOptions<PlantsQuery, PlantsQueryVariables>) {
        return Apollo.useQuery<PlantsQuery, PlantsQueryVariables>(PlantsDocument, baseOptions);
      }
export function usePlantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlantsQuery, PlantsQueryVariables>) {
          return Apollo.useLazyQuery<PlantsQuery, PlantsQueryVariables>(PlantsDocument, baseOptions);
        }
export type PlantsQueryHookResult = ReturnType<typeof usePlantsQuery>;
export type PlantsLazyQueryHookResult = ReturnType<typeof usePlantsLazyQuery>;
export type PlantsQueryResult = Apollo.QueryResult<PlantsQuery, PlantsQueryVariables>;