type TTimeModifierFunc = (time: number) => number

const linear = (x: number) => x

export class Move {
  private _startTime: number = 1
  private _distance: number = 1
  private _duration: number = 1
  private _freezeTime: number = 0
  private _timeModifier: TTimeModifierFunc = linear

  /**
   *
   * @param now timestamp
   * @param distance
   * @param duration
   * @param timeModifier
   */
  public start (now: number, distance: number, duration: number, timeModifier: TTimeModifierFunc = linear) {
    this._startTime = now
    this._distance = distance
    this.duration = duration
    this._timeModifier = timeModifier
  }

  set startTime (now: number) {
    this._startTime = now
  }

  get startTime () {
    return this._startTime
  }

  set distance (distance: number) {
    this._distance = distance
  }

  get distance () {
    return this._distance
  }

  set duration (duration: number) {
    if (duration === 0) {
      throw new Error('Duration can not be zero')
    }
    this._duration = duration
  }

  get duration () {
    return this._duration
  }

  set timeModifier (modifier: TTimeModifierFunc) {
    this._timeModifier = modifier
  }

  get timeModifier () {
    return this._timeModifier
  }

  public forceMoveTo (now: number, time: number) {
    this._startTime = now - time * this._duration
  }

  get freezeTime () {
    return this._freezeTime
  }

  /**
   *
   * @param time Duration from 0..1
   */
  public freeze (time: number) {
    this._freezeTime = time
  }

  /**
   *
   * @param now timestamp
   * @param freezeTime
   */
  public defrost (now: number, freezeTime: number) {
    this.forceMoveTo(now, freezeTime)
    this._freezeTime = 0
  }

  /**
   *
   * @param now Timestamp
   */
  public current (now: number) {
    return (now - this._startTime) / this._duration
  }

  /**
   * Get DistanceTraveled by time
   *
   * @param now Timestamp
   * @param isOutOfBounce
   */
  public getDistanceTraveled (now: number, isOutOfBounce: boolean = true) {
    const time = this._freezeTime !== 0 ? this._freezeTime : this.current(now)
    const value = this._timeModifier(time) * this._distance

    return isOutOfBounce ? value : (value > this.distance ? this.distance : value)
  }
}
