function loopTimes(times, callback) {
    times = times || 0;
    if (times > 0 && typeof callback === "function") {
        callback();
        times--;
        return loopTimes(times, callback);
    }
    if (typeof callback === "function") {
        console.error("callback is not a function");
    }
    return false;
}