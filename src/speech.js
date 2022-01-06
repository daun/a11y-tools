import OnDemandLiveRegion from 'on-demand-live-region'

let liveRegion

export function announce(message) {
  if (!liveRegion) {
    liveRegion = new OnDemandLiveRegion()
  }
  liveRegion.say(message)
}
