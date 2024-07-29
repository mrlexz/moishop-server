import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DataContext } from '../context/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthStatus = {
  __typename?: 'AuthStatus';
  success?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AuthStatusInput = {
  user?: InputMaybe<KindeUser>;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  access_token: Scalars['String']['output'];
  isNotHavePassword?: Maybe<Scalars['Boolean']['output']>;
  user: User;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type BillingAddress = {
  __typename?: 'BillingAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']['output']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CaseColor {
  Black = 'black',
  Blue = 'blue',
  Rose = 'rose'
}

export enum CaseFinish {
  Smooth = 'smooth',
  Textured = 'textured'
}

export enum CaseMaterial {
  Polycarbonate = 'polycarbonate',
  Silicone = 'silicone'
}

export type Configuration = {
  __typename?: 'Configuration';
  caseColor?: Maybe<CaseColor>;
  caseFinish?: Maybe<CaseFinish>;
  caseMaterial?: Maybe<CaseMaterial>;
  croppedImgUrl?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imgUrl?: Maybe<Scalars['String']['output']>;
  orderStatus?: Maybe<OrderStatus>;
  phoneModel?: Maybe<PhoneModel>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type CreateAppPaymentOutput = {
  __typename?: 'CreateAppPaymentOutput';
  orderId?: Maybe<Scalars['ID']['output']>;
  paymentIntent?: Maybe<Scalars['String']['output']>;
};

export type CreateCheckoutSessionOutput = {
  __typename?: 'CreateCheckoutSessionOutput';
  order?: Maybe<Order>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CreateConfigurationInput = {
  croppedImgUrl?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['Int']['input'];
  imgUrl: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type CreateConfigurationOutput = {
  __typename?: 'CreateConfigurationOutput';
  croppedImgUrl?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type CreateOrderInput = {
  amount: Scalars['Float']['input'];
  configurationId: Scalars['ID']['input'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID']['output'];
  platform: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type KindeUser = {
  email?: InputMaybe<Scalars['String']['input']>;
  family_name?: InputMaybe<Scalars['String']['input']>;
  given_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  createAppPayment?: Maybe<CreateAppPaymentOutput>;
  createCheckoutSession?: Maybe<CreateCheckoutSessionOutput>;
  createConfiguration?: Maybe<CreateConfigurationOutput>;
  signIn?: Maybe<AuthUser>;
  signUp?: Maybe<SignUpOutput>;
  updateConfiguration?: Maybe<CreateConfigurationOutput>;
};


export type MutationCreateAppPaymentArgs = {
  input?: InputMaybe<CreateOrderInput>;
};


export type MutationCreateCheckoutSessionArgs = {
  input?: InputMaybe<CreateOrderInput>;
};


export type MutationCreateConfigurationArgs = {
  input?: InputMaybe<CreateConfigurationInput>;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateConfigurationArgs = {
  input?: InputMaybe<UpdateConfigurationInput>;
};

export type Order = {
  __typename?: 'Order';
  amount?: Maybe<Scalars['Float']['output']>;
  billingAddress?: Maybe<BillingAddress>;
  billingAddressId?: Maybe<Scalars['ID']['output']>;
  configuration?: Maybe<Configuration>;
  configurationId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isPaid?: Maybe<Scalars['Boolean']['output']>;
  orderStatus?: Maybe<OrderStatus>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingAddressId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export enum OrderStatus {
  AwaitingShipment = 'awaiting_shipment',
  Fullfilled = 'fullfilled',
  Shipped = 'shipped'
}

export type PaymentStatusOutput = {
  __typename?: 'PaymentStatusOutput';
  order?: Maybe<Order>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export enum PhoneModel {
  Iphone11 = 'iphone11',
  Iphone11pro = 'iphone11pro',
  Iphone11proMax = 'iphone11pro_max',
  Iphone12 = 'iphone12',
  Iphone12mini = 'iphone12mini',
  Iphone12pro = 'iphone12pro',
  Iphone12proMax = 'iphone12pro_max',
  Iphone13 = 'iphone13',
  Iphone13mini = 'iphone13mini',
  Iphone13pro = 'iphone13pro',
  Iphone13proMax = 'iphone13pro_max',
  Iphone14 = 'iphone14',
  Iphone14pro = 'iphone14pro',
  Iphone14proMax = 'iphone14pro_max',
  Iphone15 = 'iphone15',
  Iphone15pro = 'iphone15pro',
  Iphone15proMax = 'iphone15pro_max',
  Iphonex = 'iphonex',
  Iphonexr = 'iphonexr',
  Iphonexs = 'iphonexs',
  IphonexsMax = 'iphonexs_max'
}

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  authors?: Maybe<Array<Maybe<Author>>>;
  configuration?: Maybe<Configuration>;
  configurations?: Maybe<Array<Maybe<Configuration>>>;
  games?: Maybe<Array<Maybe<Game>>>;
  getAuthStatus?: Maybe<AuthStatus>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  paymentStatus?: Maybe<PaymentStatusOutput>;
  review?: Maybe<Review>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryConfigurationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAuthStatusArgs = {
  input?: InputMaybe<AuthStatusInput>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentStatusArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']['output']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateConfigurationInput = {
  caseColor?: InputMaybe<CaseColor>;
  caseFinish?: InputMaybe<CaseFinish>;
  caseMaterial?: InputMaybe<CaseMaterial>;
  croppedImgUrl?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  orderStatus?: InputMaybe<OrderStatus>;
  phoneModel?: InputMaybe<PhoneModel>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  kindeUserId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  orders?: Maybe<Array<Maybe<Order>>>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthStatus: ResolverTypeWrapper<AuthStatus>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AuthStatusInput: AuthStatusInput;
  AuthUser: ResolverTypeWrapper<AuthUser>;
  Author: ResolverTypeWrapper<Author>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BillingAddress: ResolverTypeWrapper<BillingAddress>;
  CaseColor: CaseColor;
  CaseFinish: CaseFinish;
  CaseMaterial: CaseMaterial;
  Configuration: ResolverTypeWrapper<Configuration>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateAppPaymentOutput: ResolverTypeWrapper<CreateAppPaymentOutput>;
  CreateCheckoutSessionOutput: ResolverTypeWrapper<CreateCheckoutSessionOutput>;
  CreateConfigurationInput: CreateConfigurationInput;
  CreateConfigurationOutput: ResolverTypeWrapper<CreateConfigurationOutput>;
  CreateOrderInput: CreateOrderInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Game: ResolverTypeWrapper<Game>;
  KindeUser: KindeUser;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderStatus: OrderStatus;
  PaymentStatusOutput: ResolverTypeWrapper<PaymentStatusOutput>;
  PhoneModel: PhoneModel;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ShippingAddress: ResolverTypeWrapper<ShippingAddress>;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  SignUpOutput: ResolverTypeWrapper<SignUpOutput>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateConfigurationInput: UpdateConfigurationInput;
  User: ResolverTypeWrapper<User>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthStatus: AuthStatus;
  Boolean: Scalars['Boolean']['output'];
  String: Scalars['String']['output'];
  AuthStatusInput: AuthStatusInput;
  AuthUser: AuthUser;
  Author: Author;
  ID: Scalars['ID']['output'];
  BillingAddress: BillingAddress;
  Configuration: Configuration;
  Int: Scalars['Int']['output'];
  CreateAppPaymentOutput: CreateAppPaymentOutput;
  CreateCheckoutSessionOutput: CreateCheckoutSessionOutput;
  CreateConfigurationInput: CreateConfigurationInput;
  CreateConfigurationOutput: CreateConfigurationOutput;
  CreateOrderInput: CreateOrderInput;
  Float: Scalars['Float']['output'];
  DateTime: Scalars['DateTime']['output'];
  Game: Game;
  KindeUser: KindeUser;
  Mutation: {};
  Order: Order;
  PaymentStatusOutput: PaymentStatusOutput;
  Query: {};
  Review: Review;
  ShippingAddress: ShippingAddress;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  SignUpOutput: SignUpOutput;
  Subscription: {};
  UpdateConfigurationInput: UpdateConfigurationInput;
  User: User;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = DataContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = DataContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = DataContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = DataContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = DataContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = DataContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = DataContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = DataContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthStatusResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['AuthStatus'] = ResolversParentTypes['AuthStatus']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isNotHavePassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BillingAddressResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['BillingAddress'] = ResolversParentTypes['BillingAddress']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigurationResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Configuration'] = ResolversParentTypes['Configuration']> = {
  caseColor?: Resolver<Maybe<ResolversTypes['CaseColor']>, ParentType, ContextType>;
  caseFinish?: Resolver<Maybe<ResolversTypes['CaseFinish']>, ParentType, ContextType>;
  caseMaterial?: Resolver<Maybe<ResolversTypes['CaseMaterial']>, ParentType, ContextType>;
  croppedImgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderStatus?: Resolver<Maybe<ResolversTypes['OrderStatus']>, ParentType, ContextType>;
  phoneModel?: Resolver<Maybe<ResolversTypes['PhoneModel']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateAppPaymentOutputResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['CreateAppPaymentOutput'] = ResolversParentTypes['CreateAppPaymentOutput']> = {
  orderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  paymentIntent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCheckoutSessionOutputResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['CreateCheckoutSessionOutput'] = ResolversParentTypes['CreateCheckoutSessionOutput']> = {
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateConfigurationOutputResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['CreateConfigurationOutput'] = ResolversParentTypes['CreateConfigurationOutput']> = {
  croppedImgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GameResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  platform?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createAppPayment?: Resolver<Maybe<ResolversTypes['CreateAppPaymentOutput']>, ParentType, ContextType, Partial<MutationCreateAppPaymentArgs>>;
  createCheckoutSession?: Resolver<Maybe<ResolversTypes['CreateCheckoutSessionOutput']>, ParentType, ContextType, Partial<MutationCreateCheckoutSessionArgs>>;
  createConfiguration?: Resolver<Maybe<ResolversTypes['CreateConfigurationOutput']>, ParentType, ContextType, Partial<MutationCreateConfigurationArgs>>;
  signIn?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signUp?: Resolver<Maybe<ResolversTypes['SignUpOutput']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateConfiguration?: Resolver<Maybe<ResolversTypes['CreateConfigurationOutput']>, ParentType, ContextType, Partial<MutationUpdateConfigurationArgs>>;
};

export type OrderResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  billingAddress?: Resolver<Maybe<ResolversTypes['BillingAddress']>, ParentType, ContextType>;
  billingAddressId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  configuration?: Resolver<Maybe<ResolversTypes['Configuration']>, ParentType, ContextType>;
  configurationId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isPaid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  orderStatus?: Resolver<Maybe<ResolversTypes['OrderStatus']>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['ShippingAddress']>, ParentType, ContextType>;
  shippingAddressId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentStatusOutputResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['PaymentStatusOutput'] = ResolversParentTypes['PaymentStatusOutput']> = {
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  configuration?: Resolver<Maybe<ResolversTypes['Configuration']>, ParentType, ContextType, RequireFields<QueryConfigurationArgs, 'id'>>;
  configurations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Configuration']>>>, ParentType, ContextType>;
  games?: Resolver<Maybe<Array<Maybe<ResolversTypes['Game']>>>, ParentType, ContextType>;
  getAuthStatus?: Resolver<Maybe<ResolversTypes['AuthStatus']>, ParentType, ContextType, Partial<QueryGetAuthStatusArgs>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  paymentStatus?: Resolver<Maybe<ResolversTypes['PaymentStatusOutput']>, ParentType, ContextType, RequireFields<QueryPaymentStatusArgs, 'orderId'>>;
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingAddressResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['ShippingAddress'] = ResolversParentTypes['ShippingAddress']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpOutputResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['SignUpOutput'] = ResolversParentTypes['SignUpOutput']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  kindeUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataContext> = {
  AuthStatus?: AuthStatusResolvers<ContextType>;
  AuthUser?: AuthUserResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  BillingAddress?: BillingAddressResolvers<ContextType>;
  Configuration?: ConfigurationResolvers<ContextType>;
  CreateAppPaymentOutput?: CreateAppPaymentOutputResolvers<ContextType>;
  CreateCheckoutSessionOutput?: CreateCheckoutSessionOutputResolvers<ContextType>;
  CreateConfigurationOutput?: CreateConfigurationOutputResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  PaymentStatusOutput?: PaymentStatusOutputResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ShippingAddress?: ShippingAddressResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = DataContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';
export type BillingAddressDbObject = {
  city?: Maybe<string>,
  country?: Maybe<string>,
  createdAt?: Maybe<any>,
  _id?: Maybe<ObjectId>,
  name?: Maybe<string>,
  order?: Maybe<OrderDbObject['_id']>,
  orders?: Maybe<Array<Maybe<OrderDbObject['_id']>>>,
  phoneNumber?: Maybe<string>,
  postalCode?: Maybe<string>,
  state?: Maybe<string>,
  street?: Maybe<string>,
  updatedAt?: Maybe<any>,
};

export type ConfigurationDbObject = {
  caseColor?: Maybe<string>,
  caseFinish?: Maybe<string>,
  caseMaterial?: Maybe<string>,
  croppedImgUrl?: Maybe<string>,
  height?: Maybe<number>,
  _id?: Maybe<ObjectId>,
  imgUrl?: Maybe<string>,
  orderStatus?: Maybe<string>,
  phoneModel?: Maybe<string>,
  width?: Maybe<number>,
};

export type OrderDbObject = {
  amount?: Maybe<number>,
  billingAddress?: Maybe<BillingAddressDbObject['_id']>,
  _id?: Maybe<ObjectId>,
  configuration?: Maybe<ConfigurationDbObject['_id']>,
  createdAt?: Maybe<any>,
  isPaid?: Maybe<boolean>,
  orderStatus?: Maybe<string>,
  shippingAddress?: Maybe<ShippingAddressDbObject['_id']>,
  updatedAt?: Maybe<any>,
  user?: Maybe<UserDbObject['_id']>,
};

export type ShippingAddressDbObject = {
  city?: Maybe<string>,
  country?: Maybe<string>,
  createdAt?: Maybe<any>,
  _id?: Maybe<ObjectId>,
  name?: Maybe<string>,
  order?: Maybe<OrderDbObject['_id']>,
  orders?: Maybe<Array<Maybe<OrderDbObject['_id']>>>,
  phoneNumber?: Maybe<string>,
  postalCode?: Maybe<string>,
  state?: Maybe<string>,
  street?: Maybe<string>,
  updatedAt?: Maybe<any>,
};

export type UserDbObject = {
  avatar?: Maybe<string>,
  createdAt?: Maybe<any>,
  email: string,
  _id?: Maybe<ObjectId>,
  kindeUserId?: Maybe<string>,
  name: string,
  orders?: Maybe<Array<Maybe<OrderDbObject['_id']>>>,
  password?: Maybe<string>,
  updatedAt?: Maybe<any>,
};
