import {Injectable} from '@angular/core';
import {doc, docData, DocumentReference, Firestore} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {References} from "../models/references.model";

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  documentReference: DocumentReference;

  constructor(private firestore: Firestore) {
    this.documentReference = doc(this.firestore, 'references/RqZZRXeZpuBEEd8vAr8Y');  }

  getTags(): Observable<string[]> {
    return docData(this.documentReference).pipe(
      map(references => (references as References).tags)
    );
  }
}
