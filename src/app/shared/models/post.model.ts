import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {FirestoreDataConverter} from "@firebase/firestore";

export class Post {
  readonly id?: string;
  readonly author: string;
  readonly title: string;
  readonly content: string;
  readonly tags: Set<string>;

  constructor({
                id,
                author,
                title,
                content,
                tags = new Set()
              }: Post.Builder) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.content = content;
    this.tags = tags;
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
      tags: new Set(data['tags'])
    });
  }

  toDocumentData(): DocumentData {
    return {
      author: this.author,
      title: this.title,
      content: this.content,
      tags: Array.from(this.tags),
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
    readonly tags: Set<string>;
  }
}
