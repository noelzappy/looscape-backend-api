const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
} as const;

const roles = Object.keys(allRoles) as Array<keyof typeof allRoles>;

const roleRights = new Map(Object.entries(allRoles)) as unknown as Map<keyof typeof allRoles, string[]>;

module.exports = {
  roles,
  roleRights,
};
