
import axios from 'axios'

export const fetchAICampaigns = async () => {
  const res = await axios.get('/api/v1/ai/campaigns')
  return res.data.data
}
