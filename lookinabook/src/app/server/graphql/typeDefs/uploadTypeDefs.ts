const uploadTypeDefs = `
scalar Upload

enum UploadType {
  AVATAR
  COVER
  POST_IMAGE
}

type Mutation {
  uploadFile(file: Upload!, type: UploadType!, id: Int!): String! # Возвращаем URL загруженного файла
}
`;

export default uploadTypeDefs;
