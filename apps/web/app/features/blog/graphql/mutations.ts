import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CREATE_POST($objects: [postsInsertInput!]!) {
    insertIntopostsCollection(objects: $objects) {
      id
      title
      body
      author_id
      created_at
    }
  }
`;
