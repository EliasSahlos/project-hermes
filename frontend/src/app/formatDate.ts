export function formatDate(isoDate: string, locale: string = "en-US"): string {
    const date: Date = new Date(isoDate)
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", weekday: "long" }
    return date.toLocaleDateString(locale, options)
}