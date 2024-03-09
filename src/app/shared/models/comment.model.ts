import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {FirestoreDataConverter} from "@firebase/firestore";
import {DateTime} from "luxon";

export class Comment {
  readonly id?: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly postId: string;
  readonly content: string;
  readonly likes: number;
  readonly createdAt: DateTime
  readonly updatedAt: DateTime

  constructor(builder: Comment.Builder) {
    this.id = builder.id;
    this.authorId = builder.authorId;
    this.authorName = builder.authorName;
    this.postId = builder.postId;
    this.content = builder.content;
    this.likes = builder.likes;
    this.createdAt = builder.createdAt ?? DateTime.now();
    this.updatedAt = builder.updatedAt ?? DateTime.now();
  }

  static fromDocumentData(data: DocumentData): Comment {
    return new Comment({
      id: data['id'],
      authorId: data['authorId'],
      authorName: data['authorName'],
      postId: data['postId'],
      content: data['content'],
      likes: +data['likes'],
      createdAt: DateTime.fromMillis(data['createdAt']),
      updatedAt: DateTime.fromMillis(data['updatedAt']),
    });
  }

  copy(partial: Partial<Comment.Builder>): Comment {
    return new Comment({...this, ...partial});
  }

  toDocumentData(): DocumentData {
    return {
      authorId: this.authorId,
      authorName: this.authorName,
      postId: this.postId,
      content: this.content,
      likes: this.likes,
      createdAt: this.createdAt.toMillis(),
      updatedAt: this.updatedAt.toMillis(),
    }
  }
}

export namespace Comment {

  export class Converter implements FirestoreDataConverter<Comment> {
    toFirestore(modelObject: Comment): DocumentData {
      return modelObject.toDocumentData();
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Comment {
      return Comment.fromDocumentData(snapshot.data(options))
    }
  }

  export interface Builder {
    readonly id?: string;
    readonly authorId: string;
    readonly authorName: string;
    readonly postId: string;
    readonly content: string;
    readonly likes: number;
    readonly createdAt?: DateTime;
    readonly updatedAt?: DateTime;
  }
}
