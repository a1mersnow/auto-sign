import { createChain } from '../../init'
import browser from './browser'
import community from './community'
import wallet from './wallet'
import themeStore from './theme-store'
import market from './market'
import mine from './mine'
import appStore from './app-store'
import gameCenter from './game-center'
import music from './music'
import video from './video'
import breeno from './breeno'
import ai from './ai'
import cut from './cut'

export default createChain([
  browser,
  community,
  wallet,
  themeStore,
  market,
  mine,
  appStore,
  gameCenter,
  music,
  video,
  breeno,
  ai,
  cut,
])
