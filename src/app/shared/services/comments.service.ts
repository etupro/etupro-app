import {Injectable} from '@angular/core';
import {Firestore, orderBy, query, where,} from "@angular/fire/firestore";
import {Comment} from "../models/comment.model";
import {FirestoreCrudService} from "./firestore-crud.service";

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends FirestoreCrudService<Comment> {

  constructor(protected override firestore: Firestore) {
    super('comments', new Comment.Converter(), firestore);
  }

  override createEntity(id: string, data: Comment): Comment {
    return new Comment({
      ...data,
      id
    })
  }

  async getAllFromPost(postId: string): Promise<Comment[]> {
    const q = query(this.collectionReference, where('postId', '==', postId), orderBy('createdAt', 'desc'))
    return await this.getAllWithQuery(q);
  }
}
