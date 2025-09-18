import { Entity } from '../abstracts'
import type { VaultDto } from './dtos'

export type VaultProps = {
  title: string
  icon: string
  itemCount?: number
}

export class Vault extends Entity<VaultProps> {
  static create(dto: VaultDto) {
    return new Vault(dto, dto.id)
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

  get dto(): VaultDto {
    return {
      id: this.id.value,
      title: this.title,
      icon: this.icon,
      itemCount: this.itemCount,
    }
  }
}
