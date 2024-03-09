import {Injectable} from '@angular/core';
import {collection, doc, docData, DocumentReference, Firestore, setDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {References} from "../models/references.model";

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {
  public references$: Observable<References | undefined>;
  private references: References | undefined;
  private referencesDocument: DocumentReference<References>

  constructor(private firestore: Firestore) {
    const postsCollection = collection(firestore, 'references');
    this.referencesDocument = doc(postsCollection, 'RqZZRXeZpuBEEd8vAr8Y').withConverter(new References.Converter());
    this.references$ = docData(this.referencesDocument);
    this.references$.subscribe(reference => this.references = reference);
  }

  async updateTags(newTags: Set<string>): Promise<void> {
    const tags = this.references?.tags ?? new Set();
    const mergedTags = new Set([...tags, ...newTags])

    const tagsChanged = tags.size !== mergedTags.size || ![...tags].every((x) => mergedTags.has(x))
    if (tagsChanged && this.references) {
      const copy = this.references.copy({tags: mergedTags});
      await this.updateReferences(copy);
    }
  }

  async updateReferences(references: References): Promise<void> {
    const postsCollection = collection(this.firestore, 'references');
    this.referencesDocument = doc(postsCollection, 'RqZZRXeZpuBEEd8vAr8Y').withConverter(new References.Converter());
    await setDoc(this.referencesDocument, references);
  }
}
