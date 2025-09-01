import { Id } from '../structures/id'

export abstract class Entity<Props = unknown> {
  readonly id: Id
  protected readonly props: Props

  protected constructor(props: Props, id?: string) {
    this.id = Id.create(id)
    this.props = props
  }

  isEqualTo(entity: Entity): boolean {
    return this.id.value === entity.id.value
  }
}
