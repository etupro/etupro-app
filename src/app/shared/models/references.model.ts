import {FirestoreDataConverter} from "@firebase/firestore";
import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";

export class References implements References.Builder {
  readonly id?: string;
  readonly tags: Set<string>;

  constructor({
                id,
                tags = new Set()
  }: References.Builder) {
    this.id = id;
    this.tags = tags;
  }

  copy(partial: Partial<References.Builder>) {
    return new References({...this, ...partial});
  }

  static fromDocumentData(data: DocumentData): References {
    return new References({
      id: data['id'],
      tags: new Set(data['tags'])
    });
  }

  toDocumentData(): DocumentData {
    return {
      tags: Array.from(this.tags),
    }
  }
}

export namespace References {

  export class Converter implements FirestoreDataConverter<References> {
    toFirestore(modelObject: References): DocumentData {
      return modelObject.toDocumentData();
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): References {
      return References.fromDocumentData(snapshot.data(options))
    }
  }

  export interface Builder {
    readonly id?: string;
    readonly tags?: Set<string>;
  }
}
