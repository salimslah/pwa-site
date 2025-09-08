export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      // Example: read values if needed
      form.get('title');
      form.get('text');
      form.get('url');
    } else if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      // Iterate files if needed
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          // Process uploaded file (placeholder)
          value.name;
        }
      }
    }
    // Redirect to home (could route to a share page)
    return Response.redirect('/', 303);
  } catch (error) {
    return new Response('Share handling failed', { status: 400 });
  }
}


