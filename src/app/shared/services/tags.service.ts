import {Injectable} from '@angular/core';
import {Firestore, orderBy, query, QueryDocumentSnapshot} from "@angular/fire/firestore";
import {Tag} from "../models/tag.model";
import {FirestoreCrudService} from "./firestore-crud.service";

@Injectable({
  providedIn: 'root'
})
export class TagsService extends FirestoreCrudService<Tag> {

  constructor(protected override firestore: Firestore) {
    super('tags', new Tag.Converter(), firestore);
  }

  override createEntity(qds: QueryDocumentSnapshot<Tag>): Tag {
    return new Tag({
      ...qds.data(),
      id: qds.id
    })
  }

  override async getAll(): Promise<Tag[]> {
    const q = query(this.collectionReference, orderBy('tag', 'asc'));
    return await this.getAllWithQuery(q);
  }
}
