import type { ApplicationRecord } from '@/pages/app/mockData'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let capturedRows: Array<Record<string, unknown>> = []
const mockWriteBuffer = vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3, 4]))

vi.mock('exceljs', () => {
    class MockWorkbook {
        creator = ''
        created: Date | null = null
        xlsx = { writeBuffer: mockWriteBuffer }

        addWorksheet() {
            return {
                columns: [],
                views: [],
                getRow: vi.fn().mockReturnValue({
                    height: 0,
                    eachCell: vi.fn(),
                }),
                addRow: vi.fn((row: Record<string, unknown>) => {
                    capturedRows.push(row)
                    return {
                        eachCell: vi.fn(),
                    }
                }),
            }
        }
    }

    return { Workbook: MockWorkbook }
})

import { exportApplicationsToExcel } from '@/utils/export.utils'

type ExportedRow = {
    ID: string
    Company: string
    Position: string
    Location: string
    Status: string
    'Applied Date': string
    'Last Updated': string
    'Salary Range': string
    Priority: string
}

const REQUIRED_COLUMNS: Array<keyof ExportedRow> = [
    'ID',
    'Company',
    'Position',
    'Location',
    'Status',
    'Applied Date',
    'Last Updated',
    'Salary Range',
    'Priority',
]

describe('exportApplicationsToExcel', () => {
    let mockApplications: ApplicationRecord[]
    let mockCreateObjectURL: ReturnType<typeof vi.spyOn>
    let mockRevokeObjectURL: ReturnType<typeof vi.spyOn>
    let mockClick: ReturnType<typeof vi.spyOn>
    let mockLink: HTMLAnchorElement

    beforeEach(() => {
        vi.clearAllMocks()
        capturedRows = []

        mockLink = document.createElement('a')
        mockClick = vi.spyOn(mockLink, 'click').mockImplementation(() => {})
        vi.spyOn(document, 'createElement').mockReturnValue(mockLink)
        vi.spyOn(document.body, 'appendChild').mockImplementation(
            () => mockLink,
        )
        vi.spyOn(document.body, 'removeChild').mockImplementation(
            () => mockLink,
        )

        mockCreateObjectURL = vi
            .spyOn(globalThis.URL, 'createObjectURL')
            .mockReturnValue('blob:mock-url')
        mockRevokeObjectURL = vi
            .spyOn(globalThis.URL, 'revokeObjectURL')
            .mockImplementation(() => {})

        globalThis.Blob = class MockBlob {
            content: unknown
            options: BlobPropertyBag | undefined
            size: number
            type: string

            constructor(content: unknown, options?: BlobPropertyBag) {
                this.content = content
                this.options = options
                this.size = 100
                this.type = options?.type || ''
            }
        } as unknown as typeof Blob

        mockApplications = [
            {
                id: '1',
                company: 'Test Company',
                companyLogo: 'https://example.com/logo.png',
                position: 'Software Engineer',
                location: 'New York',
                status: 'Applied',
                appliedDate: '2024-01-15',
                lastUpdated: '2024-01-20',
                salaryRange: '$100k - $150k',
                priority: 'High',
                tags: ['remote', 'urgent'],
            },
            {
                id: '2',
                company: 'Another Company',
                companyLogo: '',
                position: 'Senior Developer',
                location: 'San Francisco',
                status: 'Phone Screen',
                appliedDate: '2024-02-10',
                lastUpdated: '2024-02-15',
                salaryRange: '$120k - $180k',
                priority: 'Medium',
            },
        ]
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('downloads an excel file when export is triggered', async () => {
        await exportApplicationsToExcel(mockApplications, 'applications.xlsx')

        expect(mockWriteBuffer).toHaveBeenCalledTimes(1)
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(1)
        expect(mockLink.download).toMatch(
            /applications_\d{4}-\d{2}-\d{2}\.xlsx/,
        )
        expect(mockClick).toHaveBeenCalledTimes(1)
        expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })

    it('exports required columns with non-empty values', async () => {
        await exportApplicationsToExcel(mockApplications, 'test.xlsx')

        const rows = capturedRows as ExportedRow[]
        expect(rows.length).toBe(2)

        rows.forEach((row, rowIndex) => {
            REQUIRED_COLUMNS.forEach((column) => {
                const value = row[column]
                expect(
                    value !== undefined &&
                        value !== null &&
                        String(value).trim() !== '',
                    `Row ${rowIndex + 1} has empty value for "${column}"`,
                ).toBe(true)
            })
        })
    })

    it('fills default Priority when source value is missing', async () => {
        const applicationsWithoutPriority: ApplicationRecord[] = [
            {
                id: '3',
                company: 'No Priority Company',
                companyLogo: '',
                position: 'Developer',
                location: 'Remote',
                status: 'Offer',
                appliedDate: '2024-03-01',
                lastUpdated: '2024-03-10',
                salaryRange: '$90k - $120k',
            },
        ]

        await exportApplicationsToExcel(
            applicationsWithoutPriority,
            'test.xlsx',
        )
        const row = capturedRows[0] as ExportedRow

        expect(row.Priority).toBe('Medium')
    })
})
