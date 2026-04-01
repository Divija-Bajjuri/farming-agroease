import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

Deno.serve(async (req) => {
  try {
    const { action, ...data } = await req.json()

    switch (action) {
      case 'register': {
        const { name, mobile, password, village, district, state, farm_size, crop_types, preferred_language } = data

        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('mobile', mobile)
          .single()

        if (existingUser) {
          return new Response(
            JSON.stringify({ error: 'User with this mobile number already exists' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Create user in auth.users
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${mobile}@krishi.local`,
          password: password,
        })

        if (authError) {
          return new Response(
            JSON.stringify({ error: authError.message }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Create user profile in users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user!.id,
            name,
            mobile,
            village: village || '',
            district: district || '',
            state: state || 'Telangana',
            farm_size: farm_size || '',
            crop_types: crop_types || [],
            preferred_language: preferred_language || 'en',
          })
          .select()
          .single()

        if (userError) {
          // Rollback auth user if profile creation fails
          await supabase.auth.admin.deleteUser(authData.user!.id)
          return new Response(
            JSON.stringify({ error: userError.message }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Generate JWT token
        const token = crypto.randomUUID()

        // Store token
        await supabase
          .from('user_tokens')
          .insert({ user_id: authData.user!.id, token })

        return new Response(
          JSON.stringify({
            success: true,
            user: userData,
            token,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      }

      case 'login': {
        const { mobile, password } = data

        // Find user by mobile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('mobile', mobile)
          .single()

        if (userError || !userData) {
          return new Response(
            JSON.stringify({ error: 'Invalid mobile number or password' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Sign in with auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: `${mobile}@krishi.local`,
          password: password,
        })

        if (authError) {
          return new Response(
            JSON.stringify({ error: 'Invalid mobile number or password' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Generate token
        const token = crypto.randomUUID()

        // Store/update token
        await supabase
          .from('user_tokens')
          .upsert({ user_id: authData.user.id, token })

        return new Response(
          JSON.stringify({
            success: true,
            user: userData,
            token,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      }

      case 'verify': {
        const { token } = data

        // Find token
        const { data: tokenData, error: tokenError } = await supabase
          .from('user_tokens')
          .select('*, users(*)')
          .eq('token', token)
          .single()

        if (tokenError || !tokenData) {
          return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({
            success: true,
            user: tokenData.users,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      }

      case 'update_profile': {
        const { token, ...updateData } = data

        // Find user by token
        const { data: tokenData, error: tokenError } = await supabase
          .from('user_tokens')
          .select('*, users(*)')
          .eq('token', token)
          .single()

        if (tokenError || !tokenData) {
          return new Response(
            JSON.stringify({ error: 'Invalid token' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        // Update user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', tokenData.user_id)
          .select()
          .single()

        if (userError) {
          return new Response(
            JSON.stringify({ error: userError.message }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({
            success: true,
            user: userData,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        )
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
