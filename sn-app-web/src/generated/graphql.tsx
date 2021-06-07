import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type Account = {
  __typename?: 'Account';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  balance: Scalars['Float'];
  balanceDate: Scalars['DateTime'];
  isCredit: Scalars['Boolean'];
  profileId: Scalars['Float'];
  profile: FinanceProfile;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AccountInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  balance: Scalars['Float'];
  balanceDate: Scalars['DateTime'];
  isCredit: Scalars['Boolean'];
};


export type Expense = {
  __typename?: 'Expense';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
  frequency: Scalars['String'];
  profileId: Scalars['Float'];
  profile: FinanceProfile;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ExpenseInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  value: Scalars['Float'];
  frequency: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FinanceProfile = {
  __typename?: 'FinanceProfile';
  id: Scalars['Int'];
  userId: Scalars['Float'];
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  accounts?: Maybe<Array<Account>>;
  expenses?: Maybe<Array<Expense>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  flipHighScore: UserResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createFinanceProfile: FinanceProfile;
  deleteFinanceProfile: Scalars['Boolean'];
  createAccount: Account;
  updateAccount?: Maybe<Account>;
  deleteAccount: Scalars['Boolean'];
  createExpense: Expense;
  updateExpense?: Maybe<Expense>;
  deleteExpense: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationUpdatePostArgs = {
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationFlipHighScoreArgs = {
  value: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationDeleteFinanceProfileArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAccountArgs = {
  options: AccountInput;
};


export type MutationUpdateAccountArgs = {
  isCredit?: Maybe<Scalars['Boolean']>;
  balanceDate?: Maybe<Scalars['DateTime']>;
  balance?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Int'];
};


export type MutationCreateExpenseArgs = {
  options: ExpenseInput;
};


export type MutationUpdateExpenseArgs = {
  frequency?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  upvotes: Array<Upvote>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  flipHighScores: UserFlipScores;
  me?: Maybe<User>;
  myFinances?: Maybe<Array<FinanceProfile>>;
  account?: Maybe<Account>;
  expense?: Maybe<Expense>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryFlipHighScoresArgs = {
  limit: Scalars['Int'];
};


export type QueryAccountArgs = {
  id: Scalars['Int'];
};


export type QueryExpenseArgs = {
  id: Scalars['Int'];
};

export type Upvote = {
  __typename?: 'Upvote';
  value: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  postId: Scalars['Float'];
  post: Post;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  scoreFlip: Scalars['Float'];
  upvotes: Array<Upvote>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserFlipScore = {
  __typename?: 'UserFlipScore';
  username: Scalars['String'];
  scoreFlip: Scalars['Float'];
};

export type UserFlipScores = {
  __typename?: 'UserFlipScores';
  scores: Array<UserFlipScore>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'textSnippet' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type BaseAccountFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'name' | 'description' | 'balance' | 'balanceDate' | 'isCredit'>
);

export type BaseErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type BaseExpenseFragment = (
  { __typename?: 'Expense' }
  & Pick<Expense, 'id' | 'name' | 'description' | 'value' | 'frequency'>
);

export type BaseFinanceProfileFragment = (
  { __typename?: 'FinanceProfile' }
  & Pick<FinanceProfile, 'id' | 'userId'>
  & { accounts?: Maybe<Array<(
    { __typename?: 'Account' }
    & BaseAccountFragment
  )>>, expenses?: Maybe<Array<(
    { __typename?: 'Expense' }
    & BaseExpenseFragment
  )>> }
);

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'scoreFlip'>
);

export type BaseUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & BaseErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & BaseUserResponseFragment
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  options: AccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'Account' }
    & BaseAccountFragment
  ) }
);

export type CreateExpenseMutationVariables = Exact<{
  options: ExpenseInput;
}>;


export type CreateExpenseMutation = (
  { __typename?: 'Mutation' }
  & { createExpense: (
    { __typename?: 'Expense' }
    & BaseExpenseFragment
  ) }
);

export type CreateFinanceProfileMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateFinanceProfileMutation = (
  { __typename?: 'Mutation' }
  & { createFinanceProfile: (
    { __typename?: 'FinanceProfile' }
    & BaseFinanceProfileFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  options: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'creatorId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type DeleteExpenseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExpenseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteExpense'>
);

export type DeleteFinanceProfileMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteFinanceProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFinanceProfile'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type FlipHighScoreMutationVariables = Exact<{
  value: Scalars['Int'];
}>;


export type FlipHighScoreMutation = (
  { __typename?: 'Mutation' }
  & { flipHighScore: (
    { __typename?: 'UserResponse' }
    & BaseUserResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & BaseUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & BaseUserResponseFragment
  ) }
);

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  balance: Scalars['Float'];
  balanceDate: Scalars['DateTime'];
  isCredit?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount?: Maybe<(
    { __typename?: 'Account' }
    & BaseAccountFragment
  )> }
);

