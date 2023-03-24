import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { expect, describe, it, beforeEach } from 'vitest'

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -23.0128796,
      longitude: -43.5650192,
    })
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -22.9708427,
      longitude: -43.6955418,
    })
    const { gyms } = await sut.execute({
      userLatitude: -23.0118796,
      userLongitude: -43.5550192,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
