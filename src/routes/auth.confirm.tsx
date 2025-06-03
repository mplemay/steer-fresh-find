import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type LoaderFunctionArgs, redirect } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = requestUrl.searchParams.get('next') || '/'

  if (!token_hash || !type) {
    return redirect(`/auth/error?error=No token hash or type`)
  }

  const { supabase, headers } = createClient(request)
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  })

  if (error) {
    return redirect(`/auth/error?error=${error.message}`)
  }

  // Redirect to home after successful email confirmation
  return redirect('/home', { headers })
}
