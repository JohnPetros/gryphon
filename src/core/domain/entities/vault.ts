import { Entity } from '../abstracts'
import type { VaultIcon } from '../types'
import type { VaultDto } from './dtos'

export type VaultProps = {
  title: string
  icon: VaultIcon
  itemCount?: number
}

export class Vault extends Entity<VaultProps> {
  static create(dto: VaultDto) {
    return new Vault(dto, dto.id)
  }

  get title(): string {
    return this.props.title
  }

  get icon(): VaultIcon {
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
