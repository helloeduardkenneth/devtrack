import type { ApplicationRecord } from '@/pages/app/mockData'
import { Workbook } from 'exceljs'

type ExportApplication = {
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

const statusColors: Record<string, { fill: string; text: string }> = {
    Applied: { fill: '1E40AF', text: 'FFFFFF' },
    'Phone Screen': { fill: '059669', text: 'FFFFFF' },
    Technical: { fill: '7C3AED', text: 'FFFFFF' },
    Onsite: { fill: 'EA580C', text: 'FFFFFF' },
    Offer: { fill: '059669', text: 'FFFFFF' },
    Rejected: { fill: 'DC2626', text: 'FFFFFF' },
}

const priorityColors: Record<string, { fill: string; text: string }> = {
    High: { fill: 'FEE2E2', text: '991B1B' },
    Medium: { fill: 'FEF3C7', text: '92400E' },
    Low: { fill: 'D1FAE5', text: '065F46' },
}

export const exportApplicationsToExcel = async (
    applications: ApplicationRecord[],
    filename: string = 'applications',
): Promise<void> => {
    const workbook = new Workbook()
    workbook.creator = 'DevTrack'
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('Applications')
    worksheet.columns = [
        { header: 'ID', key: 'ID', width: 10 },
        { header: 'Company', key: 'Company', width: 28 },
        { header: 'Position', key: 'Position', width: 32 },
        { header: 'Location', key: 'Location', width: 22 },
        { header: 'Status', key: 'Status', width: 16 },
        { header: 'Applied Date', key: 'Applied Date', width: 18 },
        { header: 'Last Updated', key: 'Last Updated', width: 18 },
        { header: 'Salary Range', key: 'Salary Range', width: 20 },
        { header: 'Priority', key: 'Priority', width: 12 },
    ]

    const headerRow = worksheet.getRow(1)
    headerRow.height = 32
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1E40AF' },
        }
        cell.font = {
            bold: true,
            size: 12,
            color: { argb: 'FFFFFFFF' },
            name: 'Calibri',
        }
        cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
        }
        cell.border = {
            top: { style: 'thin', color: { argb: 'FF1E3A8A' } },
            left: { style: 'thin', color: { argb: 'FF1E3A8A' } },
            bottom: { style: 'thin', color: { argb: 'FF1E3A8A' } },
            right: { style: 'thin', color: { argb: 'FF1E3A8A' } },
        }
    })

    const rows: ExportApplication[] = applications.map((app) => ({
        ID: String(app.id),
        Company: app.company,
        Position: app.position,
        Location: app.location || 'N/A',
        Status: app.status,
        'Applied Date': new Date(app.appliedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        'Last Updated': new Date(app.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        'Salary Range': app.salaryRange || 'Not specified',
        Priority: app.priority || 'Medium',
    }))

    rows.forEach((rowData, index) => {
        const row = worksheet.addRow(rowData)
        const isEven = index % 2 === 0
        row.eachCell((cell, colNum) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: isEven ? 'FFF8FAFC' : 'FFFFFFFF' },
            }
            cell.font = {
                size: 11,
                color: { argb: 'FF1E293B' },
                name: 'Calibri',
            }
            cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
                wrapText: colNum === 3,
            }
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
            }

            if (colNum === 5 && cell.value) {
                const color = statusColors[cell.value as string]
                if (color) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: `FF${color.fill}` },
                    }
                    cell.font = {
                        bold: true,
                        size: 11,
                        color: { argb: `FF${color.text}` },
                        name: 'Calibri',
                    }
                }
            }

            if (colNum === 9 && cell.value) {
                const color = priorityColors[cell.value as string]
                if (color) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: `FF${color.fill}` },
                    }
                    cell.font = {
                        bold: true,
                        size: 11,
                        color: { argb: `FF${color.text}` },
                        name: 'Calibri',
                    }
                }
            }
        })
    })

    worksheet.views = [{ state: 'frozen', ySplit: 1 }]

    const timestamp = new Date().toISOString().split('T')[0]
    const fullFilename = `${filename.replace('.xlsx', '')}_${timestamp}.xlsx`
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fullFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

export const generateExportFilename = (
    baseName: string = 'applications',
): string => {
    const timestamp = new Date().toISOString().split('T')[0]
    return `${baseName}_${timestamp}.xlsx`
}
