export const queryKeys = {
    auth: {
        signup: ['auth', 'signup'] as const,
        signin: ['auth', 'signin'] as const,
        profile: ['auth', 'get-user-profile'] as const,
    },
    applications: {
        list: ['applications', 'list'] as const,
        create: ['applications', 'create'] as const,
        update: ['applications', 'update'] as const,
        delete: ['applications', 'delete'] as const,
        bulkUpdateStatus: ['applications', 'bulk-update-status'] as const,
        bulkDelete: ['applications', 'bulk-delete'] as const,
    },
}
