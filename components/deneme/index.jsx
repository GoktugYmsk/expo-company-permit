const permitsPerUser = workerPerReq.filter(
    (permit) => permit.id === idControl
);
const acceptedPermitsPerUser = permitsPerUser.filter(
    (permit) => permit.accept === true
);
const rejectedPermitsPerUser = permitsPerUser.filter(
    (permit) => permit.accept === false
);

const handleRemainingAnnualLeave = () => {  // ---> tek yapacağımız şey kalan günler  - seçilen tarihler arasındaki gün sayısı kalan izinleri 0 ın altına indirip indirmediğine bakmak.
    if (acceptedPermitsPerUser.length > 0) {
        const calculatedPermits = acceptedPermitsPerUser.map((permit) => {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(permit.startDay);
            const secondDate = new Date(permit.endDay);

            return Math.round(Math.abs((firstDate - secondDate) / oneDay));
        });

        const totalPermitDays = calculatedPermits.reduce(
            (partialSum, a) => partialSum + a,
            0
        );

        const remainingAnnualLeave = 30 - totalPermitDays;
        dispatch(setAnnualLeave(remainingAnnualLeave));
    }
};

useEffect(() => {
    handleRemainingAnnualLeave();
}, []);





const updatedWorkerPerReq = workerPerReq.map(workerInfo =>
    workerInfo.id === idControl ? newWorkerInfo : workerInfo
);