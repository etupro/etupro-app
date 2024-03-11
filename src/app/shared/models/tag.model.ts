import {FirestoreDataConverter} from "@firebase/firestore";
import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";

export class Tag implements Tag.Builder {
  readonly id?: string;
  readonly tag: string;

  constructor({
                id,
                tag
              }: Tag.Builder) {
    this.id = id;
    this.tag = tag;
  }

  static fromDocumentData(data: DocumentData): Tag {
    return new Tag({
      id: data['id'],
      tag: data['tag']
    });
  }

  copy(partial: Partial<Tag.Builder>) {
    return new Tag({...this, ...partial});
  }

  toDocumentData(): DocumentData {
    return {
      tag: this.tag,
    }
  }
}

export namespace Tag {

  export class Converter implements FirestoreDataConverter<Tag> {
    toFirestore(modelObject: Tag): DocumentData {
      return modelObject.toDocumentData();
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Tag {
      return Tag.fromDocumentData(snapshot.data(options))
    }
  }

  export interface Builder {
    readonly id?: string;
    readonly tag: string;
  }
}
