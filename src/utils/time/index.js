export const convertTime = (utcTimestamp) => {
    const dateUtc = new Date(utcTimestamp);
    const utcMilliseconds = dateUtc.getTime();
    const gmtPlus7Offset = 7 * 60 * 60 * 1000;
    const gmtPlus7Milliseconds = utcMilliseconds + gmtPlus7Offset;
    const dateGmtPlus7 = new Date(gmtPlus7Milliseconds);
    return dateGmtPlus7.toISOString();
};
export function roundTime(timestamp) {
    const now = new Date();
    const timeDifference = (now - timestamp) / 1000; // Convert to seconds

    if (timeDifference < 60) {
        return 'vừa xong';
    } else if (timeDifference < 3600) { // Less than 1 hour
        return `${Math.round(timeDifference / 60)} phút trước`;
    } else if (timeDifference < 86400) { // Less than 24 hours
        return `${Math.round(timeDifference / 3600)} giờ trước`;
    } else {
        return `${Math.round(timeDifference / 86400)} ngày trước`;
    }
}