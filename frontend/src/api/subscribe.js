export async function subscribeEmail(email) {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 201) {
      return { success: true, status: 201, message: "Thank you — you're on the list." };
    }

    if (response.status === 200) {
      return { success: true, status: 200, message: "You're already on the list." };
    }

    return { success: false, status: response.status, message: 'Something went wrong. Please try again.' };
  } catch (error) {
    return { success: false, status: 500, message: 'Something went wrong. Please try again.' };
  }
}
