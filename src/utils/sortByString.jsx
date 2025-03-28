 export const sortByString = (array =[], name)=> {
    const sortByName = array?.sort((b, a) => {
        const nameA = a[name].toUpperCase()
        const nameB = b[name].toUpperCase()
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    })

    return sortByName


 }