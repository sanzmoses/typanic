import { supabase } from '@/lib/supabaseClient'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { useRuntimeStore } from '@/stores/RuntimeStore'
import dayjs from 'dayjs/esm/index.js'

export function init() {
  const table = "typanic"
  const user_store = useUserStore()
  const runtime = useRuntimeStore()

  async function getUserScores() {
    const { data } = await supabase.from(table).select('*')
    user_store.SET_USERS_SCORES(data)
  }

  function insertOrUpdateUserScore() {
    if(user_store.is_player_exists) {
      updateUserScore()
    } else {
      insertUserScore()
    }

    getUserScores()
  }

  async function insertUserScore() {
    const user_payload = {
      name: user_store.player_name,
      score: runtime.score,
      level: runtime.level
    }
   
    const { error } = await supabase
      .from(table)
      .insert(user_payload)

    if(error) {
      console.error("Error Inserting", error)
    }
  }

  async function updateUserScore() {
    const player_exists = user_store.player_exists
    const record = player_exists[0]

    if(record.score > runtime.score) {
      console.error("Player Score is less than the recorded score")
      return
    }

    const update_user = {
      score: runtime.score,
      level: runtime.level,
      updated_at: dayjs().format() 
    }
    
    const { error } = await supabase
      .from(table)
      .update(update_user)
      .eq('id', record.id)

    if(error) {
      console.error("Error Updating", error)
    }
      
  }

  async function checkIfUserExists(name) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq('name', name)

    if(error) {
      console.error("Error Check Exist", error)
    }

    if(data) {
      user_store.SET_PLAYER_EXISTS(data)
    }

    return data
  }

  return { 
    getUserScores,
    insertUserScore,
    checkIfUserExists,
    updateUserScore,
    insertOrUpdateUserScore
  }
}
