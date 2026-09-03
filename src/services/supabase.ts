import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://cabvaqbnxpmhcabizmle.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhYnZhcWJueHBtaGNhYml6bWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3Mzc3ODcsImV4cCI6MjEwMzMxMzc4N30.G8wbtuUCo8RS-V6W5zyKuE7p1y-zdKnJXHdaRNtggfI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;