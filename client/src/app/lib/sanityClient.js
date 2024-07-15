import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nw03is8d',
  dataset: 'production',
  apiVersion: 'v1', // use current UTC date - see "specifying API version"!
  useCdn: false // `false` if you want to ensure fresh data
})
