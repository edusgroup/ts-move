import { Move } from '../src'

test('current', () => {
  const move = new Move()
  move.start(0, 10, 20)
  expect(move.current(10)).toBe(0.5)
})

test('primitive methods', () => {
  const move = new Move()
  move.start(0, 10, 20)
  expect(move.duration).toBe(20)
  expect(move.distance).toBe(10)
  expect(move.startTime).toBe(0)

  const mod = (x: number) => x * 2
  move.start(0, 10, 20, mod)
  expect(move.timeModifier).toBe(mod)

  const mod2 = (x: number) => x * 3
  move.distance = 1
  move.duration = 2
  move.startTime = 3
  move.timeModifier = mod2

  expect(move.distance).toBe(1)
  expect(move.duration).toBe(2)
  expect(move.startTime).toBe(3)
  expect(move.timeModifier).toBe(mod2)
})

test('common move', () => {
  const move1 = new Move()
  move1.start(0, 10, 20)
  expect(move1.getDistanceTraveled(10)).toBe(5)

  const move2 = new Move()
  move2.start(0, 8, 20)
  expect(move2.getDistanceTraveled(0)).toBe(0)

  const move3 = new Move()
  move3.start(0, 7, 20)
  expect(move3.getDistanceTraveled(20)).toBe(7)
})

test('wrong duration', () => {
  const move = new Move()
  expect(() => {
    move.start(0, 10, 0)
  }).toThrow()

  expect(() => {
    move.duration = 0
  }).toThrow()
})

test('freeze', () => {
  const move = new Move()
  move.start(0, 10, 20)
  move.freeze(0.5)

  expect(move.freezeTime).toBe(0.5)
  expect(move.getDistanceTraveled(100)).toBe(5)
  expect(move.getDistanceTraveled(2)).toBe(5)

  move.defrost(100, move.freezeTime)
  expect(move.freezeTime).toBe(0)
  expect(move.getDistanceTraveled(100)).toBe(5)
  expect(move.getDistanceTraveled(110)).toBe(10)

  const move2 = new Move()
  move2.start(0, 100, 200)
  move2.freeze(move2.current(100))
  expect(move2.getDistanceTraveled(10000)).toBe(50)
})

test('timeModifier', () => {
  const move = new Move()
  move.start(0, 10, 20, (x) => x / 2)
  expect(move.getDistanceTraveled(20)).toBe(5)
  expect(move.getDistanceTraveled(40)).toBe(10)
})

test('forceMoveTo', () => {
  const move = new Move()
  move.start(0, 10, 20)
  move.forceMoveTo(100, 0.5)
  expect(move.getDistanceTraveled(110)).toBe(10)
})

test('isOutOfBounce', () => {
  const move = new Move()
  move.start(0, 10, 10)
  expect(move.getDistanceTraveled(100)).toBe(100)
  expect(move.getDistanceTraveled(100, false)).toBe(10)
  expect(move.getDistanceTraveled(5, false)).toBe(5)
})
