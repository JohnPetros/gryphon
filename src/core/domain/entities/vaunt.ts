import { Entity } from '../abstracts'
import type { VauntDto } from './dtos'

export type VauntProps = {
  title: string
  icon: string
  itemCount?: number
}

export class Vaunt extends Entity<VauntProps> {
  static create(dto: VauntDto) {
    return new Vaunt(dto, dto.id)
  }

  get title(): string {
    return this.props.title
  }

  get icon(): string {
    return this.props.icon
  }

  get itemCount(): number {
    return this.props.itemCount ?? 0
  }

  get dto(): VauntDto {
    return {
      id: this.id.value,
      title: this.title,
      icon: this.icon,
      itemCount: this.itemCount,
    }
  }
}
