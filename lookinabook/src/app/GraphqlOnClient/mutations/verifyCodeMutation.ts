import { gql } from "@apollo/client";

export const VERIFY_CODE = gql`
  mutation VerifyCode(
  $email: String!, 
  $code: String!
  ) {
    verifyCode(
    email: $email, 
    code: $code
    )
  }
`;
