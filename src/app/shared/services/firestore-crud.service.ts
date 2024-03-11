import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  onSnapshot,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc
} from "@angular/fire/firestore";
import {Observable, Subject} from "rxjs";
import {FirestoreDataConverter} from "@firebase/firestore";

export abstract class FirestoreCrudService<T> {
  collectionReference: CollectionReference<T>;
  private updatedSnapshot = new Subject<QuerySnapshot<T>>();
  updatedSnapshot$ = this.updatedSnapshot.asObservable();

  constructor(protected path: string,
              protected converter: FirestoreDataConverter<T>,
              protected firestore: Firestore) {
    this.collectionReference = collection(this.firestore, path).withConverter(converter);

    // Get Realtime Data
    onSnapshot(this.collectionReference, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  abstract createEntity(qds: QueryDocumentSnapshot<T>): T;

  async getAll(): Promise<T[]> {
    const snapshot = await getDocs(this.collectionReference);
    return snapshot.docs.map(this.createEntity);
  }

  get(id: string): Observable<T | undefined> {
    return docData(doc(this.collectionReference, id));
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

  protected async getAllWithQuery(q: Query<T>): Promise<T[]> {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(this.createEntity);
  }
}
