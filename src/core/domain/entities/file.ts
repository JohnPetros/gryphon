import { Entity } from '../abstracts/entity'
import type { FileDto } from './dtos'

type Props = {
  name: string
  size: number
  createdAt: Date
}

export class File extends Entity<Props> {
  static create(dto: FileDto) {
    return new File(
      {
        name: dto.name,
        size: dto.size,
        createdAt: new Date(dto.createdAt),
      },
      dto.id,
    )
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get dto(): FileDto {
    return {
      id: this.id.value,
      name: this.props.name,
      size: this.props.size,
      createdAt: this.props.createdAt,
    }
  }
}
