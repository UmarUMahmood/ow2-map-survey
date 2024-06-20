export async function getCount() {
  try {
    const response = await fetch("http://localhost:3000/count")
    const count = await response.json()
    return count
  } catch (error) {
    console.error("Error fetching count:", error)
    throw error
  }
}
