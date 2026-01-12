import type { ApolloClient } from '@apollo/client';

import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS, GET_POST_BY_ID } from '../graphql/queries';

export class BlogService {
  constructor(private readonly client: ApolloClient) {}

  getPosts(page: number, limit = 5) {
    return this.client.query({
      query: GET_POSTS,
      variables: {
        limit,
        offset: (page - 1) * limit,
      },
    });
  }

  getPostById(id: string) {
    return this.client.query({
      query: GET_POST_BY_ID,
      variables: { id },
    });
  }

  createPost(input: { title: string; body: string; author_id: string }) {
    return this.client.mutate({
      mutation: CREATE_POST,
      variables: input,
    });
  }
}
