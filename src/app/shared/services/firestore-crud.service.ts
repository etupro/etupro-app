import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, onSnapshot, Query, QuerySnapshot, updateDoc } from "@angular/fire/firestore";
import { FirestoreDataConverter } from "@firebase/firestore";
import { BehaviorSubject } from "rxjs";

export abstract class FirestoreCrudService<T> {
  collectionReference: CollectionReference<T>;
  updatedSnapshot$ = new BehaviorSubject<QuerySnapshot<T, DocumentData> | undefined>(undefined);

  constructor(protected path: string,
              protected converter: FirestoreDataConverter<T>,
              protected firestore: Firestore) {
    this.collectionReference = collection(this.firestore, path).withConverter(converter);

    // Get Realtime Data
    onSnapshot(this.collectionReference, (snapshot) => {
      this.updatedSnapshot$.next(snapshot);
    }, (err) => {
      console.log(err);
    });
  }

  abstract createEntity(id: string, data: T): T;

  async get(id: string): Promise<T | undefined> {
    const snapshot = await getDoc(doc(this.collectionReference, id));
    const data = snapshot.data();
    return data ? this.createEntity(snapshot.id, data) : undefined;
  }

  protected async getAllWithQuery(q: Query<T>): Promise<T[]> {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(qds => this.createEntity(qds.id, qds.data()));
  }

  async create(item: T): Promise<string> {
    const ref = await addDoc(this.collectionReference, item)
    return ref.id;
  }

  async delete(docId?: string): Promise<void> {
    if (docId) {
      const docRef = doc(this.collectionReference, docId)
      await deleteDoc(docRef);
    }
    return;
  }

  async update(docId: string, name: string, age: string): Promise<void> {
    const docRef = doc(this.collectionReference, docId);
    await updateDoc(docRef, {name, age})
    return;
  }
}
