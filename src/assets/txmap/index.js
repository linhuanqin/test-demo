export function txmap() {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(qq) //注意这里
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://map.qq.com/api/js?v=2.exp&key=MOCBZ-VZQ6K-XBCJJ-ALLJE-MH6OO-MEFHX'
        script.onerror = reject
        document.head.appendChild(script)
    })
}