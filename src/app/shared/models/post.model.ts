import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {FirestoreDataConverter} from "@firebase/firestore";
import {DateTime} from "luxon";

export class Post {
  readonly id?: string;
  readonly author: string;
  readonly title: string;
  readonly content: string;
  readonly tags: Set<string>;
  readonly createdAt: DateTime
  readonly updatedAt: DateTime

  constructor(builder: Post.Builder) {
    this.id = builder.id;
    this.author = builder.author;
    this.title = builder.title;
    this.content = builder.content;
    this.tags = builder.tags ?? new Set();
    this.createdAt = builder.createdAt ?? DateTime.now();
    this.updatedAt = builder.updatedAt ?? DateTime.now();
  }

  copy(partial: Partial<Post.Builder>): Post {
    return new Post({...this, ...partial});
  }

  static fromDocumentData(data: DocumentData): Post {
    return new Post({
      id: data['id'],
      author: data['author'],
      title: data['title'],
      content: data['content'],
      tags: new Set(data['tags']),
      createdAt: DateTime.fromMillis(data['createdAt']),
      updatedAt: DateTime.fromMillis(data['updatedAt']),
    });
  }

  toDocumentData(): DocumentData {
    return {
      author: this.author,
      title: this.title,
      content: this.content,
      tags: Array.from(this.tags),
      createdAt: this.createdAt.toMillis(),
      updatedAt: this.updatedAt.toMillis(),
    }
  }
}

export namespace Post {

  export class Converter implements FirestoreDataConverter<Post> {
    toFirestore(modelObject: Post): DocumentData {
      return modelObject.toDocumentData();
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Post {
      return Post.fromDocumentData(snapshot.data(options))
    }
  }

  export interface Builder {
    readonly id?: string;
    readonly author: string;
    readonly title: string;
    readonly content: string;
    readonly tags?: Set<string>;
    readonly createdAt?: DateTime;
    readonly updatedAt?: DateTime;
  }
}
