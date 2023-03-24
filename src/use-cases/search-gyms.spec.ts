import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { expect, describe, it, beforeEach } from 'vitest'

import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms by query', async () => {
    await gymsRepository.create({
      title: 'Title 1',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: 'Title 2',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: '3',
      description: 'Description of title 3',
      phone: null,
      latitude: 0,
      longitude: 0,
    })
    await gymsRepository.create({
      title: '4',
      description: 'Description of 4',
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'title',
    })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Title 1' }),
      expect.objectContaining({ title: 'Title 2' }),
      expect.objectContaining({ title: '3' }),
    ])
  })

  it('should be able to fetch paginated gyms search by query', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Title ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'title',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Title 21' }),
      expect.objectContaining({ title: 'Title 22' }),
    ])
  })
})
