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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  plants: Array<Plant>;
  plant?: Maybe<Plant>;
  plantNames: Array<PlantName>;
  reportedPlants: Array<ReportedPlantResponse>;
  me?: Maybe<User>;
};


export type QueryPlantArgs = {
  id: Scalars['Int'];
};

export type Plant = {
  __typename?: 'Plant';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  score: Scalars['Float'];
  images: Array<Scalars['String']>;
  isReported: Scalars['Boolean'];
  primaryName: Scalars['String'];
  otherNames: Array<Scalars['String']>;
  optimalConditions?: Maybe<Array<OptimalConditions>>;
  description: Scalars['String'];
  isCatFriendly: Scalars['Boolean'];
  isCatFriendlySource?: Maybe<Scalars['String']>;
  isDogFriendly: Scalars['Boolean'];
  isDogFriendlySource?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  descriptionSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  accountType: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  likedPlants: Array<Scalars['Int']>;
  upvotedReportsIds: Array<Scalars['Int']>;
  downvotedReportsIds: Array<Scalars['Int']>;
};

export type OptimalConditions = {
  __typename?: 'OptimalConditions';
  id: Scalars['Float'];
  season: Scalars['Float'];
  water: Scalars['Float'];
  sun: Scalars['Float'];
  airHumidityLow: Scalars['Float'];
  airHumidityHigh: Scalars['Float'];
  temperatureLow: Scalars['Float'];
  temperatureHigh: Scalars['Float'];
  plantId: Scalars['Float'];
  plant: Plant;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PlantName = {
  __typename?: 'PlantName';
  plantId: Scalars['Int'];
  name: Scalars['String'];
};

export type ReportedPlantResponse = {
  __typename?: 'ReportedPlantResponse';
  plant: Plant;
  report: PlantReport;
};

export type PlantReport = {
  __typename?: 'PlantReport';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  plantId: Scalars['Float'];
  plant: Plant;
  reason: Scalars['String'];
  score: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLike: Scalars['Boolean'];
  removeLike: Scalars['Boolean'];
  editPlant: PlantResponse;
  addOptimalConditions: OptimalConditionsResponse;
  addPlant: PlantResponse;
  upload: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  reportPlant: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddLikeArgs = {
  plantId: Scalars['Int'];
};


export type MutationRemoveLikeArgs = {
  plantId: Scalars['Int'];
};


export type MutationEditPlantArgs = {
  imagesToDelete: Array<Scalars['String']>;
  editData: PlantFieldsInput;
  id: Scalars['Int'];
};


export type MutationAddOptimalConditionsArgs = {
  data: OptimalConditionsInput;
  plantId: Scalars['Int'];
};


export type MutationAddPlantArgs = {
  data: PlantFieldsInput;
};


export type MutationUploadArgs = {
  images: Array<Scalars['Upload']>;
};


export type MutationVoteArgs = {
  voteValue: Scalars['Int'];
  reportId: Scalars['Int'];
};


export type MutationReportPlantArgs = {
  reason: Scalars['String'];
  plantId: Scalars['Int'];
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
  errors?: Maybe<Array<FieldError>>;
  plant?: Maybe<Plant>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PlantFieldsInput = {
  primaryName: Scalars['String'];
  otherNames: Array<Scalars['String']>;
  description: Scalars['String'];
  isCatFriendly: Scalars['Boolean'];
  isCatFriendlySource?: Maybe<Scalars['String']>;
  isDogFriendly: Scalars['Boolean'];
  isDogFriendlySource?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['Upload']>>;
};


export type OptimalConditionsResponse = {
  __typename?: 'OptimalConditionsResponse';
  errors?: Maybe<Array<FieldError>>;
  optimalConditions?: Maybe<OptimalConditions>;
};

export type OptimalConditionsInput = {
  season: Scalars['Int'];
  water: Scalars['Int'];
  sun: Scalars['Int'];
  airHumidityLow: Scalars['Float'];
  airHumidityHigh: Scalars['Float'];
  temperatureLow: Scalars['Float'];
  temperatureHigh: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegisterCredentials = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type FullPlantFragment = (
  { __typename?: 'Plant' }
  & Pick<Plant, 'id' | 'createdAt' | 'updatedAt' | 'primaryName' | 'otherNames' | 'images' | 'isCatFriendly' | 'isCatFriendlySource' | 'isDogFriendly' | 'isDogFriendlySource' | 'description'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), optimalConditions?: Maybe<Array<(
    { __typename?: 'OptimalConditions' }
    & OptimalConditionsFragment
  )>> }
);

export type OptimalConditionsFragment = (
  { __typename?: 'OptimalConditions' }
  & Pick<OptimalConditions, 'season' | 'water' | 'sun' | 'airHumidityLow' | 'airHumidityHigh' | 'temperatureLow' | 'temperatureHigh'>
);

export type PlantPreviewFragment = (
  { __typename?: 'Plant' }
  & Pick<Plant, 'id' | 'createdAt' | 'updatedAt' | 'primaryName' | 'otherNames' | 'images' | 'isCatFriendly' | 'isDogFriendly' | 'descriptionSnippet'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
  ) }
);

