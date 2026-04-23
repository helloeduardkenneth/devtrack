import type { IApplicationItem } from '@/queries/applications/applications.queries'

export interface KanbanCard {
    id: number
    company: string
    companyLogo: string | null
    position: string
    location: string | null
    priority: 'High' | 'Medium' | 'Low'
    status: string
}

const priorityMap: Record<string, 'High' | 'Medium' | 'Low'> = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
}

const statusMap: Record<string, string> = {
    APPLIED: 'Applied',
    PHONE_SCREEN: 'Phone Screen',
    TECHNICAL: 'Technical',
    ONSITE: 'Onsite',
    OFFER: 'Offer',
    REJECTED: 'Rejected',
}

export const mapApplicationToCard = (app: IApplicationItem): KanbanCard => ({
    id: app.id,
    company: app.company ?? '',
    companyLogo: app.company_logo_url ?? null,
    position: app.position ?? '',
    location: app.location ?? null,
    priority: priorityMap[app.priority] || 'Medium',
    status: statusMap[app.status] || 'Applied',
})
