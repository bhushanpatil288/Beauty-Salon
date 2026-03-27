const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
}

function getBlockedRanges(appointments: any[]) {
    if (!Array.isArray(appointments)) return [];
    return appointments
        .filter(app => app.status !== 'cancelled')
        .map(app => {
        const start = timeToMinutes(app.time);
        const end = start + Number(app.duration);

        return { start, end };
    });
}

function isSlotAvailable(slot: string, selectedServiceDuration: number, blockedRanges: any[]) {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + selectedServiceDuration;

    return !blockedRanges.some(range =>
        slotStart < range.end && slotEnd > range.start
    );
}

export { timeToMinutes, getBlockedRanges, isSlotAvailable }