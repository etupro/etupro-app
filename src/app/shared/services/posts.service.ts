import {Injectable} from '@angular/core';
import {Firestore, orderBy, query,} from "@angular/fire/firestore";
import {Post} from "../models/post.model";
import {FirestoreCrudService} from "./firestore-crud.service";

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

  override async getAll(): Promise<Post[]> {
    const q = query(this.collectionReference, orderBy('createdAt', 'desc'))
    return await this.getAllWithQuery(q);
  }
}