export type PlantReportFragment = (
  { __typename?: 'ReportedPlantResponse' }
  & { plant: (
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'primaryName' | 'otherNames' | 'descriptionSnippet' | 'images'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ), report: (
    { __typename?: 'PlantReport' }
    & Pick<PlantReport, 'id' | 'score' | 'reason'>
  ) }
);

export type AddOptimalConditionsMutationVariables = Exact<{
  plantId: Scalars['Int'];
  data: OptimalConditionsInput;
}>;


export type AddOptimalConditionsMutation = (
  { __typename?: 'Mutation' }
  & { addOptimalConditions: (
    { __typename?: 'OptimalConditionsResponse' }
    & { optimalConditions?: Maybe<(
      { __typename?: 'OptimalConditions' }
      & Pick<OptimalConditions, 'id' | 'plantId'>
      & OptimalConditionsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AddPlantMutationVariables = Exact<{
  data: PlantFieldsInput;
}>;


export type AddPlantMutation = (
  { __typename?: 'Mutation' }
  & { addPlant: (
    { __typename?: 'PlantResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, plant?: Maybe<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'primaryName' | 'otherNames' | 'description' | 'images'>
      & { optimalConditions?: Maybe<Array<(
        { __typename?: 'OptimalConditions' }
        & OptimalConditionsFragment
      )>> }
    )> }
  ) }
);

export type DislikePlantMutationVariables = Exact<{
  plantId: Scalars['Int'];
}>;


export type DislikePlantMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLike'>
);

export type EditPlantMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PlantFieldsInput;
  imagesToDelete: Array<Scalars['String']>;
}>;


export type EditPlantMutation = (
  { __typename?: 'Mutation' }
  & { editPlant: (
    { __typename?: 'PlantResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, plant?: Maybe<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'id' | 'creatorId' | 'primaryName' | 'otherNames' | 'images' | 'description' | 'isCatFriendly' | 'isDogFriendly' | 'isCatFriendlySource' | 'isDogFriendlySource'>
    )> }
  ) }
);

export type LikePlantMutationVariables = Exact<{
  plantId: Scalars['Int'];
}>;


export type LikePlantMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addLike'>
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

export type ReportPlantMutationVariables = Exact<{
  plantId: Scalars['Int'];
  reason: Scalars['String'];
}>;


export type ReportPlantMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reportPlant'>
);

export type UploadFileTestMutationVariables = Exact<{
  images: Array<Scalars['Upload']>;
}>;


export type UploadFileTestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'upload'>
);

export type VoteReportMutationVariables = Exact<{
  reportId: Scalars['Int'];
  voteValue: Scalars['Int'];
}>;


export type VoteReportMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'accountType' | 'email' | 'likedPlants' | 'upvotedReportsIds' | 'downvotedReportsIds'>
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
    & Pick<PlantName, 'plantId' | 'name'>
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

export type PlantsPreviewQueryVariables = Exact<{ [key: string]: never; }>;


export type PlantsPreviewQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & PlantPreviewFragment
  )> }
);

export type ReportedPlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReportedPlantsQuery = (
  { __typename?: 'Query' }
  & { reportedPlants: Array<(
    { __typename?: 'ReportedPlantResponse' }
    & PlantReportFragment
  )> }
);

export const OptimalConditionsFragmentDoc = gql`
    fragment OptimalConditions on OptimalConditions {
  season
  water
  sun
  airHumidityLow
  airHumidityHigh
  temperatureLow
  temperatureHigh
}
    `;
