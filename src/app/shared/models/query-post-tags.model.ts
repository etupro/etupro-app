import { Params } from '@angular/router';

export class QueryPostTags {
  tags: string[] | undefined;
  departmentId: number | undefined;

  constructor(builder?: QueryPostTags.Builder) {
    this.tags = builder?.tags;
    this.departmentId = builder?.departmentId;
  }

  static fromQueryParams(queryParams: Params | null | undefined): QueryPostTags {
    if (!queryParams) return new QueryPostTags();

    const tags = queryParams['tags']?.split(',') || [];
    const departmentId = queryParams['departmentId'] ? parseInt(queryParams['departmentId'], 10) : undefined;

    return new QueryPostTags({
      tags,
      departmentId,
    });
  }

  toQueryParams(): Params {
    return {
      'tags': this.tags?.length ? this.tags.join(',') : undefined,
      'departmentId': this.departmentId ? this.departmentId.toString() : undefined,
    };
  }
}

export namespace QueryPostTags {
  export interface Builder {
    tags?: string[];
    departmentId?: number;
  }
}
