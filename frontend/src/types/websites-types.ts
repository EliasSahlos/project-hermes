interface WebsiteSources {
    _id: any
    title: string
    icon: string
    value: string
}

interface WebsitesSourcesProps {
    sources: WebsiteSources[]
    onSelectedSources: any
}