export const FullPlantFragmentDoc = gql`
    fragment FullPlant on Plant {
  id
  creator {
    id
    username
  }
  createdAt
  updatedAt
  primaryName
  otherNames
  images
  isCatFriendly
  isCatFriendlySource
  isDogFriendly
  isDogFriendlySource
  description
  optimalConditions {
    ...OptimalConditions
  }
}
    ${OptimalConditionsFragmentDoc}`;
export const PlantPreviewFragmentDoc = gql`
    fragment PlantPreview on Plant {
  id
  createdAt
  updatedAt
  primaryName
  otherNames
  images
  isCatFriendly
  isDogFriendly
  creator {
    username
  }
  descriptionSnippet
}
    `;
export const PlantReportFragmentDoc = gql`
    fragment PlantReport on ReportedPlantResponse {
  plant {
    id
    primaryName
    otherNames
    descriptionSnippet
    images
    creator {
      username
    }
  }
  report {
    id
    score
    reason
  }
}
    `;
export const AddOptimalConditionsDocument = gql`
    mutation AddOptimalConditions($plantId: Int!, $data: OptimalConditionsInput!) {
  addOptimalConditions(plantId: $plantId, data: $data) {
    optimalConditions {
      id
      plantId
      ...OptimalConditions
    }
    errors {
      field
      message
    }
  }
}
    ${OptimalConditionsFragmentDoc}`;
export type AddOptimalConditionsMutationFn = Apollo.MutationFunction<AddOptimalConditionsMutation, AddOptimalConditionsMutationVariables>;

/**
 * __useAddOptimalConditionsMutation__
 *
 * To run a mutation, you first call `useAddOptimalConditionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOptimalConditionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOptimalConditionsMutation, { data, loading, error }] = useAddOptimalConditionsMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOptimalConditionsMutation(baseOptions?: Apollo.MutationHookOptions<AddOptimalConditionsMutation, AddOptimalConditionsMutationVariables>) {
        return Apollo.useMutation<AddOptimalConditionsMutation, AddOptimalConditionsMutationVariables>(AddOptimalConditionsDocument, baseOptions);
      }
export type AddOptimalConditionsMutationHookResult = ReturnType<typeof useAddOptimalConditionsMutation>;
export type AddOptimalConditionsMutationResult = Apollo.MutationResult<AddOptimalConditionsMutation>;
export type AddOptimalConditionsMutationOptions = Apollo.BaseMutationOptions<AddOptimalConditionsMutation, AddOptimalConditionsMutationVariables>;
export const AddPlantDocument = gql`
    mutation AddPlant($data: PlantFieldsInput!) {
  addPlant(data: $data) {
    errors {
      field
      message
    }
    plant {
      primaryName
      otherNames
      description
      images
      optimalConditions {
        ...OptimalConditions
      }
    }
  }
}
    ${OptimalConditionsFragmentDoc}`;
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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddPlantMutation(baseOptions?: Apollo.MutationHookOptions<AddPlantMutation, AddPlantMutationVariables>) {
        return Apollo.useMutation<AddPlantMutation, AddPlantMutationVariables>(AddPlantDocument, baseOptions);
      }
export type AddPlantMutationHookResult = ReturnType<typeof useAddPlantMutation>;
export type AddPlantMutationResult = Apollo.MutationResult<AddPlantMutation>;
export type AddPlantMutationOptions = Apollo.BaseMutationOptions<AddPlantMutation, AddPlantMutationVariables>;
export const DislikePlantDocument = gql`
    mutation DislikePlant($plantId: Int!) {
  removeLike(plantId: $plantId)
}
    `;
export type DislikePlantMutationFn = Apollo.MutationFunction<DislikePlantMutation, DislikePlantMutationVariables>;

/**
 * __useDislikePlantMutation__
 *
 * To run a mutation, you first call `useDislikePlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikePlantMutation, { data, loading, error }] = useDislikePlantMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *   },
 * });
 */
export function useDislikePlantMutation(baseOptions?: Apollo.MutationHookOptions<DislikePlantMutation, DislikePlantMutationVariables>) {
        return Apollo.useMutation<DislikePlantMutation, DislikePlantMutationVariables>(DislikePlantDocument, baseOptions);
      }
