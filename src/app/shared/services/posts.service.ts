import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore, orderBy,
  query,
} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsCollection: CollectionReference<Post>;

  constructor(private firestore: Firestore) {
    this.postsCollection = collection(this.firestore, 'posts').withConverter(new Post.Converter());
  }

  getAll(): Observable<Post[]> {
    const c = collection(this.firestore, 'posts').withConverter(new Post.Converter());
    const q = query(c, orderBy('createdAt', 'desc'))
    return collectionData(q, {idField: 'id'});
  }

  get(id: string): Observable<Post | undefined> {
    const postReference = doc(this.postsCollection, id);
    return docData(postReference, {idField: 'id'})
  }

  create(post: Post): Observable<string> {
    return from(addDoc(this.postsCollection, post).then(ref => ref.id));
  }
}
