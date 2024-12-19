import { Params } from '@angular/router';

export class QueryPostTags {
  tags: string[] | undefined;
  departmentCode: string | undefined;
  emitorStatus: string | undefined;
  lifecycle: string | undefined;

  constructor(builder?: QueryPostTags.Builder) {
    this.tags = builder?.tags;
    this.departmentCode = builder?.departmentCode;
    this.emitorStatus = builder?.emitorStatus;
    this.lifecycle = builder?.lifecycle;
  }

  static fromQueryParams(queryParams: Params | null | undefined): QueryPostTags {
    if (!queryParams) return new QueryPostTags();

    const tags = queryParams['tags']?.split(',') || [];
    const departmentCode = queryParams['departmentCode'];
    const emitorStatus = queryParams['emitorStatus'];
    const lifecycle = queryParams['lifecycle'];

    return new QueryPostTags({
      tags,
      departmentCode: departmentCode,
      emitorStatus,
      lifecycle,
    });
  }

  toQueryParams(): Params {
    return {
      'tags': this.tags?.length ? this.tags.join(',') : undefined,
      'departmentCode': this.departmentCode ? this.departmentCode.toString() : undefined,
      'emitorStatus': this.emitorStatus,
      'lifecycle': this.lifecycle,
    };
  }

  filterCount(): number {
    return (this.tags?.length ?? 0) + (this.departmentCode ? 1 : 0) + (this.emitorStatus ? 1 : 0) + (this.lifecycle ? 1 : 0);
  }
}

export namespace QueryPostTags {
  export interface Builder {
    tags?: string[];
    departmentCode?: string;
    emitorStatus?: string;
    lifecycle?: string;
  }
}
