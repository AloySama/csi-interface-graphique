
export default function download(jsonData: any, filename: string) {
    alert(typeof jsonData)
    const blob = new Blob([jsonData], { type: 'text/plain;charset=utf-8;' })
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename)
    } else {
        const link = document.createElement('a')
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', filename)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}
/*
const a = document.createElement("a");
const file = new Blob([content], {type: contentType});
a.href = URL.createObjectURL(file);
a.download = fileName;
a.click();
*/