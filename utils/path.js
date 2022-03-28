const generatePath = (title) => {
    const path = title
        .toLowerCase()
        .replace(',', '')
        .replace('.', '')
        .replace('?', '')
        .replace("'", '')
        .replace(' - ', ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s/g, '-')
        .replace(/-{2,}/g, '-')
    return path
}

export default generatePath
