import { createSupabaseClient } from './supabase'
import { Constants, type Tables } from '../types/database'

describe('createSupabaseClient', () => {
  it('returns null when the URL or key is missing', () => {
    expect(createSupabaseClient(undefined, 'key')).toBeNull()
    expect(createSupabaseClient('https://example.supabase.co', undefined)).toBeNull()
    expect(createSupabaseClient('', '')).toBeNull()
  })

  it('creates a client when both values are present', () => {
    const client = createSupabaseClient('https://example.supabase.co', 'public-anon-key')
    expect(client).not.toBeNull()
    expect(typeof client?.from).toBe('function')
  })
})

describe('generated database types', () => {
  it('expose the adult roles and the profiles row shape', () => {
    expect(Constants.public.Enums.adult_role).toEqual(['parent', 'teacher'])
    const row: Tables<'profiles'> = {
      id: '00000000-0000-4000-8000-000000000001',
      roles: ['parent'],
      display_name: null,
      preferred_language: 'ar',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    }
    expect(row.roles).toContain('parent')
  })
})
