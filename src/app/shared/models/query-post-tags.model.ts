import { Params } from '@angular/router';

export class QueryPostTags {
  tags: string[] | undefined;
  departmentId: number | undefined;
  emitorStatus: string | undefined;
  lifecycle: string | undefined;

  constructor(builder?: QueryPostTags.Builder) {
    this.tags = builder?.tags;
    this.departmentId = builder?.departmentId;
    this.emitorStatus = builder?.emitorStatus;
    this.lifecycle = builder?.lifecycle;
  }

  static fromQueryParams(queryParams: Params | null | undefined): QueryPostTags {
    if (!queryParams) return new QueryPostTags();

    const tags = queryParams['tags']?.split(',') || [];
    const departmentId = queryParams['departmentId'] ? parseInt(queryParams['departmentId'], 10) : undefined;
    const emitorStatus = queryParams['emitorStatus'];
    const lifecycle = queryParams['lifecycle'];

    return new QueryPostTags({
      tags,
      departmentId,
      emitorStatus,
      lifecycle,
    });
  }

  toQueryParams(): Params {
    return {
      'tags': this.tags?.length ? this.tags.join(',') : undefined,
      'departmentId': this.departmentId ? this.departmentId.toString() : undefined,
      'emitorStatus': this.emitorStatus,
      'lifecycle': this.lifecycle,
    };
  }

  filterCount(): number {
    return (this.tags?.length ?? 0) + (this.departmentId ? 1 : 0) + (this.emitorStatus ? 1 : 0) + (this.lifecycle ? 1 : 0);
  }
}

export namespace QueryPostTags {
  export interface Builder {
    tags?: string[];
    departmentId?: number;
    emitorStatus?: string;
    lifecycle?: string;
  }
}
