export async function getCount() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT_URL}/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const count = await response.json()
    return count
  } catch (error) {
    console.error("Error fetching count:", error)
    throw error
  }
}
