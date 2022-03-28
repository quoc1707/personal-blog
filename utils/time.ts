const formatTime = (time: string): string => {
    return new Date(time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default formatTime
