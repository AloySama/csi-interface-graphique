export default function download(jsonData: any, filename: string) {
    const blob = new Blob([JSON.stringify(jsonData, undefined, 2)], { type: 'text/plain;charset=utf-8;' })
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename)
    }
    else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', filename)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
    return true;
}