export type DislikePlantMutationHookResult = ReturnType<typeof useDislikePlantMutation>;
export type DislikePlantMutationResult = Apollo.MutationResult<DislikePlantMutation>;
export type DislikePlantMutationOptions = Apollo.BaseMutationOptions<DislikePlantMutation, DislikePlantMutationVariables>;
export const EditPlantDocument = gql`
    mutation EditPlant($id: Int!, $input: PlantFieldsInput!, $imagesToDelete: [String!]!) {
  editPlant(id: $id, editData: $input, imagesToDelete: $imagesToDelete) {
    errors {
      field
      message
    }
    plant {
      id
      creatorId
      primaryName
      otherNames
      images
      description
      isCatFriendly
      isDogFriendly
      isCatFriendlySource
      isDogFriendlySource
    }
  }
}
    `;
export type EditPlantMutationFn = Apollo.MutationFunction<EditPlantMutation, EditPlantMutationVariables>;

/**
 * __useEditPlantMutation__
 *
 * To run a mutation, you first call `useEditPlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPlantMutation, { data, loading, error }] = useEditPlantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *      imagesToDelete: // value for 'imagesToDelete'
 *   },
 * });
 */
export function useEditPlantMutation(baseOptions?: Apollo.MutationHookOptions<EditPlantMutation, EditPlantMutationVariables>) {
        return Apollo.useMutation<EditPlantMutation, EditPlantMutationVariables>(EditPlantDocument, baseOptions);
      }
export type EditPlantMutationHookResult = ReturnType<typeof useEditPlantMutation>;
export type EditPlantMutationResult = Apollo.MutationResult<EditPlantMutation>;
export type EditPlantMutationOptions = Apollo.BaseMutationOptions<EditPlantMutation, EditPlantMutationVariables>;
export const LikePlantDocument = gql`
    mutation LikePlant($plantId: Int!) {
  addLike(plantId: $plantId)
}
    `;
export type LikePlantMutationFn = Apollo.MutationFunction<LikePlantMutation, LikePlantMutationVariables>;

/**
 * __useLikePlantMutation__
 *
 * To run a mutation, you first call `useLikePlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePlantMutation, { data, loading, error }] = useLikePlantMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *   },
 * });
 */
export function useLikePlantMutation(baseOptions?: Apollo.MutationHookOptions<LikePlantMutation, LikePlantMutationVariables>) {
        return Apollo.useMutation<LikePlantMutation, LikePlantMutationVariables>(LikePlantDocument, baseOptions);
      }
export type LikePlantMutationHookResult = ReturnType<typeof useLikePlantMutation>;
export type LikePlantMutationResult = Apollo.MutationResult<LikePlantMutation>;
export type LikePlantMutationOptions = Apollo.BaseMutationOptions<LikePlantMutation, LikePlantMutationVariables>;
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
export const ReportPlantDocument = gql`
    mutation ReportPlant($plantId: Int!, $reason: String!) {
  reportPlant(plantId: $plantId, reason: $reason)
}
    `;
export type ReportPlantMutationFn = Apollo.MutationFunction<ReportPlantMutation, ReportPlantMutationVariables>;

/**
 * __useReportPlantMutation__
 *
 * To run a mutation, you first call `useReportPlantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportPlantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportPlantMutation, { data, loading, error }] = useReportPlantMutation({
 *   variables: {
 *      plantId: // value for 'plantId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReportPlantMutation(baseOptions?: Apollo.MutationHookOptions<ReportPlantMutation, ReportPlantMutationVariables>) {
        return Apollo.useMutation<ReportPlantMutation, ReportPlantMutationVariables>(ReportPlantDocument, baseOptions);
      }
export type ReportPlantMutationHookResult = ReturnType<typeof useReportPlantMutation>;
export type ReportPlantMutationResult = Apollo.MutationResult<ReportPlantMutation>;
export type ReportPlantMutationOptions = Apollo.BaseMutationOptions<ReportPlantMutation, ReportPlantMutationVariables>;
export const UploadFileTestDocument = gql`
    mutation UploadFileTest($images: [Upload!]!) {
  upload(images: $images)
}
    `;
export type UploadFileTestMutationFn = Apollo.MutationFunction<UploadFileTestMutation, UploadFileTestMutationVariables>;

/**
 * __useUploadFileTestMutation__
 *
 * To run a mutation, you first call `useUploadFileTestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileTestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileTestMutation, { data, loading, error }] = useUploadFileTestMutation({
 *   variables: {
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUploadFileTestMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileTestMutation, UploadFileTestMutationVariables>) {
        return Apollo.useMutation<UploadFileTestMutation, UploadFileTestMutationVariables>(UploadFileTestDocument, baseOptions);
      }
export type UploadFileTestMutationHookResult = ReturnType<typeof useUploadFileTestMutation>;
export type UploadFileTestMutationResult = Apollo.MutationResult<UploadFileTestMutation>;
export type UploadFileTestMutationOptions = Apollo.BaseMutationOptions<UploadFileTestMutation, UploadFileTestMutationVariables>;
export const VoteReportDocument = gql`
    mutation VoteReport($reportId: Int!, $voteValue: Int!) {
  vote(reportId: $reportId, voteValue: $voteValue)
}
    `;
export type VoteReportMutationFn = Apollo.MutationFunction<VoteReportMutation, VoteReportMutationVariables>;

/**
 * __useVoteReportMutation__
 *
 * To run a mutation, you first call `useVoteReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteReportMutation, { data, loading, error }] = useVoteReportMutation({
 *   variables: {
 *      reportId: // value for 'reportId'
 *      voteValue: // value for 'voteValue'
 *   },
 * });
 */
