import {FirestoreDataConverter} from "@firebase/firestore";
import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";

export class References {
  readonly id?: string;
  readonly tags: Set<string>;

  constructor(builder: References.Builder) {
    this.id = builder.id;
    this.tags = builder.tags;
  }

  static newBuilder(): References.Builder {
    return new References.Builder();
  }

  static empty(): References {
    return References.newBuilder().build();
  }

  static copy(copy: References): References.Builder {
    return References.newBuilder()
      .withId(copy.id)
      .withTags(copy.tags);
  }

  static fromDocumentData(data: DocumentData): References {
    return this.newBuilder()
      .withId(data['id'])
      .withTags(data['tags'])
      .build();
  }

  toDocumentData(): DocumentData {
    return {
      tags: this.tags,
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

  export class Builder {
    id?: string;
    tags: Set<string>;

    constructor() {
      this.tags = new Set();
    }

    withId(id?: string): Builder {
      this.id = id;
      return this;
    }

    withTags(tags: Set<string>): Builder {
      this.tags = tags;
      return this;
    }

    build(): References {
      return new References(this);
    }
  }
}
