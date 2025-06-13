import axios from 'axios'

export const getMockInfluencers = async () => {
  const response = await axios.get('/api/v1/influencer')
  return response
}
