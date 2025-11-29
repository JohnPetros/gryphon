import type { LokiAdapterOptions } from '@nozbe/watermelondb/adapters/lokijs'
import type { SQLiteAdapterOptions } from '@nozbe/watermelondb/adapters/sqlite/type'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

export const createAdapter = (
  options: Pick<
    SQLiteAdapterOptions,
    Extract<keyof SQLiteAdapterOptions, keyof LokiAdapterOptions>
  >,
) =>
  new SQLiteAdapter({
    jsi: true,
    ...options,
  })
