export default function download(jsonData: any, filename: string, settings: Record<string, any>) {
    let space = 2;
    if (typeof settings['name'] !== 'undefined' && typeof settings['space'] !== 'undefined') {
        if (settings['space'] != null) space = settings['space'];
        if (settings['name'].length != 0) filename = settings['name'];
        if (typeof settings['stringify'] !== 'undefined' && !settings['stringify']) space = 0
    }
    const blob = new Blob([JSON.stringify(jsonData, undefined, space)], { type: 'text/plain;charset=utf-8;' })
    if (navigator.msSaveBlob) navigator.msSaveBlob(blob, filename)
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