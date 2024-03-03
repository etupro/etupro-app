import {DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {FirestoreDataConverter} from "@firebase/firestore";

export class Post {
  readonly id?: string;
  readonly author: string;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];

  constructor(builder: Post.Builder) {
    this.id = builder.id;
    this.author = builder.author;
    this.title = builder.title;
    this.content = builder.content;
    this.tags = builder.tags;
  }

  static newBuilder(): Post.Builder {
    return new Post.Builder();
  }

  static empty(): Post {
    return Post.newBuilder().build();
  }

  static copy(copy: Post): Post.Builder {
    return Post.newBuilder()
      .withId(copy.id)
      .withAuthor(copy.author)
      .withTitle(copy.title)
      .withContent(copy.content)
      .withTags(copy.tags);
  }

  static fromDocumentData(data: DocumentData): Post {
    return this.newBuilder()
      .withId(data['id'])
      .withAuthor(data['author'])
      .withTitle(data['title'])
      .withContent(data['content'])
      .withTags(data['tags'])
      .build();
  }

  toDocumentData(): DocumentData {
    return {
      author: this.author,
      title: this.title,
      content: this.content,
      tags: this.tags,
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

  export class Builder {
    id?: string;
    author: string;
    title: string;
    content: string;
    tags: string[];

    constructor() {
      this.author = '';
      this.title = '';
      this.content = '';
      this.tags = []
    }

    withId(id?: string): Builder {
      this.id = id;
      return this;
    }

    withAuthor(author: string): Builder {
      this.author = author;
      return this;
    }

    withTitle(title: string): Builder {
      this.title = title;
      return this;
    }

    withContent(content: string): Builder {
      this.content = content;
      return this;
    }

    withTags(tags: string[]): Builder {
      this.tags = tags;
      return this;
    }

    build(): Post {
      return new Post(this);
    }
  }
}
