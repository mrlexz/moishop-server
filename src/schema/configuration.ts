import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum PhoneModel {
    iphonex
    iphonexr
    iphonexs
    iphonexs_max
    iphone11
    iphone11pro
    iphone11pro_max
    iphone12
    iphone12mini
    iphone12pro
    iphone12pro_max
    iphone13
    iphone13mini
    iphone13pro
    iphone13pro_max
    iphone14
    iphone14pro
    iphone14pro_max
    iphone15
    iphone15pro
    iphone15pro_max
  }
  enum CaseMaterial {
    silicone
    polycarbonate
  }
  enum CaseFinish {
    smooth
    textured
  }
  enum CaseColor {
    black
    blue
    rose
  }
  type Configuration {
    id: ID
    width: Int
    height: Int
    croppedImgUrl: String
    imgUrl: String
    orderStatus: OrderStatus
    phoneModel: PhoneModel
    caseMaterial: CaseMaterial
    caseFinish: CaseFinish
    caseColor: CaseColor
  }
  type CreateConfigurationOutput {
    id: ID!
    width: Int
    height: Int
    imgUrl: String
    croppedImgUrl: String
  }
  input CreateConfigurationInput {
    width: Int!
    height: Int!
    imgUrl: String!
    croppedImgUrl: String
  }
  input UpdateConfigurationInput {
    id: ID!
    width: Int
    height: Int
    imgUrl: String
    croppedImgUrl: String
    orderStatus: OrderStatus
    phoneModel: PhoneModel
    caseMaterial: CaseMaterial
    caseFinish: CaseFinish
    caseColor: CaseColor
  }

  extend type Query {
    configurations: [Configuration]
    configuration(id: ID!): Configuration
  }
  extend type Mutation {
    createConfiguration(
      input: CreateConfigurationInput
    ): CreateConfigurationOutput
    updateConfiguration(
      input: UpdateConfigurationInput
    ): CreateConfigurationOutput
  }
`;
export default typeDefs;
