export const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageBoards'],
} as const;

export const roles = Object.keys(allRoles) as Array<keyof typeof allRoles>;

export const roleRights = new Map(Object.entries(allRoles)) as unknown as Map<keyof typeof allRoles, string[]>;

export type RoleRights = typeof roleRights;
