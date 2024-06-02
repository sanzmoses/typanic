import { supabase } from '@/lib/supabaseClient'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'

export function init() {
  const user = useUserStore()

  async function getUserScores() {
    const { data } = await supabase.from('typanic').select('*')
    user.setUsersScores(data)
  }

  return { 
    getUserScores
  }
}
