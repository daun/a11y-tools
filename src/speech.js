import OnDemandLiveRegion from 'on-demand-live-region'

let liveRegion

export function speak(message) {
  if (!liveRegion) {
    liveRegion = new OnDemandLiveRegion()
  }
  liveRegion.say(message)
}
