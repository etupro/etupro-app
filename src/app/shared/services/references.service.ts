import {Injectable} from '@angular/core';
import {collection, doc, docData, DocumentReference, Firestore} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {References} from "../models/references.model";

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  documentReference: DocumentReference<References>;

  constructor(private firestore: Firestore) {
    const postsCollection = collection(firestore, 'references').withConverter(new References.Converter());
    this.documentReference = doc(postsCollection, 'RqZZRXeZpuBEEd8vAr8Y');
  }

  getTags(): Observable<Set<string>> {
    return docData(this.documentReference).pipe(
      map(references => references?.tags ?? new Set())
    );
  }
}
