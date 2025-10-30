import { Entity } from '../abstracts'
import { Id } from '../structures'
import type { VaultIcon } from '../types'
import type { VaultDto } from './dtos'

export type VaultProps = {
  title: string
  icon: VaultIcon
  itemCount?: number
  accountId: Id
}

export class Vault extends Entity<VaultProps> {
  static create(dto: VaultDto) {
    return new Vault(
      {
        title: dto.title,
        icon: dto.icon as VaultIcon,
        itemCount: dto.itemCount,
        accountId: Id.create(dto.accountId),
      },
      dto.id,
    )
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

  get accountId(): Id {
    return this.props.accountId
  }

  get dto(): VaultDto {
    return {
      id: this.id.value,
      title: this.title,
      icon: this.icon,
      itemCount: this.itemCount,
      accountId: this.accountId.value,
    }
  }
}
