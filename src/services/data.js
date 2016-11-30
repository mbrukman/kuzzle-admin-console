export const dedupeRealtimeCollections = (collections) => {
  if (!collections.realtime) {
    return collections
  }

  let dedupedRealtime = collections.realtime.filter((collection) => {
    return collections.stored.indexOf(collection) === -1
  })

  return {
    stored: collections.stored,
    realtime: dedupedRealtime
  }
}

export const generateHash = (s) => {
  var hash = 0
  if (!s || s.length === 0) return hash
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

export const filterIndexesByKeyword = (indexes, indexTree, word) => {
  if (!word || word === '') {
    return indexes
  }

  let lowerCaseWord = word.toLowerCase()

  return indexes.filter((element) => {
    if (element.toLowerCase().indexOf(lowerCaseWord) >= 0) {
      return true
    }

    let collections = indexTree[element]

    if (collections.stored && collections.stored.some(collection => collection.toLowerCase().indexOf(lowerCaseWord) >= 0)) {
      return true
    }

    if (collections.realtime && collections.realtime.some(collection => collection.toLowerCase().indexOf(lowerCaseWord) >= 0)) {
      return true
    }
  })
}