export function useVoteReportMutation(baseOptions?: Apollo.MutationHookOptions<VoteReportMutation, VoteReportMutationVariables>) {
        return Apollo.useMutation<VoteReportMutation, VoteReportMutationVariables>(VoteReportDocument, baseOptions);
      }
export type VoteReportMutationHookResult = ReturnType<typeof useVoteReportMutation>;
export type VoteReportMutationResult = Apollo.MutationResult<VoteReportMutation>;
export type VoteReportMutationOptions = Apollo.BaseMutationOptions<VoteReportMutation, VoteReportMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    accountType
    email
    likedPlants
    upvotedReportsIds
    downvotedReportsIds
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
    plantId
    name
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
export const PlantsPreviewDocument = gql`
    query PlantsPreview {
  plants {
    ...PlantPreview
  }
}
    ${PlantPreviewFragmentDoc}`;

/**
 * __usePlantsPreviewQuery__
 *
 * To run a query within a React component, call `usePlantsPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlantsPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlantsPreviewQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlantsPreviewQuery(baseOptions?: Apollo.QueryHookOptions<PlantsPreviewQuery, PlantsPreviewQueryVariables>) {
        return Apollo.useQuery<PlantsPreviewQuery, PlantsPreviewQueryVariables>(PlantsPreviewDocument, baseOptions);
      }
export function usePlantsPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlantsPreviewQuery, PlantsPreviewQueryVariables>) {
          return Apollo.useLazyQuery<PlantsPreviewQuery, PlantsPreviewQueryVariables>(PlantsPreviewDocument, baseOptions);
        }
export type PlantsPreviewQueryHookResult = ReturnType<typeof usePlantsPreviewQuery>;
export type PlantsPreviewLazyQueryHookResult = ReturnType<typeof usePlantsPreviewLazyQuery>;
export type PlantsPreviewQueryResult = Apollo.QueryResult<PlantsPreviewQuery, PlantsPreviewQueryVariables>;
export const ReportedPlantsDocument = gql`
    query ReportedPlants {
  reportedPlants {
    ...PlantReport
  }
}
    ${PlantReportFragmentDoc}`;

/**
 * __useReportedPlantsQuery__
 *
 * To run a query within a React component, call `useReportedPlantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedPlantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedPlantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReportedPlantsQuery(baseOptions?: Apollo.QueryHookOptions<ReportedPlantsQuery, ReportedPlantsQueryVariables>) {
        return Apollo.useQuery<ReportedPlantsQuery, ReportedPlantsQueryVariables>(ReportedPlantsDocument, baseOptions);
      }
export function useReportedPlantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportedPlantsQuery, ReportedPlantsQueryVariables>) {
          return Apollo.useLazyQuery<ReportedPlantsQuery, ReportedPlantsQueryVariables>(ReportedPlantsDocument, baseOptions);
        }
export type ReportedPlantsQueryHookResult = ReturnType<typeof useReportedPlantsQuery>;
export type ReportedPlantsLazyQueryHookResult = ReturnType<typeof useReportedPlantsLazyQuery>;
export type ReportedPlantsQueryResult = Apollo.QueryResult<ReportedPlantsQuery, ReportedPlantsQueryVariables>;