import { Role } from '@prisma/client'

export type Permission = 
  | 'companies:read'
  | 'companies:write'
  | 'companies:delete'
  | 'quotes:read'
  | 'quotes:write'
  | 'quotes:delete'
  | 'quotes:send'
  | 'subscriptions:read'
  | 'subscriptions:write'
  | 'subscriptions:delete'
  | 'renewals:run'
  | 'payments:read'
  | 'payments:write'
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'settings:read'
  | 'settings:write'

const rolePermissions: Record<Role, Permission[]> = {
  OWNER: [
    'companies:read', 'companies:write', 'companies:delete',
    'quotes:read', 'quotes:write', 'quotes:delete', 'quotes:send',
    'subscriptions:read', 'subscriptions:write', 'subscriptions:delete',
    'renewals:run',
    'payments:read', 'payments:write',
    'users:read', 'users:write', 'users:delete',
    'settings:read', 'settings:write'
  ],
  ADMIN: [
    'companies:read', 'companies:write',
    'quotes:read', 'quotes:write', 'quotes:send',
    'subscriptions:read', 'subscriptions:write',
    'renewals:run',
    'payments:read', 'payments:write',
    'users:read', 'users:write',
    'settings:read', 'settings:write'
  ],
  SALES: [
    'companies:read', 'companies:write',
    'quotes:read', 'quotes:write', 'quotes:send',
    'subscriptions:read', 'subscriptions:write',
    'payments:read'
  ],
  SUPPORT: [
    'companies:read',
    'quotes:read',
    'subscriptions:read',
    'payments:read'
  ],
  FINANCE: [
    'companies:read',
    'quotes:read',
    'subscriptions:read',
    'payments:read', 'payments:write'
  ]
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function requirePermission(role: Role, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Insufficient permissions. Required: ${permission}`)
  }
}
