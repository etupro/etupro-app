import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {FirestoreDataConverter} from "@firebase/firestore";
import {DateTime} from "luxon";

export class Post {
  readonly id?: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly createdAt: DateTime
  readonly updatedAt: DateTime

  constructor(builder: Post.Builder) {
    this.id = builder.id;
    this.authorId = builder.authorId;
    this.authorName = builder.authorName;
    this.title = builder.title;
    this.content = builder.content;
    this.tags = builder.tags ?? [];
    this.createdAt = builder.createdAt ?? DateTime.now();
    this.updatedAt = builder.updatedAt ?? DateTime.now();
  }

  copy(partial: Partial<Post.Builder>): Post {
    return new Post({...this, ...partial});
  }

  static fromDocumentData(data: DocumentData): Post {
    return new Post({
      id: data['id'],
      authorId: data['authorId'],
      authorName: data['authorName'],
      title: data['title'],
      content: data['content'],
      tags: data['tags'],
      createdAt: DateTime.fromMillis(data['createdAt']),
      updatedAt: DateTime.fromMillis(data['updatedAt']),
    });
  }

  toDocumentData(): DocumentData {
    return {
      authorId: this.authorId,
      authorName: this.authorName,
      title: this.title,
      content: this.content,
      tags: this.tags,
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
    readonly authorId: string;
    readonly authorName: string;
    readonly title: string;
    readonly content: string;
    readonly tags?: string[];
    readonly createdAt?: DateTime;
    readonly updatedAt?: DateTime;
  }
}
