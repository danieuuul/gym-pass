import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { randomUUID } from 'crypto'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }
    this.gyms.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.gyms.find((g) => g.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
  async findMany(query: string, page?: number | undefined) {
    return page
      ? this.gyms
          .filter((g) =>
            Object.values(g).some((value) =>
              value?.toString().toLowerCase().includes(query.toLowerCase()),
            ),
          )
          .slice((page - 1) * 20, page * 20)
      : this.gyms.filter((g) =>
          Object.values(g).some((value) =>
            value?.toString().toLowerCase().includes(query.toLowerCase()),
          ),
        )
  }
  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10 // 10 KM
    })
  }
}
