declare module 'datasource-sql' {
    import { DataSource } from 'apollo-datasource'
    import { Config, QueryInterface } from 'knex'

    export class SQLDataSource<TContext = any> extends DataSource<TContext> {
        constructor(knexConfig: Config)

        protected knex: QueryInterface
    }
}