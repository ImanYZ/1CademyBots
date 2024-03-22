const extractArray = (arrayString: string) => {
  try {
    const start = arrayString.indexOf('[')
    const end = arrayString.lastIndexOf(']')
    const jsonArrayString = arrayString.slice(start, end + 1)
    return JSON.parse(jsonArrayString)
  } catch (err: any) {
    console.error(err?.message || 'Error parsing response')
  }
}

export default extractArray
