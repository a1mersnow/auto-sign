declare namespace media {
  /**
   *
   * @param path
   * @param volume 0-1
   * @param looping
   */
  function playMusic(path: string, volume?: number, looping?: boolean): void
  function getMusicDuration(): number
  /** 同步到相册 */
  function scanFile(path: string): void
  /** 调整音乐播放进度 */
  function musicSeekTo(msec: number): void
  function pauseMusic(): void
  function resumeMusic(): void
  function stopMusic(): void
  function isMusicPlaying(): boolean
  function getMusicDuration(): number
  function getMusicCurrentPosition(): number
}
