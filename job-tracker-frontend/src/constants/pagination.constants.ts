const toPositiveInt = (value: string | undefined, fallback: number) => {
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export const APPLICATIONS_ITEMS_PER_PAGE = toPositiveInt(
    import.meta.env.VITE_APPLICATIONS_ITEMS_PER_PAGE,
    10,
)
