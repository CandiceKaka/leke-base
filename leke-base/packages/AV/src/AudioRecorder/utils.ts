/**
 * 时间格式化
 * @param seconds
 */
export const timeFormat = (seconds: number) => {
    let min = Math.floor(seconds / 60);
    let second = seconds % 60;
    return `${min}'${second < 10 ? "0" + second : second}"`;
};

/**
 * 二进制转base64
 * @param blob
 */
export const blobToDataURI = (blob) => {
    return new Promise(function (reolove, reject) {
        const reader = new FileReader();
        reader.onload = function (e) {
            reolove(e.target.result);
        };
        reader.readAsDataURL(blob);
    });
};
