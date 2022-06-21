const yearAcOrDC = (year: number) => (year >= 0 ? year : `${Math.abs(year)} A.C.`)

export default yearAcOrDC
