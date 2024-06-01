import { Injectable } from '@angular/core';
import { Firestore, orderBy, query, where, } from "@angular/fire/firestore";
import { Post } from "../models/post.model";
import { FirestoreCrudService } from "./firestore-crud.service";
import { QueryConstraint } from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class PostsService extends FirestoreCrudService<Post> {

  constructor(protected override firestore: Firestore) {
    super('posts', new Post.Converter(), firestore);
  }

  override createEntity(id: string, data: Post): Post {
    return new Post({
      ...data,
      id
    })
  }

  async getAll(tags: string[]): Promise<Post[]> {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (tags.length) {
      constraints.push(where('tags', 'array-contains-any', tags));
    }

    const q = query(this.collectionReference, ...constraints)
    return await this.getAllWithQuery(q);
  }
}
