import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore
} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsCollection: CollectionReference<Post>;

  constructor(private firestore: Firestore) {
    this.postsCollection = collection(firestore, 'posts').withConverter(new Post.Converter());
  }

  getAll(): Observable<Post[]> {
    return collectionData(this.postsCollection, {idField: 'id'});
  }

  get(id: string): Observable<Post | undefined> {
    const postReference = doc(this.postsCollection, id);
    return docData(postReference, {idField: 'id'})
  }

  create(post: Post): Observable<string> {
    return from(addDoc(this.postsCollection, post).then(ref => ref.id));
  }
}
