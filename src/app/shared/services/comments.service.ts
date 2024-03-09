import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  where,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Comment} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private firestore: Firestore) {
  }

  getAllFromPost(postId: string): Observable<Comment[]> {
    const c = collection(this.firestore, 'comments').withConverter(new Comment.Converter());
    const q = query(c, where('postId', '==', postId), orderBy('createdAt', 'desc'))
    return collectionData(q, {idField: 'id'});
  }

  get(id: string): Observable<Comment | undefined> {
    const c = collection(this.firestore, 'comments').withConverter(new Comment.Converter());
    const commentReference = doc(c, id);
    return docData(commentReference, {idField: 'id'});
  }

  async create(comment: Comment): Promise<string> {
    const c = collection(this.firestore, 'comments').withConverter(new Comment.Converter());
    let ref = await addDoc(c, comment);
    return ref.id;
  }
}
