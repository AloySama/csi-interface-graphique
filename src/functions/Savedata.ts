export default function download(jsonData: any, filename: string, settings: Record<string, unknown>) {
    let space;
    if (settings['space'] != 0) {
         space = settings['space'];
    }
    else {
         space = 2;
    }
    //@ts-ignore
    if (settings['name'].length != 0) filename = settings['name'];
    // @ts-ignore
    const blob = new Blob([JSON.stringify(jsonData, undefined, space)], { type: 'text/plain;charset=utf-8;' })
    console.log(settings['name'])
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