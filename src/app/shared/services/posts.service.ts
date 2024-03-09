import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, doc, docData, Firestore, orderBy, query,} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) {
  }

  getAll(): Observable<Post[]> {
    const c = collection(this.firestore, 'posts').withConverter(new Post.Converter());
    const q = query(c, orderBy('createdAt', 'desc'))
    return collectionData(q, {idField: 'id'});
  }

  get(id: string): Observable<Post | undefined> {
    const c = collection(this.firestore, 'posts').withConverter(new Post.Converter());
    const postReference = doc(c, id);
    return docData(postReference, {idField: 'id'});
  }

  async create(post: Post): Promise<string> {
    const c = collection(this.firestore, 'posts').withConverter(new Post.Converter());
    const ref = await addDoc(c, post);
    return ref.id;
  }
}
