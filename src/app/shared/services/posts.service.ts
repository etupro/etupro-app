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

  override async getAll(filterString?: string): Promise<Post[]> {
    const filters = filterString ? filterString.split(' ') : [];
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (filters.length > 0) {
      filters.map(filter => {
        constraints.push(where('tags', 'array-contains', filter))
        constraints.push(where('tags', 'array-contains', filter))
      });

    }

    const q = query(this.collectionReference, orderBy('createdAt', 'desc'))
    return await this.getAllWithQuery(q);
  }
}
