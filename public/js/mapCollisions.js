collisionMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            boundaries.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})


wallCollisionMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1)
            wallBoundaries.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})


battleZoneMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            battleZone.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})


upgradeZoneMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            upgradeZone.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})