export type UpdateExpenseMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  value: Scalars['Float'];
  frequency: Scalars['String'];
}>;


export type UpdateExpenseMutation = (
  { __typename?: 'Mutation' }
  & { updateExpense?: Maybe<(
    { __typename?: 'Expense' }
    & BaseExpenseFragment
  )> }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type AccountQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account?: Maybe<(
    { __typename?: 'Account' }
    & BaseAccountFragment
  )> }
);

export type ExpenseQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ExpenseQuery = (
  { __typename?: 'Query' }
  & { expense?: Maybe<(
    { __typename?: 'Expense' }
    & BaseExpenseFragment
  )> }
);

export type FlipHighScoresQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type FlipHighScoresQuery = (
  { __typename?: 'Query' }
  & { flipHighScores: (
    { __typename?: 'UserFlipScores' }
    & { scores: Array<(
      { __typename?: 'UserFlipScore' }
      & Pick<UserFlipScore, 'scoreFlip' | 'username'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & BaseUserFragment
  )> }
);

export type MyFinancesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFinancesQuery = (
  { __typename?: 'Query' }
  & { myFinances?: Maybe<Array<(
    { __typename?: 'FinanceProfile' }
    & BaseFinanceProfileFragment
  )>> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'text' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  points
  textSnippet
  voteStatus
  creator {
    id
    username
  }
}
    `;
export const BaseAccountFragmentDoc = gql`
    fragment BaseAccount on Account {
  id
  name
  description
  balance
  balanceDate
  isCredit
}
    `;
export const BaseExpenseFragmentDoc = gql`
    fragment BaseExpense on Expense {
  id
  name
  description
  value
  frequency
}
    `;
export const BaseFinanceProfileFragmentDoc = gql`
    fragment BaseFinanceProfile on FinanceProfile {
  id
  userId
  accounts {
    ...BaseAccount
  }
  expenses {
    ...BaseExpense
  }
}
    ${BaseAccountFragmentDoc}
${BaseExpenseFragmentDoc}`;
export const BaseErrorFragmentDoc = gql`
    fragment BaseError on FieldError {
  field
  message
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  username
  scoreFlip
}
    `;
export const BaseUserResponseFragmentDoc = gql`
    fragment BaseUserResponse on UserResponse {
  errors {
    ...BaseError
  }
  user {
    ...BaseUser
  }
}
    ${BaseErrorFragmentDoc}
${BaseUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($options: AccountInput!) {
  createAccount(options: $options) {
    ...BaseAccount
  }
}
    ${BaseAccountFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateExpenseDocument = gql`
    mutation CreateExpense($options: ExpenseInput!) {
  createExpense(options: $options) {
    ...BaseExpense
  }
}
    ${BaseExpenseFragmentDoc}`;
export type CreateExpenseMutationFn = Apollo.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, options);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = Apollo.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = Apollo.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const CreateFinanceProfileDocument = gql`
    mutation CreateFinanceProfile {
  createFinanceProfile {
    ...BaseFinanceProfile
  }
}
    ${BaseFinanceProfileFragmentDoc}`;
export type CreateFinanceProfileMutationFn = Apollo.MutationFunction<CreateFinanceProfileMutation, CreateFinanceProfileMutationVariables>;

/**
 * __useCreateFinanceProfileMutation__
 *
 * To run a mutation, you first call `useCreateFinanceProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFinanceProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFinanceProfileMutation, { data, loading, error }] = useCreateFinanceProfileMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateFinanceProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateFinanceProfileMutation, CreateFinanceProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFinanceProfileMutation, CreateFinanceProfileMutationVariables>(CreateFinanceProfileDocument, options);
      }
export type CreateFinanceProfileMutationHookResult = ReturnType<typeof useCreateFinanceProfileMutation>;
export type CreateFinanceProfileMutationResult = Apollo.MutationResult<CreateFinanceProfileMutation>;
export type CreateFinanceProfileMutationOptions = Apollo.BaseMutationOptions<CreateFinanceProfileMutation, CreateFinanceProfileMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($options: PostInput!) {
  createPost(options: $options) {
    id
    title
    text
    points
    creatorId
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: Int!) {
  deleteAccount(id: $id)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteExpenseDocument = gql`
    mutation DeleteExpense($id: Int!) {
  deleteExpense(id: $id)
}
    `;
export type DeleteExpenseMutationFn = Apollo.MutationFunction<DeleteExpenseMutation, DeleteExpenseMutationVariables>;

/**
 * __useDeleteExpenseMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseMutation, { data, loading, error }] = useDeleteExpenseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExpenseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DeleteExpenseDocument, options);
      }
export type DeleteExpenseMutationHookResult = ReturnType<typeof useDeleteExpenseMutation>;
export type DeleteExpenseMutationResult = Apollo.MutationResult<DeleteExpenseMutation>;
export type DeleteExpenseMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const DeleteFinanceProfileDocument = gql`
    mutation DeleteFinanceProfile($id: Int!) {
  deleteFinanceProfile(id: $id)
}
    `;
export type DeleteFinanceProfileMutationFn = Apollo.MutationFunction<DeleteFinanceProfileMutation, DeleteFinanceProfileMutationVariables>;

/**
 * __useDeleteFinanceProfileMutation__
 *
 * To run a mutation, you first call `useDeleteFinanceProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFinanceProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFinanceProfileMutation, { data, loading, error }] = useDeleteFinanceProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFinanceProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFinanceProfileMutation, DeleteFinanceProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFinanceProfileMutation, DeleteFinanceProfileMutationVariables>(DeleteFinanceProfileDocument, options);
      }
export type DeleteFinanceProfileMutationHookResult = ReturnType<typeof useDeleteFinanceProfileMutation>;
export type DeleteFinanceProfileMutationResult = Apollo.MutationResult<DeleteFinanceProfileMutation>;
export type DeleteFinanceProfileMutationOptions = Apollo.BaseMutationOptions<DeleteFinanceProfileMutation, DeleteFinanceProfileMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const FlipHighScoreDocument = gql`
    mutation FlipHighScore($value: Int!) {
  flipHighScore(value: $value) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;
export type FlipHighScoreMutationFn = Apollo.MutationFunction<FlipHighScoreMutation, FlipHighScoreMutationVariables>;

/**
 * __useFlipHighScoreMutation__
 *
 * To run a mutation, you first call `useFlipHighScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlipHighScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flipHighScoreMutation, { data, loading, error }] = useFlipHighScoreMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useFlipHighScoreMutation(baseOptions?: Apollo.MutationHookOptions<FlipHighScoreMutation, FlipHighScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FlipHighScoreMutation, FlipHighScoreMutationVariables>(FlipHighScoreDocument, options);
      }
export type FlipHighScoreMutationHookResult = ReturnType<typeof useFlipHighScoreMutation>;
export type FlipHighScoreMutationResult = Apollo.MutationResult<FlipHighScoreMutation>;
export type FlipHighScoreMutationOptions = Apollo.BaseMutationOptions<FlipHighScoreMutation, FlipHighScoreMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...BaseUserResponse
  }
}
    ${BaseUserResponseFragmentDoc}`;
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($id: Int!, $name: String!, $description: String, $balance: Float!, $balanceDate: DateTime!, $isCredit: Boolean) {
  updateAccount(
    id: $id
    name: $name
    description: $description
    balance: $balance
    balanceDate: $balanceDate
    isCredit: $isCredit
  ) {
    ...BaseAccount
  }
}
    ${BaseAccountFragmentDoc}`;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      balance: // value for 'balance'
 *      balanceDate: // value for 'balanceDate'
 *      isCredit: // value for 'isCredit'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const UpdateExpenseDocument = gql`
    mutation UpdateExpense($id: Int!, $name: String!, $description: String, $value: Float!, $frequency: String!) {
  updateExpense(
    id: $id
    name: $name
    description: $description
    value: $value
    frequency: $frequency
  ) {
    ...BaseExpense
  }
}
    ${BaseExpenseFragmentDoc}`;
export type UpdateExpenseMutationFn = Apollo.MutationFunction<UpdateExpenseMutation, UpdateExpenseMutationVariables>;

/**
 * __useUpdateExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenseMutation, { data, loading, error }] = useUpdateExpenseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      value: // value for 'value'
 *      frequency: // value for 'frequency'
 *   },
 * });
 */
export function useUpdateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(UpdateExpenseDocument, options);
      }
export type UpdateExpenseMutationHookResult = ReturnType<typeof useUpdateExpenseMutation>;
export type UpdateExpenseMutationResult = Apollo.MutationResult<UpdateExpenseMutation>;
export type UpdateExpenseMutationOptions = Apollo.BaseMutationOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    textSnippet
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const AccountDocument = gql`
    query Account($id: Int!) {
  account(id: $id) {
    ...BaseAccount
  }
}
    ${BaseAccountFragmentDoc}`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const ExpenseDocument = gql`
    query Expense($id: Int!) {
  expense(id: $id) {
    ...BaseExpense
  }
}
    ${BaseExpenseFragmentDoc}`;

/**
 * __useExpenseQuery__
 *
 * To run a query within a React component, call `useExpenseQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExpenseQuery(baseOptions: Apollo.QueryHookOptions<ExpenseQuery, ExpenseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpenseQuery, ExpenseQueryVariables>(ExpenseDocument, options);
      }
export function useExpenseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseQuery, ExpenseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpenseQuery, ExpenseQueryVariables>(ExpenseDocument, options);
        }
export type ExpenseQueryHookResult = ReturnType<typeof useExpenseQuery>;
export type ExpenseLazyQueryHookResult = ReturnType<typeof useExpenseLazyQuery>;
export type ExpenseQueryResult = Apollo.QueryResult<ExpenseQuery, ExpenseQueryVariables>;
export const FlipHighScoresDocument = gql`
    query FlipHighScores($limit: Int!) {
  flipHighScores(limit: $limit) {
    scores {
      scoreFlip
      username
    }
  }
}
    `;

/**
 * __useFlipHighScoresQuery__
 *
 * To run a query within a React component, call `useFlipHighScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlipHighScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlipHighScoresQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFlipHighScoresQuery(baseOptions: Apollo.QueryHookOptions<FlipHighScoresQuery, FlipHighScoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlipHighScoresQuery, FlipHighScoresQueryVariables>(FlipHighScoresDocument, options);
      }
export function useFlipHighScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlipHighScoresQuery, FlipHighScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlipHighScoresQuery, FlipHighScoresQueryVariables>(FlipHighScoresDocument, options);
        }
export type FlipHighScoresQueryHookResult = ReturnType<typeof useFlipHighScoresQuery>;
export type FlipHighScoresLazyQueryHookResult = ReturnType<typeof useFlipHighScoresLazyQuery>;
export type FlipHighScoresQueryResult = Apollo.QueryResult<FlipHighScoresQuery, FlipHighScoresQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyFinancesDocument = gql`
    query MyFinances {
  myFinances {
    ...BaseFinanceProfile
  }
}
    ${BaseFinanceProfileFragmentDoc}`;

/**
 * __useMyFinancesQuery__
 *
 * To run a query within a React component, call `useMyFinancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFinancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFinancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFinancesQuery(baseOptions?: Apollo.QueryHookOptions<MyFinancesQuery, MyFinancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFinancesQuery, MyFinancesQueryVariables>(MyFinancesDocument, options);
      }
export function useMyFinancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFinancesQuery, MyFinancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFinancesQuery, MyFinancesQueryVariables>(MyFinancesDocument, options);
        }
export type MyFinancesQueryHookResult = ReturnType<typeof useMyFinancesQuery>;
export type MyFinancesLazyQueryHookResult = ReturnType<typeof useMyFinancesLazyQuery>;
export type MyFinancesQueryResult = Apollo.QueryResult<MyFinancesQuery, MyFinancesQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    points
    text
    voteStatus
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;