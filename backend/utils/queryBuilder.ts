import { Prisma } from '@prisma/client';

interface QueryOptions {
  select?: Record<string, boolean>;
  include?: Record<string, boolean>;
  where?: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  skip?: number;
  take?: number;
}

class QueryBuilder {
  private query: any;

  constructor(initialQuery: any = {}) {
    this.query = initialQuery;
  }

  // Selecteer specifieke velden
  select(fields: string[]): QueryBuilder {
    this.query.select = fields.reduce((acc, field) => ({
      ...acc,
      [field]: true
    }), {});
    return this;
  }

  // Include gerelateerde data
  include(relations: string[]): QueryBuilder {
    this.query.include = relations.reduce((acc, relation) => ({
      ...acc,
      [relation]: true
    }), {});
    return this;
  }

  // Voeg where clause toe
  where(conditions: Record<string, any>): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      ...conditions
    };
    return this;
  }

  // Voeg OR conditie toe
  orWhere(conditions: Record<string, any>[]): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      OR: conditions
    };
    return this;
  }

  // Voeg AND conditie toe
  andWhere(conditions: Record<string, any>[]): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      AND: conditions
    };
    return this;
  }

  // Sorteer resultaten
  orderBy(field: string, direction: 'asc' | 'desc'): QueryBuilder {
    this.query.orderBy = {
      [field]: direction
    };
    return this;
  }

  // Paginatie
  paginate(page: number, perPage: number): QueryBuilder {
    this.query.skip = (page - 1) * perPage;
    this.query.take = perPage;
    return this;
  }

  // Voeg search filter toe
  search(field: string, term: string): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      [field]: {
        contains: term,
        mode: 'insensitive'
      }
    };
    return this;
  }

  // Voeg date range filter toe
  dateRange(field: string, start: Date, end: Date): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      [field]: {
        gte: start,
        lte: end
      }
    };
    return this;
  }

  // Voeg numeric range filter toe
  numberRange(field: string, min: number, max: number): QueryBuilder {
    this.query.where = {
      ...this.query.where,
      [field]: {
        gte: min,
        lte: max
      }
    };
    return this;
  }

  // Groepeer resultaten
  groupBy(fields: string[]): QueryBuilder {
    this.query.groupBy = fields;
    return this;
  }

  // Voeg having clause toe
  having(conditions: Record<string, any>): QueryBuilder {
    this.query.having = conditions;
    return this;
  }

  // Bouw de query
  build(): Prisma.PrismaPromise<any> {
    return this.query;
  }
}

export default QueryBuilder;
